# Web API opportunities for the holographic card

Research date: 2026-08-18

## Recommendation

The strongest direction is not to add more permission prompts. It is to make the existing material simulation deeper with inputs that are already available, then offer one clearly labeled experimental mode.

| Rank | Direction | Payoff | Reliability | Recommendation |
| --- | --- | --- | --- | --- |
| 1 | Pointer, touch, and multi-touch drive a WebGL/WebGPU foil shader | High | High | Ship as the universal interaction model |
| 2 | Device orientation plus acceleration drive light and foil inertia, never mobile card geometry | High | High on sensor-equipped phones | Keep and deepen the existing mobile mode |
| 3 | Display-P3 color, WebGPU where available, WebGL fallback | High | High with progressive enhancement | Best visual upgrade per unit of friction |
| 4 | Screen Wake Lock during the active experience | Medium | High on current browsers | Small but worthwhile supporting feature |
| 5 | Optional camera head tracking on desktop | Very high when it works | Medium | Prototype as an explicit “camera parallax” lab mode |
| 6 | Phone-as-controller paired to desktop | Very high demo value | Medium after pairing | Excellent later experiment, but it needs backend/signaling work |
| 7 | Microphone-reactive foil, hand tracking, gamepad/MIDI modes | Medium | Low-to-medium | Hidden experiments only |

Do not build the core experience around ambient-light/proximity sensors, pressure, WebXR, Web NFC, Web Bluetooth/HID/USB/Serial, battery state, or geolocation. They are either unavailable on the target browsers, require unrelated hardware or sensitive permissions, or add more friction than visual value.

## Platform reality

