import { initWithGL, initWithGLFallback, isGLRoot } from '@typegpu/gl'
import { d, std, tgpu } from 'typegpu'

export type HoloMaterialFrame = {
  foilX: number
  foilY: number
  glareX: number
  glareY: number
  impulseX: number
  impulseY: number
  energy: number
  time: number
}

export type HoloMaterialRenderer = {
  readonly backend: 'webgpu' | 'webgl2'
  draw: (frame: HoloMaterialFrame) => void
  setRenderScale: (scale: number) => void
  destroy: () => void
}

const MAX_CANVAS_DIMENSION = 4096
const MAX_PIXEL_RATIO = 2

const spectralPalette = tgpu.fn([d.f32], d.vec3f)((phase) => {
  'use gpu'
  const hue = std.fract(phase)
  const pink = d.vec3f(1, 0.345, 0.757)
  const yellow = d.vec3f(1, 0.827, 0.357)
  const mint = d.vec3f(0.294, 0.957, 0.827)
  const blue = d.vec3f(0.333, 0.537, 1)
  const purple = d.vec3f(0.8, 0.357, 1)

  if (hue < 0.2) return std.mix(pink, yellow, hue * 5)
  if (hue < 0.4) return std.mix(yellow, mint, (hue - 0.2) * 5)
  if (hue < 0.6) return std.mix(mint, blue, (hue - 0.4) * 5)
  if (hue < 0.8) return std.mix(blue, purple, (hue - 0.6) * 5)
  return std.mix(purple, pink, (hue - 0.8) * 5)
})

function prepareTypeGpuGlFallback() {
  if ('GPUBufferUsage' in globalThis) return

  // @typegpu/gl 0.12.1 uses a fake WebGPU root while translating the shared
  // TypeGPU pipeline to GLSL. Browsers without WebGPU do not expose these
  // constants, even though the resulting renderer only uses WebGL2.
  Object.defineProperty(globalThis, 'GPUBufferUsage', {
    configurable: true,
    value: Object.freeze({
      MAP_READ: 0x0001,
      MAP_WRITE: 0x0002,
      COPY_SRC: 0x0004,
      COPY_DST: 0x0008,
      INDEX: 0x0010,
      VERTEX: 0x0020,
      UNIFORM: 0x0040,
      STORAGE: 0x0080,
      INDIRECT: 0x0100,
      QUERY_RESOLVE: 0x0200,
    }),
  })
}

