// Monthly Ledger service worker.
// - Serves the app from its cache, so it opens and works with no connection.
// - A new version is published by changing VERSION here and in version.json
//   (run `python3 scripts/release.py <version> "<notes>"`). The browser notices the
//   changed file, downloads the new version in the background and waits; the page
//   then decides whether to switch over straight away or ask first.
const VERSION = "1.2.1";
const SHELL_CACHE = "ledger-shell-" + VERSION;
const FONT_CACHE = "ledger-fonts";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  // Fetch fresh copies (skip the HTTP cache) so the new version really is new.
  // No skipWaiting here: the page activates the update when it is ready to.
  e.waitUntil(caches.open(SHELL_CACHE).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" })))));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL_CACHE && k !== FONT_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  const msg = e.data || {};
  if (msg.type === "SKIP_WAITING") self.skipWaiting();
  if (msg.type === "GET_VERSION" && e.ports && e.ports[0]) e.ports[0].postMessage({ version: VERSION });
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The update check must always reach the network.
  if (url.origin === location.origin && url.pathname.endsWith("/version.json")) return;

  // Opening the app: always from this version's cache, so it works offline and
  // only changes when an update is activated.
  if (req.mode === "navigate") {
    e.respondWith(
      caches.open(SHELL_CACHE)
        .then((c) => c.match(req, { ignoreSearch: true }).then((hit) => hit || c.match("index.html")))
        .then((hit) => hit || fetch(req))
    );
    return;
  }

  // App files: cache first.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.open(SHELL_CACHE).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)))
    );
    return;
  }

  // Google Fonts: cache first, kept across versions.
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(
      caches.open(FONT_CACHE).then((c) => c.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === "opaque") c.put(req, res.clone());
        return res;
      })))
    );
  }
});
