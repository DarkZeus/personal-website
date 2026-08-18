import { initWithGL, initWithGLFallback, isGLRoot } from '@typegpu/gl'
import { d, std, tgpu } from 'typegpu'

export type HoloMaterialFrame = {
  lightX: number
  lightY: number
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
  const light = root.createUniform(d.vec2f, d.vec2f(0, 0)).$name('light')
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
    const centered = d.vec2f((uv.x - 0.5) * aspect, uv.y - 0.5)
    const lightCenter = d.vec2f(light.$.x * 0.3 * aspect, light.$.y * 0.32)
    const toLight = std.sub(centered, lightCenter)
    const distanceToLight = std.length(toLight)

    const drift = light.$.x * 0.16 + light.$.y * 0.09
    const inertia = impulse.$.x * 0.07 - impulse.$.y * 0.05
    const diagonal = uv.x * 0.72 + uv.y * 0.42 + drift + inertia
    const ringPhase = distanceToLight * 45 - time.$ * (0.16 + energy.$ * 0.48)
    const interference = std.sin(diagonal * 24 + std.sin(ringPhase) * 0.28)
    const fineLines = std.sin((uv.x * 1.18 + uv.y) * 260 + light.$.x * 8)
    const spectralPhase = diagonal * 18 + interference * 1.4 + impulse.$.x * 2.5

    const spectrum = d.vec3f(
      0.56 + 0.44 * std.cos(spectralPhase),
      0.56 + 0.44 * std.cos(spectralPhase - 2.094),
      0.56 + 0.44 * std.cos(spectralPhase - 4.188),
    )
    const foilBands = std.smoothstep(0.12, 0.92, std.abs(interference))
    const localReveal = 1 - std.smoothstep(0.06, 0.82, distanceToLight)
    const lineReveal = 0.5 + fineLines * 0.5
    const foilAmount = (0.035 + localReveal * 0.13 + energy.$ * 0.14) * (0.48 + foilBands * 0.52)
    const holoTint = std.mix(d.vec3f(0.82, 0.84, 0.93), spectrum, 0.58)

    const paper = d.vec3f(0.91, 0.895, 0.95)
    const paperLight = d.vec3f(0.985, 0.98, 1)
    const paperShade = d.vec3f(0.79, 0.77, 0.88)
    const verticalShade = std.smoothstep(0, 1, uv.y)
    let color = std.mix(paperLight, paper, verticalShade * 0.72)
    const cornerShade = 1 - std.smoothstep(0, 0.8, uv.x + uv.y)
    color = std.mix(color, paperShade, cornerShade * 0.09)
    color = std.mix(color, std.mul(holoTint, gamut.$), foilAmount)

    const glare = std.pow(std.saturate(1 - distanceToLight * 1.36), 3.4)
    color = std.add(color, std.mul(d.vec3f(1, 0.985, 1), glare * (0.075 + energy.$ * 0.1)))
    color = std.mul(color, 0.989 + lineReveal * 0.011)

    const edgeDistance = std.min(std.min(uv.x, 1 - uv.x), std.min(uv.y, 1 - uv.y))
    const edgeLight = 1 - std.smoothstep(0, 0.035, edgeDistance)
    const directionalEdge = std.saturate(
      edgeLight * (0.42 + light.$.x * (uv.x - 0.5) + light.$.y * (uv.y - 0.5)),
    )
    color = std.add(color, std.mul(d.vec3f(1, 1, 1), directionalEdge * 0.26))

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
      light.write(d.vec2f(frame.lightX, frame.lightY))
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
