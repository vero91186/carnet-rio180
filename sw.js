/* Carnet Rio 180 — service worker
   Incrémentez VERSION pour vider entièrement le cache. */
const VERSION = "v1";
const CACHE = "carnet-rio180-" + VERSION;

// Mise en cache immédiate de la page, dès l'installation.
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(["./", "./index.html"]))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

// Suppression des caches des versions précédentes.
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((noms) => Promise.all(
        noms.filter((n) => n !== CACHE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;

  // La page : le réseau d'abord, pour toujours afficher la dernière version
  // poussée sur GitHub ; le cache seulement si la connexion manque.
  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req)
        .then((rep) => {
          const copie = rep.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copie));
          return rep;
        })
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")))
    );
    return;
  }

  // Le reste (images, scripts) : le cache d'abord, il ne change quasiment jamais.
  e.respondWith(
    caches.match(req).then((hit) =>
      hit || fetch(req).then((rep) => {
        if (rep && rep.ok) {
          const copie = rep.clone();
          caches.open(CACHE).then((c) => c.put(req, copie));
        }
        return rep;
      })
    )
  );
});