“Supported by Chromium” does not always mean “supported by Brave.” Brave Desktop and Android are Chromium-based, but Brave deliberately disables Web Bluetooth, motion sensors, NFC, and Network Information; Web Serial is off behind a flag, Battery is fixed rather than exposed normally, and fingerprinting surfaces such as `hardwareConcurrency` and `deviceMemory` are generalized. Brave on iOS is constrained by `WKWebView`, so its web-platform surface follows WebKit rather than desktop Chromium. [Brave: deviations from Chromium](https://github.com/brave/brave-browser/wiki/Deviations-from-Chromium-%28features-we-disable-or-remove%29), [Brave: iOS is constrained by WKWebView](https://github.com/brave/brave-browser/wiki/Blocking-goals-and-policy)

The practical target matrix is therefore:

| Capability | MacBook, current Chrome/Safari | MacBook, Brave | iPhone, Brave/WebKit | Android Chrome |
| --- | --- | --- | --- | --- |
| Pointer/touch and WebGL | Yes | Yes | Yes | Yes |
| Device orientation/motion | No useful laptop sensor | Disabled/no useful sensor | Yes, after a user-triggered permission request | Yes on sensor-equipped phones |
| Camera and microphone | Yes, permission required | Yes, permission required | Yes, permission required | Yes, permission required |
| WebGPU | Yes on compatible hardware | Usually yes; feature-detect | iOS 26+ WebKit; feature-detect | Android 12+ on supported GPUs, with expanding compatibility mode |
| Arbitrary element fullscreen | Yes | Yes | No on iPhone | Yes |
| WebXR immersive AR | Headset-dependent | Headset-dependent | No | Yes on compatible ARCore devices |
| NFC/Bluetooth/HID/USB/Serial | Browser- and hardware-dependent | Several deliberately disabled | Generally unavailable | Mostly Chromium-only and hardware-dependent |

Every optional capability should be feature-detected at runtime. Browser-name detection is especially misleading here.

## 1. Core inputs and rendering

### Pointer, touch, pressure, and coalesced events

Concrete effect: use one pointer to position the virtual light; use two touches to rotate or stretch the interference pattern while the mobile card remains fixed to the screen. Pointer contact width/height can subtly widen the glow. Stylus pressure and tilt can deepen the foil or “engrave” a temporary spectral trail.

The experiential payoff is high because it makes the material feel responsive without a prompt, special hardware, or an onboarding step. Pointer Events are broadly available and unify mouse, pen, and touch. Pressure is normalized to `0..1`, but unsupported hardware reports a synthetic value; touch contact geometry and pressure are device-dependent. `getCoalescedEvents()` can improve high-speed trails, but should be an optional refinement rather than required logic. Apple Force Touch events are proprietary and non-standard; they might create a Safari-only MacBook easter egg, but they do not help the owner’s Brave setup. [Pointer Events specification](https://www.w3.org/TR/pointerevents3/), [Touch Events specification](https://www.w3.org/TR/touch-events/), [Apple Force Touch events](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/SafariJSProgTopics/RespondingtoForceTouchEventsfromJavaScript.html)

Privacy is low-risk because coordinates stay local and disappear when interaction ends. Power cost is low if input only updates state and rendering stays synchronized to `requestAnimationFrame`. Recommendation: **yes** for pointer and multi-touch; **opportunistic only** for pressure, stylus data, and coalesced events.

### Device Orientation and Device Motion

Concrete effects:

- Orientation changes the light vector, spectral band angle, edge highlight, and simulated surface normal.
- Acceleration or rotation rate adds foil inertia: a quick physical flick produces a short shimmer that settles after the phone stops.
- A deliberate shake can reveal a brief hidden signature, but it should require a strong threshold and cooldown.

This reuses the existing permission and preserves the correct metaphor: on a phone, the screen is the card, so sensor data must not perspective-rotate the card itself. `DeviceOrientationEvent` and `DeviceMotionEvent` are available on modern mobile browsers in secure contexts. On iOS/WebKit, permission must be requested from a user gesture; the permission methods should be feature-detected. [Device Orientation and Motion specification](https://www.w3.org/TR/orientation-event/), [Safari 13 permission change](https://developer.apple.com/documentation/safari-release-notes/safari-13-release-notes)

Motion data can reveal behavioral and sensor characteristics, so it should only start after explicit opt-in, be normalized rather than stored, stop when the page is hidden, and never be sent to analytics. Chrome 151 also exposes the permission-request methods, reinforcing the value of one feature-detected, tap-triggered flow rather than separate iOS/Android assumptions. Continuous high-frequency updates cost power; cap the useful rate, smooth the values, and stop listeners when inactive. MacBooks do not expose a useful gyroscope, and Brave Desktop disables motion sensors anyway. Recommendation: **yes on phones**, including acceleration-based material inertia; retain pointer fallback everywhere else. [Chrome 151 motion permission methods](https://developer.chrome.com/release-notes/151)

### Generic Sensor APIs, magnetometer, ambient light, and proximity

Concrete effects would be attractive in theory: real lux could set foil exposure, proximity could dim the card when covered, and a magnetometer could anchor the highlight to a world direction. In practice these are poor foundations.

Generic Sensor APIs are primarily Chromium capabilities, require HTTPS and permission/policy handling, and readings may be suspended when the page is not visible. WebKit does not provide the general sensor surface used here, Brave Desktop disables motion sensors, and a MacBook lacks the motion hardware that matters. Ambient light is experimental, permission-gated, deliberately quantized for privacy, and not a dependable cross-browser feature. Proximity remains a W3C Working Draft with privacy/fingerprinting concerns rather than a dependable deployed API. [Chrome: sensors for the web](https://developer.chrome.com/docs/capabilities/web-apis/generic-sensor), [Generic Sensor specification](https://www.w3.org/TR/generic-sensor/), [ambient-light privacy mitigations](https://www.w3.org/TR/ambient-light/), [Proximity Sensor draft](https://www.w3.org/TR/proximity/)

The closest practical substitute is opt-in camera sampling: downscale front-camera frames and estimate average brightness/color locally. That costs a camera prompt and visible camera indicator, so it belongs only inside a camera mode. Recommendation: **no** for direct ambient-light/proximity/Generic Sensor dependencies; use Device Orientation and optional camera estimation instead.

### WebGL, WebGPU, wide color, and workers

Concrete effect: replace the multiple translucent DOM foil layers with one WebGL2 fragment-shader material that models anisotropic foil, a moving normal field, diffraction bands, edge Fresnel, fine grain, and controlled glare. Input uniforms can come from pointer, touch, orientation, or a remote phone without changing the material code.

This offers the best “technical demo” payoff because the upgrade is visible immediately and does not request personal data. WebGPU is only a rendering engine, not an effect: the material design, shader math, and art direction produce the effect. WebGL2 is the dependable baseline and is already sufficient for a single card. WebGPU is a modern, higher-performance path but still has limited availability: Chrome supports it on macOS and on supported Android GPUs, Safari 26 ships it on macOS and iOS, and Chrome is extending compatibility mode to older graphics backends. Feature-detect `navigator.gpu` and keep the WebGL2 shader as the real fallback rather than maintaining a second pile of translucent DOM layers. [WebGPU specification](https://www.w3.org/TR/webgpu/), [Chrome WebGPU platform support](https://developer.chrome.com/docs/web-platform/webgpu/overview), [Safari 26 WebGPU](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/), [Chrome Android compatibility mode](https://developer.chrome.com/blog/new-in-webgpu-146)

Use `@media (color-gamut: p3)` and Display-P3 colors for richer spectral peaks on capable displays, while preserving an sRGB palette. HDR output can be another progressive tier on capable displays—Safari 26 supports HDR imagery, including WebGPU canvas content—but it must be independently feature-tested and tone-mapped; a P3 display is not automatically an HDR display. [CSS Media Queries: `color-gamut`](https://www.w3.org/TR/mediaqueries-5/#color-gamut), [Display-P3 canvas](https://developer.chrome.com/blog/new-in-chrome-94), [Safari 26 HDR and WebGPU canvas](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)

GPU work is local and needs no permission, but it can drain battery or expose driver instability. Keep the effect to one canvas, cap device pixel ratio, pause on `visibilitychange`, respect reduced motion, and reduce sampling/resolution after measured frame drops. `OffscreenCanvas` can move eligible rendering work off the main thread, but should be proven against the actual shader path before adding complexity. [HTML specification: `OffscreenCanvas`](https://html.spec.whatwg.org/multipage/canvas.html#the-offscreencanvas-interface)

Recommendation: **strong yes**. Prefer WebGPU only as a progressive path; a well-built WebGL shader is already enough for this card.

## 2. Camera, computer vision, and audio

### Camera-based head tracking

Concrete effect: on a MacBook, the foil and specular reflection respond to the viewer’s head position, creating glasses-free parallax. The card geometry can move slightly on desktop because it is an object inside the laptop screen; this remains different from the fixed mobile-card metaphor.

`getUserMedia({ video: { facingMode: "user" } })` works across the target browser families in HTTPS contexts, but always requires explicit permission and the browser displays a camera-use indicator. Only a top-level document, or an explicitly permitted frame, can request it. [Media Capture and Streams specification](https://www.w3.org/TR/mediacapture-streams/), [WebKit camera privacy and permissions](https://webkit.org/blog/7763/a-closer-look-into-webrtc/)

The browser API provides frames, **not reliable cross-browser face or head landmarks**. The native `FaceDetector` proposal is an incubator draft; Chrome’s own documentation still describes face detection as behind a flag, so it cannot be the production path. [Shape Detection draft](https://wicg.github.io/shape-detection-api/), [Chrome Shape Detection status](https://developer.chrome.com/docs/capabilities/shape-detection)

The practical detector is a third-party CV/ML library such as Google MediaPipe Face Landmarker. It runs a WASM model and can return 478 face landmarks and a facial transformation matrix. Google documents that video inference calls are synchronous and block the UI thread unless moved to a worker. MediaPipe says input processing stays on-device, but it sends performance/utilization metrics to Google and makes the integrator responsible for informed consent. [MediaPipe Face Landmarker for web](https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker/web_js), [MediaPipe Tasks privacy notice](https://developers.google.com/edge/mediapipe/solutions/tasks)

Privacy and trust costs are high for a business card: a camera prompt can feel disproportionate, even when no frames leave the device. Power and thermal cost are also meaningful. If prototyped, make it a separate opt-in button, explain “processed on this device,” never upload or record frames, sample at roughly 10–15 fps at low resolution, use `requestVideoFrameCallback()`, run inference in a worker where supported, and immediately stop all tracks on exit. [HTML specification: `requestVideoFrameCallback()`](https://html.spec.whatwg.org/multipage/media.html#dom-htmlvideoelement-requestvideoframecallback)

Recommendation: **prototype**, but do not make it the default permission flow.

### Camera-based hand tracking

Concrete effect: a pinch could pull apart two foil layers, an open palm could freeze the light, or moving a hand across the camera could sweep a spectral wave over the card.

This uses the same native camera API and permission model as head tracking, while the landmark detector is again a third-party ML dependency. MediaPipe’s web package exposes `HandLandmarker` and `GestureRecognizer`; the same worker, thermal, metrics-consent, and track-cleanup rules apply. [MediaPipe tasks-vision package](https://developers.google.com/edge/api/mediapipe/js/tasks-vision), [MediaPipe vision examples](https://developers.google.com/edge/mediapipe/solutions/examples)

The interaction is impressive but less discoverable and more tiring than head parallax. Recommendation: **hidden lab experiment only**, preferably sharing the same camera session as head tracking rather than asking for a second mode.

### Microphone and Web Audio

Concrete effects: a clap sends one shockwave across the foil; ambient sound lightly excites the grain; a short spoken phrase reveals the contact actions.

The Web Audio API and `AnalyserNode` are broadly available, and an `AudioWorklet` can move custom audio processing off the main rendering thread. Microphone input still comes from `getUserMedia()` and therefore requires a visible permission prompt and browser recording indicator. [Web Audio specification](https://www.w3.org/TR/webaudio/), [Media Capture privacy requirements](https://www.w3.org/TR/mediacapture-streams/#privacy-and-security)

For an amplitude-only effect, process locally, retain no audio, stop the track immediately when the mode ends, and say so in the UI. The privacy/friction cost is still high relative to the result. Speech recognition is even less suitable: implementations may use a remote recognition service, and support is not dependable across the target browsers. [Web Speech API draft](https://webaudio.github.io/web-speech-api/)

Recommendation: **optional sound-reactive easter egg**, not a core interaction and not speech-driven.

## 3. Using a phone as the MacBook’s sensor

The strongest answer to “MacBooks have no gyroscope” is a paired controller:

1. Desktop opens a temporary “Use phone as light” panel with a pairing QR.
2. Phone opens a short-lived controller URL and requests orientation permission.
3. Phone sends normalized orientation and acceleration at a capped rate.
4. Desktop applies the values to light, foil, and—because this is desktop—the card’s restrained 3D pose.

### Transport options

| Transport | Practical use | Privacy, friction, and support | Verdict |
| --- | --- | --- | --- |
| `RTCDataChannel` | Encrypted low-latency peer-to-peer sensor stream | Broad browser support; still requires offer/answer signaling and usually STUN/TURN infrastructure. Data channels use DTLS encryption. | Best final transport if the experience justifies the infrastructure |
| WebSocket | Both devices connect to a short-lived relay room encoded in the QR | Broad and simple, but every sensor packet passes through the server. Requires a stateful relay, authentication, rate limits, and expiry. | Best prototype and often the most reliable production choice |
| BroadcastChannel | Same-origin communication between tabs/windows/workers | Broadly available but restricted to the same origin and storage partition on one browser profile; it does not pair separate devices. | Useful for local tab coordination only, not phone-to-Mac |

Sources: [WebRTC peer-to-peer data specification](https://www.w3.org/TR/webrtc/#peer-to-peer-data-api), [WebRTC security architecture](https://www.rfc-editor.org/rfc/rfc8827), [HTML specification: `BroadcastChannel`](https://html.spec.whatwg.org/multipage/web-messaging.html#broadcasting-to-other-browsing-contexts), [WebSockets standard](https://websockets.spec.whatwg.org/)

WebRTC does not remove the need for signaling. A QR can carry a room identifier and secret, but a server still needs to exchange session descriptions unless the project adopts a cumbersome manual exchange. The current site is deployed as static assets, so either approach is an architectural expansion. A Cloudflare Worker plus Durable Object/WebSocket room would be simpler than adding a full service; a WebRTC version may additionally need TURN for difficult networks.

Privacy should be designed in: unguessable short-lived room tokens, no logging of raw motion, end-to-end or transport encryption, a clear connected indicator, automatic expiry, and immediate teardown when either page closes. Radio plus continuous sensors consume more battery than local motion alone, so 20–30 Hz normalized packets are enough.

Recommendation: **high-value phase-two experiment**. Prototype with WebSocket relay first; only move to WebRTC if relay cost or privacy materially warrants it.

## 4. Peripheral and spatial APIs

| API | Concrete card effect | Permissions, privacy, power, and support | Recommendation |
| --- | --- | --- | --- |
| Vibration | A brief tactile tick after saving/contact activation, or a rare shimmer “snap” | Requires prior user activation; ignored when hardware/browser does not support it. Android Chromium supports it, iPhone WebKit does not. Low privacy and tiny power cost when used once. [Vibration API specification](https://www.w3.org/TR/vibration/) | Progressive Android polish only; never required feedback |
| Gamepad | Analog sticks steer light; controller gyro is not standardized by the core API | Broad browser API, but users need a paired controller and mappings/haptics vary. Low privacy, moderate polling cost. [Gamepad specification](https://www.w3.org/TR/gamepad/) | Hidden easter egg only |
| Web MIDI | Notes recolor bands; modulation wheels control foil frequency | Limited availability, HTTPS, connected MIDI hardware, and explicit permission in current Chrome. Safari is not supported in Chrome’s current matrix. [Web MIDI specification](https://www.w3.org/TR/webmidi/), [Chrome MIDI permission](https://developer.chrome.com/blog/web-midi-permission-prompt) | Demo for a developer event, not this public route |
| Web Bluetooth | A BLE knob/light controls material parameters | Chrome supports BLE on macOS and Android, but it requires a chooser and explicit permission; WebKit lacks it and Brave Desktop disables it. BLE device data can be sensitive; ongoing radio use costs power. [Web Bluetooth specification](https://webbluetoothcg.github.io/web-bluetooth/), [Chrome platforms](https://developer.chrome.com/docs/capabilities/bluetooth) | No, unless paired with a purpose-built physical card |
| WebHID | Joy-Con/SpaceMouse/Stream Deck controls the card | Chromium desktop capability with device chooser; not Safari, and not a general phone input. Requires extra hardware and device-specific parsing. [WebHID](https://developer.chrome.com/docs/capabilities/hid) | No for the product; fun local installation mode |
| WebUSB | A custom USB sensor or microcontroller drives foil/light | Chromium-focused, secure-context pairing flow, extra hardware, OS-driver constraints; Android adds another system prompt. [WebUSB specification](https://wicg.github.io/webusb/), [platform constraints](https://developer.chrome.com/docs/capabilities/build-for-webusb) | No, except as an exhibition build |
| Web Serial | Stream IMU data from a microcontroller | Chrome desktop support; Android support arrived in Chrome 148. Permission/port chooser and dedicated hardware are mandatory; Brave keeps it off behind a flag. [Web Serial specification](https://wicg.github.io/serial/), [Chrome 148 Android support](https://developer.chrome.com/release-notes/148) | No for visitors; useful only as a development input bridge |
| Web NFC | Tap a physical NFC card/tag to unlock an alternate material or write the contact URL to a tag | Chrome Android only in practice; HTTPS and NFC permission prompt; NDEF only. Brave disables NFC and iPhone WebKit does not expose Web NFC. [Web NFC specification](https://w3c.github.io/web-nfc/), [Chrome implementation guidance](https://developer.chrome.com/docs/capabilities/nfc) | Consider only if producing a physical NFC business card; not for the main page |
| WebXR | Place a 3D card on a real desk or walk around a floating identity object | Secure context, user-triggered immersive session, compatible XR/AR hardware, significant rendering and battery cost. Android Chrome can use compatible ARCore devices; WebKit states WebXR is not supported on iOS, while Safari support is currently visionOS-specific. [WebXR Device API specification](https://www.w3.org/TR/webxr/), [WebXR security and privacy](https://immersive-web.github.io/security-privacy/), [WebKit iOS support statement](https://bugs.webkit.org/show_bug.cgi?id=309550), [Safari visionOS WebXR](https://webkit.org/blog/17640/webkit-features-for-safari-26-2/) | Separate Android/visionOS experiment only |

## 5. Display, session, and adaptation APIs

### Fullscreen, wake lock, and orientation

Fullscreen is useful because it removes browser chrome and reinforces the “phone is the card” illusion. It requires a transient user activation and can be refused. It works on desktop and Android, but arbitrary element fullscreen remains unimplemented on iPhone; the open WebKit issue is still active in 2026. [Fullscreen standard](https://fullscreen.spec.whatwg.org/), [WebKit iPhone fullscreen issue](https://bugs.webkit.org/show_bug.cgi?id=206854)

Screen Wake Lock prevents the display from dimming while someone is showing or scanning the card. It requires HTTPS, can be rejected by system power settings, and is automatically released when the document is no longer active/visible. It consumes battery by design, so request it only after motion activation and release it on exit. [Screen Wake Lock specification](https://www.w3.org/TR/screen-wake-lock/), [Chrome implementation guidance](https://developer.chrome.com/docs/capabilities/web-apis/wake-lock)

Screen orientation detection is useful for recalibrating sensor axes. Orientation **locking** has limited support, is generally mobile/fullscreen-only, is absent from WebKit, and cannot rescue the iPhone fullscreen gap. [Screen Orientation specification](https://www.w3.org/TR/screen-orientation/), [Safari Screen Orientation scope](https://webkit.org/blog/13966/webkit-features-in-safari-16-4/)

Recommendation: keep fullscreen as best-effort, **add wake lock as best-effort**, and use orientation changes for recalibration rather than forcing a lock.

### Geolocation

Concrete effects could include a sun-angle-driven light direction, local time/weather palette, or subtle city label. Geolocation is broadly supported but always sensitive, HTTPS-only, and explicitly permission-gated. [Geolocation specification](https://www.w3.org/TR/geolocation/)

The card already states its owner’s location; asking a visitor for theirs is hard to justify. It can reveal precise location and may wake GPS/radios. Approximate timezone and local clock are available without location permission and are enough for a day/night variation. Recommendation: **no**.

### Battery, network, device memory, hardware concurrency, and compute pressure

These signals should not create visible identity effects. Their legitimate use is adaptive quality:

- Reduce shader resolution/frame rate when a measured performance budget is missed.
- Avoid loading optional ML models on slow/save-data connections.
- Limit worker count using `hardwareConcurrency`.
- Prefer a cheaper renderer on known low-memory devices.

Battery Status, Network Information, and Device Memory all have limited availability. Device Memory is intentionally rounded and clamped for fingerprinting protection. `hardwareConcurrency` is broadly available but browsers may report a lower value; Brave modifies both memory and concurrency surfaces. Compute Pressure exposes coarse CPU pressure states in current Chromium but is experimental. [Battery Status specification](https://www.w3.org/TR/battery-status/), [Network Information draft](https://wicg.github.io/netinfo/), [Device Memory privacy model](https://www.w3.org/TR/device-memory/), [HTML specification: `hardwareConcurrency`](https://html.spec.whatwg.org/multipage/workers.html#dom-navigator-hardwareconcurrency-dev), [Compute Pressure specification](https://www.w3.org/TR/compute-pressure/)

Collecting these values for analytics increases fingerprinting risk and is unnecessary. A direct rolling frame-time measurement is more portable and reflects the actual effect, GPU, thermal state, and browser behavior better than device labels. Recommendation: **frame-time adaptation first**; use these APIs only as optional hints, never as gates and never as telemetry by default.

### Web Share

This is not a visual effect, but it is the most useful additional card API. `navigator.share()` opens the operating system share sheet for a URL, text, or supported file and requires a user gesture. Support is not universal, so retain the current vCard download/copy fallback and feature-detect file sharing. [Web Share specification](https://www.w3.org/TR/web-share/)

Concrete payoff: the same contact action can share the card URL or `.vcf` directly into Messages, AirDrop, email, or another app. Privacy is controlled by the OS destination picker and there is negligible performance cost. Recommendation: **yes as a progressive contact action**.

## Suggested roadmap

1. Deepen existing phone motion: use acceleration and rotation rate for foil inertia while card geometry remains fixed.
2. Add two-touch material control and opportunistic stylus/pressure refinement.
3. Prototype one shader material in WebGL first; add WebGPU and Display-P3 as progressive enhancements after the material is visually correct.
4. Add best-effort Screen Wake Lock during active motion mode and a native Web Share path for the contact.
5. Build a disposable camera-head-tracking prototype and test whether the visual result earns the permission prompt and thermal cost.
6. If the project still needs a stronger MacBook “sensor” demo, prototype QR pairing with a short-lived WebSocket room, then evaluate WebRTC.

The through-line should remain simple: **inputs move the light and material first; only desktop inputs may move the card object.**
