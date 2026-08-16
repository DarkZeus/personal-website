/**
 * Retires service workers left behind by older deployments.
 *
 * Keep this file at /sw.js until existing registrations have had enough time
 * to update, activate this worker, and unregister themselves.
 */
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.registration.unregister())
})
