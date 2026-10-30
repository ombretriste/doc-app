// Cambia la versión al modificar archivos para que los móviles descarguen la nueva versión
const CACHE = 'docctrl-v13';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// Red primero (para recibir actualizaciones); caché si no hay conexión. La API nunca se cachea.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).pathname.match(/\/api\/|^\/_vercel\//)) return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// ---------- Avisos ----------
// La app guarda en IndexedDB («docctrl» → «meta» → «reminders») la lista de avisos ya calculada:
// [{k, d: 'AAAA-MM-DD', t: título, b: texto, id}]. El push llega vacío; aquí se muestran los avisos de
// hoy (o de los últimos días, si alguno no llegó) que aún no se hayan enseñado.

const LATE_DAYS = 3;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('docctrl', 2);
    req.onupgradeneeded = () => {
      for (const name of ['files', 'meta']) if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
async function kv(mode, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('meta', mode);
    const req = fn(tx.objectStore('meta'));
    tx.oncomplete = () => resolve(req && req.result);
    tx.onerror = () => reject(tx.error);
  });
}
const kvGet = (k) => kv('readonly', (s) => s.get(k));
const kvSet = (k, v) => kv('readwrite', (s) => s.put(v, k));

const pad = (n) => String(n).padStart(2, '0');
const isoDay = (t) => { const d = new Date(t); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

// Siempre se muestra algo (Safari retira el permiso si un push no enseña ninguna notificación)
async function handlePush() {
  const list = (await kvGet('reminders').catch(() => null)) || [];
  const shown = new Set((await kvGet('shown').catch(() => null)) || []);
  const today = isoDay(Date.now());
  const oldest = isoDay(Date.now() - LATE_DAYS * 864e5);
  const due = list.filter((r) => r.d <= today && r.d >= oldest && !shown.has(r.k));
  const opts = { icon: 'icons/icon-192.png', badge: 'icons/icon-192.png' };
  if (!due.length) {
    const next = list.find((r) => r.d > today);
    await self.registration.showNotification('DocCTRL', { ...opts, tag: 'docctrl-info', body: next ? `Próximo aviso: ${next.t}, el ${next.d.split('-').reverse().join('/')}.` : 'No tienes vencimientos pendientes.' });
    return;
  }
  // Hasta 3 avisos sueltos; si hay más, uno que los resume
  if (due.length <= 3) {
    for (const r of due) await self.registration.showNotification(r.t, { ...opts, body: r.b, tag: r.k, data: { id: r.id } });
  } else {
    await self.registration.showNotification(`DocCTRL · ${due.length} avisos`, {
      ...opts,
      tag: `docctrl-${today}`,
      body: due.slice(0, 4).map((r) => r.t).join(' · ') + (due.length > 4 ? '…' : ''),
    });
  }
  // Se recuerdan solo las claves que siguen en la lista
  due.forEach((r) => shown.add(r.k));
  const keys = new Set(list.map((r) => r.k));
  await kvSet('shown', [...shown].filter((k) => keys.has(k)));
}
self.addEventListener('push', (event) => event.waitUntil(handlePush()));

// Al tocar la notificación: abre la app (o la trae al frente) en la ficha de esa partida
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const id = event.notification.data && event.notification.data.id;
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (wins.length) {
      if (id) wins[0].postMessage({ type: 'open', id });
      return wins[0].focus();
    }
    return self.clients.openWindow(id ? `./?open=${encodeURIComponent(id)}` : './');
  })());
});