export async function createHoloMaterialRenderer(
  canvas: HTMLCanvasElement,
  backend: 'auto' | 'webgl2' = 'auto',
): Promise<HoloMaterialRenderer> {
  const root = backend === 'webgl2' ? initWithGL() : await initWithGLFallback()
  const resolvedBackend = isGLRoot(root) ? 'webgl2' : 'webgpu'
  if (resolvedBackend === 'webgl2') prepareTypeGpuGlFallback()
  const supportsP3 = CSS.supports('color', 'color(display-p3 1 1 1)')
  const context = root.configureContext({
    canvas,
    alphaMode: 'opaque',
    colorSpace: supportsP3 ? 'display-p3' : 'srgb',
  })

  const resolution = root.createUniform(d.vec2f, d.vec2f(1, 1)).$name('resolution')
  const foil = root.createUniform(d.vec2f, d.vec2f(0, 0)).$name('foil')
  const glare = root.createUniform(d.vec2f, d.vec2f(0, 0)).$name('glare')
  const impulse = root.createUniform(d.vec2f, d.vec2f(0, 0)).$name('impulse')
  const energy = root.createUniform(d.f32, 0).$name('energy')
  const time = root.createUniform(d.f32, 0).$name('time')
  const gamut = root.createUniform(d.f32, supportsP3 ? 1.08 : 1).$name('gamut')

  const vertex = tgpu.vertexFn({
    in: { vertexIndex: d.builtin.vertexIndex },
    out: { position: d.builtin.position, uv: d.vec2f },
  })(({ vertexIndex }) => {
    'use gpu'
    let position = d.vec2f(-1, -1)
    let uv = d.vec2f(0, 1)
    if (vertexIndex === 1) {
      position = d.vec2f(3, -1)
      uv = d.vec2f(2, 1)
    }
    else if (vertexIndex === 2) {
      position = d.vec2f(-1, 3)
      uv = d.vec2f(0, -1)
    }
    return { position: d.vec4f(position, 0, 1), uv }
  })

  const fragment = tgpu.fragmentFn({
    in: { uv: d.vec2f },
    out: d.vec4f,
  })(({ uv }) => {
    'use gpu'

    const aspect = resolution.$.x / resolution.$.y
    const stockAxis = std.saturate((uv.x + uv.y) * 0.5)
    const stockStart = d.vec3f(0.945, 0.929, 0.969)
    const stockMiddle = d.vec3f(0.882, 0.867, 0.925)
    const stockEnd = d.vec3f(0.922, 0.902, 0.945)
    let color = std.mix(stockStart, stockMiddle, std.smoothstep(0, 0.62, stockAxis))
    color = std.mix(color, stockEnd, std.smoothstep(0.52, 1, stockAxis))

    const topWashDelta = d.vec2f((uv.x - 0.16) * aspect, uv.y - 0.08)
    const topWash = 1 - std.smoothstep(0.08, 0.62, std.length(topWashDelta))
    color = std.mix(color, d.vec3f(1, 1, 1), topWash * 0.2)
    const cornerDelta = d.vec2f((uv.x - 0.9) * aspect, uv.y - 0.95)
    const cornerTint = 1 - std.smoothstep(0.05, 0.72, std.length(cornerDelta))
    color = std.mix(color, d.vec3f(0.498, 0.4, 0.722), cornerTint * 0.09)

    const foilCenter = d.vec2f(0.5 + foil.$.x * 0.31, 0.5 + foil.$.y * 0.36)
    const foilDelta = std.sub(uv, foilCenter)
    const foilDistance = std.length(d.vec2f(foilDelta.x * aspect, foilDelta.y))
    const inertia = impulse.$.x * 0.034 - impulse.$.y * 0.026
    const diagonal = uv.x * 0.82 + uv.y * 0.34 + foil.$.x * 0.13 + foil.$.y * 0.08 + inertia
    const movement = std.saturate(std.length(foil.$) + energy.$ * 0.55)
    const reveal = 0.32 + movement * 0.6

    const linearSpectrum = spectralPalette(diagonal * 0.92 + 0.01)
    const directionScale = 1 / (std.abs(foilDelta.x) + std.abs(foilDelta.y) + 0.001)
    const conicPhase = (foilDelta.x - foilDelta.y) * directionScale * 0.25
    const conicSpectrum = spectralPalette(conicPhase + foil.$.x * 0.08 + 0.68)
    const localSpectrum = std.mix(linearSpectrum, conicSpectrum, 0.26)

    const stripeWave = 0.5 + std.sin(diagonal * 39.5) * 0.5
    const stripeMask = std.smoothstep(0.18, 0.7, stripeWave)
    const spectrumFocus = 1 - std.smoothstep(0.08, 0.76, std.length(d.vec2f((uv.x - 0.74) * aspect * 0.7, uv.y - 0.44)))
    const spectrumMask = std.max(stripeMask, spectrumFocus * 0.46)
    const spectrumAmount = spectrumMask * reveal * 0.68
    const multipliedSpectrum = std.mul(color, std.mix(d.vec3f(1, 1, 1), std.mul(localSpectrum, gamut.$), 0.94))
    color = std.mix(color, multipliedSpectrum, spectrumAmount)

    const ringDelta = d.vec2f((uv.x - 0.73 - foil.$.x * 0.05) * aspect * 0.72, (uv.y - 0.43 - foil.$.y * 0.05) * 1.18)
    const ringDistance = std.length(ringDelta)
    const ringCycle = std.fract(ringDistance * 7.15 - time.$ * energy.$ * 0.09)
    const pinkRing = std.smoothstep(0.55, 0.6, ringCycle) * (1 - std.smoothstep(0.65, 0.7, ringCycle))
    const cyanRing = std.smoothstep(0.7, 0.75, ringCycle) * (1 - std.smoothstep(0.82, 0.87, ringCycle))
    const ringFade = 1 - std.smoothstep(0.12, 1.05, ringDistance)
    color = std.add(color, std.mul(d.vec3f(1, 0.46, 0.855), pinkRing * ringFade * reveal * 0.012))
    color = std.add(color, std.mul(d.vec3f(0.286, 0.878, 1), cyanRing * ringFade * reveal * 0.02))

    const diffractionWave = std.abs(std.sin((uv.x * 1.04 + uv.y * 0.66 + foil.$.x * 0.04) * 246))
    const diffraction = std.pow(diffractionWave, 19) * reveal
    color = std.add(color, std.mul(d.vec3f(0.72, 0.94, 1), diffraction * 0.045))

    const sweetCenter = d.vec2f(foilCenter.x - 0.08, foilCenter.y + 0.04)
    const sweetDistance = std.length(d.vec2f((uv.x - sweetCenter.x) * aspect, uv.y - sweetCenter.y))
    const sweetWhite = 1 - std.smoothstep(0, 0.08, sweetDistance)
    const sweetCyan = 1 - std.smoothstep(0.03, 0.19, sweetDistance)
    const sweetPink = 1 - std.smoothstep(0.11, 0.31, sweetDistance)
    color = std.add(color, std.mul(d.vec3f(1, 1, 1), sweetWhite * reveal * 0.12))
    color = std.add(color, std.mul(d.vec3f(0.5, 0.95, 1), sweetCyan * reveal * 0.045))
    color = std.add(color, std.mul(d.vec3f(1, 0.44, 0.86), sweetPink * reveal * 0.02))

    const glareCenter = d.vec2f(0.5 + glare.$.x * 0.46, 0.5 + glare.$.y * 0.46)
    const glareDistance = std.length(d.vec2f((uv.x - glareCenter.x) * aspect, uv.y - glareCenter.y))
    const glareAmount = 1 - std.smoothstep(0, 0.72, glareDistance)
    color = std.add(color, std.mul(d.vec3f(1, 0.985, 1), glareAmount * (0.055 + energy.$ * 0.05)))

    const grain = std.sin((uv.x * 1.18 + uv.y) * 260)
    color = std.mul(color, 0.994 + grain * 0.006)

    const edgeDistance = std.min(std.min(uv.x, 1 - uv.x), std.min(uv.y, 1 - uv.y))
    const edgeLight = 1 - std.smoothstep(0, 0.025, edgeDistance)
    const directionalEdge = std.saturate(
      edgeLight * (0.32 + foil.$.x * (uv.x - 0.5) + foil.$.y * (uv.y - 0.5)),
    )
    color = std.add(color, std.mul(d.vec3f(1, 1, 1), directionalEdge * 0.22))

    return d.vec4f(std.saturate(color), 1)
  })

  const pipeline = root.createRenderPipeline({
    vertex,
    fragment,
  })

  let renderScale = 1
  let destroyed = false

  function resize() {
    if (destroyed) return
    const rect = canvas.getBoundingClientRect()
    const maxPixelRatio = resolvedBackend === 'webgl2' ? 1.5 : MAX_PIXEL_RATIO
    const pixelRatio = Math.min(maxPixelRatio, window.devicePixelRatio || 1) * renderScale
    const width = Math.max(1, Math.min(MAX_CANVAS_DIMENSION, Math.round(rect.width * pixelRatio)))
    const height = Math.max(1, Math.min(MAX_CANVAS_DIMENSION, Math.round(rect.height * pixelRatio)))
    if (canvas.width === width && canvas.height === height) return
    canvas.width = width
    canvas.height = height
    resolution.write(d.vec2f(width, height))
  }

  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  resize()

  return {
    backend: resolvedBackend,
    draw(frame) {
      if (destroyed) return
      resize()
      foil.write(d.vec2f(frame.foilX, frame.foilY))
      glare.write(d.vec2f(frame.glareX, frame.glareY))
      impulse.write(d.vec2f(frame.impulseX, frame.impulseY))
      energy.write(frame.energy)
      time.write(frame.time)
      pipeline.withColorAttachment({ view: context }).draw(3)
    },
    setRenderScale(scale) {
      const nextScale = Math.max(0.58, Math.min(1, scale))
      if (Math.abs(nextScale - renderScale) < 0.01) return
      renderScale = nextScale
      resize()
    },
    destroy() {
      destroyed = true
      resizeObserver.disconnect()
      root.destroy()
    },
  }
}
