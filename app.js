'use strict';

// Versión de la app (se ve en la pantalla de inicio). Arreglos y ajustes: 0.x.y; novedades: 0.x.0.
const APP_VERSION = '0.1.0';
const STORAGE_KEY = 'docctrl:v1';
const DISPLAY_KEY = 'docctrl:display';
const INSTALL_HINT_KEY = 'docctrl:installHint';

const ICONS = {
  // Categorías
  id: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16c.6-1.6 1.7-2.4 3-2.4s2.4.8 3 2.4"/><path d="M14 10h4M14 13h4"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5"/><path d="M3.5 12h17"/><rect x="3.5" y="12" width="17" height="4.5" rx="1"/><circle cx="7.5" cy="14.2" r=".9" fill="currentColor"/><circle cx="16.5" cy="14.2" r=".9" fill="currentColor"/><path d="M6 16.5v2M18 16.5v2"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
  health: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/><path d="M12 10.5v5M9.5 13h5"/>',
  money: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10h18"/><path d="M7 14.5h4"/>',
  other: '<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>',
  // Tipos con icono propio
  passport: '<rect x="5.5" y="3" width="13" height="18" rx="2"/><circle cx="12" cy="10.5" r="3.2"/><path d="M8.8 10.5h6.4M12 7.3c-1 .9-1.4 2-1.4 3.2s.4 2.3 1.4 3.2c1-.9 1.4-2 1.4-3.2s-.4-2.3-1.4-3.2z"/><path d="M9 17h6"/>',
  license: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><circle cx="8.5" cy="12" r="2.6"/><path d="M8.5 9.4v1.2M6.1 13l1.2-.4M10.9 13l-1.2-.4"/><path d="M14 10h4M14 13h4"/>',
  shield: '<path d="M12 3.5l7 2.5v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z"/><path d="M9 12l2.2 2.2L15.5 10"/>',
  bolt: '<path d="M13 3L5.5 13.5H12L11 21l7.5-10.5H12z"/>',
  flame: '<path d="M12 21c-3.6 0-6-2.4-6-5.6 0-3.6 3-5.4 3.6-9.4 2.4 1.6 3.6 3.6 3.6 5.6.9-.6 1.5-1.6 1.7-2.8 1.9 1.6 3.1 4 3.1 6.6 0 3.2-2.4 5.6-6 5.6z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16 7l2.5 2.5M14 9l2 2"/>',
  heart: '<path d="M3.5 12h4l2-4 3 8 2-4h6"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2.5"/><path d="M3 10h18"/><path d="M15.5 14.5h2"/>',
  bank: '<path d="M3.5 9.5L12 4.5l8.5 5"/><path d="M5.5 10v7M10 10v7M14 10v7M18.5 10v7"/><path d="M3.5 19.5h17"/>',
  tag: '<path d="M3.5 12.3V4.5a1 1 0 0 1 1-1h7.8l8.2 8.2a1 1 0 0 1 0 1.4l-7.4 7.4a1 1 0 0 1-1.4 0z"/><circle cx="8" cy="8" r="1.5"/>',
  repeat: '<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5"/><path d="M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5"/><path d="M4 20v-4.5h4.5"/>',
  paw: '<circle cx="7" cy="10" r="1.8"/><circle cx="10.5" cy="6.5" r="1.8"/><circle cx="14.5" cy="6.5" r="1.8"/><circle cx="18" cy="10" r="1.8"/><path d="M12.5 11.5c-2.5 0-5.5 4-5.5 6.5 0 1.6 1.4 2 2.6 2 1.4 0 2-.6 2.9-.6s1.5.6 2.9.6c1.2 0 2.6-.4 2.6-2 0-2.5-3-6.5-5.5-6.5z"/>',
  ticket: '<path d="M3.5 8.5V6a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2.5a2.5 2.5 0 0 0 0 5V16a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2.5a2.5 2.5 0 0 0 0-5z"/><path d="M14 5v12" stroke-dasharray="1.5 2"/>',
  doc: '<path d="M6.5 3h7.5l4.5 4.5V20a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4.5h4.5"/><path d="M8.5 12h7M8.5 15.5h7"/>',
  receipt: '<path d="M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21z"/><path d="M9 8h6M9 11.5h6M9 15h4"/>',
  // Interfaz
  camera: '<path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18z"/><circle cx="12" cy="13" r="3.5"/>',
  trash: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/><path d="M10 11v5.5M14 11v5.5"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>',
  bell: '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="2"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
  phone: '<path d="M5 4h3.5l1.5 4-2 1.5a10 10 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5.5A1.5 1.5 0 0 1 5 4z"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  people: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5"/><circle cx="16.5" cy="9.5" r="2.5"/><path d="M15.5 14.2c2.4-.4 4.4 1.2 5 4.3"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1.2"/><circle cx="10" cy="7" r="1.2"/><circle cx="15" cy="7.5" r="1.2"/>',
  download: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
  upload: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
const icon = (name, size = 22) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.doc}</svg>`;

// Logo de DocCTRL: anillo fino, anillo discontinuo, arco y tarjeta de identidad de líneas finas
let logoCount = 0;
function logoSVG(size) {
  const id = `dc-g${logoCount++}`;
  return `
    <svg class="logo-mark" viewBox="0 0 120 120" width="${size}" height="${size}" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#f97316"/><stop offset=".55" stop-color="#fbbf24"/><stop offset="1" stop-color="#fde68a"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="52" stroke="url(#${id})" stroke-width="1.2" opacity=".55"/>
      <circle cx="60" cy="60" r="42" stroke="url(#${id})" stroke-width=".8" stroke-dasharray="2 5" opacity=".6"/>
      <path d="M60 8 A52 52 0 1 1 14.97 86" stroke="url(#${id})" stroke-width="3"/>
      <circle cx="14.97" cy="86" r="3" fill="#fbbf24" stroke="none"/>
      <rect x="33" y="43" width="54" height="36" rx="5" stroke="url(#${id})" stroke-width="1.8"/>
      <circle cx="47" cy="57" r="5" stroke="url(#${id})" stroke-width="1.6"/>
      <path d="M39 71c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="url(#${id})" stroke-width="1.6"/>
      <path d="M61 54h18M61 61h18M61 68h11" stroke="url(#${id})" stroke-width="1.6"/>
    </svg>`;
}
document.querySelectorAll('[data-logo]').forEach((el) => { el.innerHTML = logoSVG(Number(el.dataset.logo)); });
document.getElementById('app-version').textContent = `Versión ${APP_VERSION}`;

// ---------- Catálogo de partidas ----------
// Campos: t = text · d = fecha · n = número · tel = teléfono · eur = importe · a = texto largo.
// `exp: true` marca la fecha que vence (caducidad, ITV, renovación…) y genera avisos.

const CATS = {
  id: { label: 'Identidad', icon: 'id' },
  car: { label: 'Vehículos', icon: 'car' },
  home: { label: 'Hogar', icon: 'home' },
  health: { label: 'Salud y seguros', icon: 'health' },
  money: { label: 'Finanzas', icon: 'money' },
  other: { label: 'Otros', icon: 'other' },
};

const F = (k, l, t = 't', x = {}) => ({ k, l, t, ...x });
const EXP = (l = 'Caducidad') => F('exp', l, 'd', { exp: true });
const COMPANY = F('company', 'Compañía');
const POLICY = F('policy', 'Nº de póliza');
const PRICE = (l = 'Prima anual') => F('price', l, 'eur');

const TYPES = {
  dni: { cat: 'id', label: 'DNI', fields: [F('num', 'Número'), F('fullname', 'Nombre completo'), F('birth', 'Fecha de nacimiento', 'd'), F('idesp', 'Nº de soporte (IDESP)'), F('issued', 'Expedición', 'd'), EXP()] },
  passport: { cat: 'id', label: 'Pasaporte', icon: 'passport', fields: [F('num', 'Número'), F('issued', 'Expedición', 'd'), EXP(), F('place', 'Expedido en')] },
  license: { cat: 'id', label: 'Carnet de conducir', icon: 'license', fields: [F('num', 'Número'), F('classes', 'Permisos (B, A2…)'), F('issued', 'Expedición', 'd'), EXP(), F('points', 'Puntos', 'n')] },
  nie: { cat: 'id', label: 'NIE / TIE', fields: [F('num', 'Número'), EXP()] },
  healthcard: { cat: 'id', label: 'Tarjeta sanitaria', icon: 'health', fields: [F('num', 'Nº de tarjeta'), F('cip', 'Código CIP'), F('center', 'Centro de salud'), F('doctor', 'Médico de cabecera'), F('phone', 'Teléfono de citas', 'tel')] },
  tse: { cat: 'id', label: 'Tarjeta sanitaria europea', icon: 'health', fields: [F('num', 'Nº de tarjeta'), EXP()] },
  ss: { cat: 'id', label: 'Seguridad Social', icon: 'shield', fields: [F('num', 'Nº de afiliación')] },

  vehicle: { cat: 'car', label: 'Vehículo e ITV', fields: [F('plate', 'Matrícula'), F('model', 'Marca y modelo'), F('vin', 'Nº de bastidor'), F('reg', 'Matriculación', 'd'), EXP('Próxima ITV')] },
  carins: { cat: 'car', label: 'Seguro del vehículo', icon: 'shield', fields: [COMPANY, POLICY, F('plate', 'Matrícula'), F('assist', 'Asistencia en carretera', 'tel'), PRICE(), EXP('Vencimiento')] },
  cartax: { cat: 'car', label: 'Impuesto de circulación', icon: 'receipt', fields: [F('plate', 'Matrícula'), F('council', 'Ayuntamiento'), PRICE('Importe'), EXP('Fecha de pago')] },

  homeins: { cat: 'home', label: 'Seguro de hogar', icon: 'shield', fields: [COMPANY, POLICY, F('phone', 'Teléfono de siniestros', 'tel'), PRICE(), EXP('Vencimiento')] },
  rent: { cat: 'home', label: 'Alquiler o hipoteca', icon: 'key', fields: [F('entity', 'Banco o propietario'), F('ref', 'Nº de contrato'), F('price', 'Cuota mensual', 'eur'), F('start', 'Inicio', 'd'), EXP('Fin o revisión')] },
  utility: { cat: 'home', label: 'Suministro (luz, gas, agua, internet)', icon: 'bolt', fields: [F('service', 'Servicio'), COMPANY, F('contract', 'Nº de contrato'), F('cups', 'CUPS o nº de cliente'), F('phone', 'Teléfono de averías', 'tel'), F('price', 'Importe aproximado', 'eur')] },
  boiler: { cat: 'home', label: 'Revisión de caldera o gas', icon: 'flame', fields: [COMPANY, F('phone', 'Teléfono', 'tel'), F('last', 'Última revisión', 'd'), EXP('Próxima revisión')] },

  medins: { cat: 'health', label: 'Seguro médico', icon: 'shield', fields: [COMPANY, POLICY, F('card', 'Nº de tarjeta'), F('phone', 'Teléfono', 'tel'), PRICE(), EXP('Vencimiento')] },
  lifeins: { cat: 'health', label: 'Seguro de vida', icon: 'shield', fields: [COMPANY, POLICY, F('capital', 'Capital asegurado', 'eur'), F('benef', 'Beneficiarios'), PRICE(), EXP('Vencimiento')] },
  medfile: { cat: 'health', label: 'Ficha médica', icon: 'heart', fields: [F('blood', 'Grupo sanguíneo'), F('allergies', 'Alergias', 'a'), F('meds', 'Medicación habitual', 'a'), F('contact', 'Contacto de emergencia'), F('ephone', 'Teléfono de emergencia', 'tel')] },

  bank: { cat: 'money', label: 'Cuenta bancaria', icon: 'bank', fields: [F('bank', 'Banco'), F('iban', 'IBAN'), F('holders', 'Titulares'), F('phone', 'Teléfono del banco', 'tel')] },
  card: { cat: 'money', label: 'Tarjeta bancaria', icon: 'card', note: 'Por seguridad, guarda solo los últimos 4 dígitos: nunca el número completo, el PIN ni el CVV.', fields: [F('bank', 'Banco'), F('last4', 'Últimos 4 dígitos', 'n', { max: 4 }), EXP(), F('phone', 'Teléfono para bloquearla', 'tel')] },

  warranty: { cat: 'other', label: 'Garantía', icon: 'tag', fields: [F('product', 'Producto'), F('shop', 'Tienda'), F('bought', 'Fecha de compra', 'd'), F('price', 'Precio', 'eur'), EXP('Fin de la garantía')] },
  subscription: { cat: 'other', label: 'Suscripción', icon: 'repeat', fields: [F('service', 'Servicio'), F('price', 'Importe', 'eur'), F('period', 'Periodicidad (mensual, anual…)'), EXP('Próxima renovación')] },
  pet: { cat: 'other', label: 'Mascota', icon: 'paw', fields: [F('petname', 'Nombre'), F('chip', 'Nº de microchip'), F('vet', 'Veterinario'), F('phone', 'Teléfono del veterinario', 'tel'), EXP('Próxima vacuna')] },
  membership: { cat: 'other', label: 'Carnet de socio', icon: 'ticket', fields: [F('entity', 'Entidad (gimnasio, biblioteca…)'), F('num', 'Nº de socio'), EXP()] },
  generic: { cat: 'other', label: 'Otro documento', icon: 'doc', fields: [F('num', 'Número o referencia'), EXP()] },
};
const typeIcon = (t) => TYPES[t]?.icon || CATS[TYPES[t]?.cat]?.icon || 'doc';

// ---------- Utilidades ----------

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, '0');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const normalize = (t) => String(t ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const todayISO = () => { const t = new Date(); return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`; };
const fmtDate = (iso) => (/^\d{4}-\d{2}-\d{2}$/.test(iso || '') ? `${iso.slice(8)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : iso || '');
function daysUntil(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const t = new Date();
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(t.getFullYear(), t.getMonth(), t.getDate())) / 864e5);
}
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (_) {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (_) {
    return false;
  }
}

function toast(text) {
  document.querySelector('.toast')?.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = text;
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}

// ---------- Fotos (IndexedDB) ----------
// Los datos van en localStorage; las fotos, comprimidas, en IndexedDB (clave = id de la foto).

let dbPromise;
function openDB() {
  return (dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open('docctrl', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('files');
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}
async function idb(mode, fn) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', mode);
    const req = fn(tx.objectStore('files'));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
  });
}
const putFile = (id, blob) => idb('readwrite', (s) => s.put(blob, id));
const getFile = (id) => idb('readonly', (s) => s.get(id));
const delFile = (id) => idb('readwrite', (s) => s.delete(id));
const clearFiles = () => idb('readwrite', (s) => s.clear());

const urlCache = new Map();
async function fileURL(id) {
  if (urlCache.has(id)) return urlCache.get(id);
  const blob = await getFile(id).catch(() => null);
  if (!blob) return null;
  const url = URL.createObjectURL(blob);
  urlCache.set(id, url);
  return url;
}
// Rellena las <img data-photo="id"> de un contenedor
function hydratePhotos(root) {
  root.querySelectorAll('img[data-photo]').forEach(async (img) => {
    const url = await fileURL(img.dataset.photo);
    if (url) img.src = url;
  });
}

// Reduce la foto a 1800 px como máximo y la guarda en JPEG
async function compressImage(file) {
  const MAX = 1800;
  const src = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
  const scale = Math.min(1, MAX / Math.max(src.naturalWidth, src.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(src.naturalWidth * scale);
  canvas.height = Math.round(src.naturalHeight * scale);
  canvas.getContext('2d').drawImage(src, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(src.src);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b || file), 'image/jpeg', 0.85));
}

// ---------- Datos ----------
// people: [{id, name}] · items: [{id, type, person ('' = común), label, f: {campo: valor}, notes, photos: [id], upd}]
// warnDays: con cuántos días de antelación se avisa de un vencimiento.

function cleanData(d) {
  const people = Array.isArray(d?.people) ? d.people.filter((p) => p?.id && p.name).map((p) => ({ id: String(p.id), name: String(p.name) })) : [];
  const ids = new Set(people.map((p) => p.id));
  const items = (Array.isArray(d?.items) ? d.items : []).filter((it) => it?.id && TYPES[it.type]).map((it) => ({
    id: String(it.id),
    type: it.type,
    person: ids.has(it.person) ? it.person : '',
    label: String(it.label || ''),
    f: Object.fromEntries(Object.entries(it.f || {}).filter(([, v]) => v !== '' && v != null).map(([k, v]) => [k, String(v)])),
    notes: String(it.notes || ''),
    photos: Array.isArray(it.photos) ? it.photos.map(String) : [],
    upd: it.upd || todayISO(),
  }));
  const warnDays = Number.isFinite(Number(d?.warnDays)) && Number(d.warnDays) > 0 ? Number(d.warnDays) : 60;
  return { people: people.length || d?.people ? people : [{ id: 'p1', name: 'Yo' }], items, warnDays };
}

let data = cleanData(load(STORAGE_KEY, null));
let filter = 'all'; // 'all' · '' (común) · id de persona
let query = '';

function persist() {
  if (!save(STORAGE_KEY, data)) toast('No se han podido guardar los datos en este dispositivo.');
}

const personName = (id) => (id ? data.people.find((p) => p.id === id)?.name || '' : 'Común');
const itemTitle = (it) => it.label || TYPES[it.type].label;
// Dato que identifica la partida en la lista: el primer campo relleno que no sea fecha
function itemKeyValue(it) {
  const f = TYPES[it.type].fields.find((x) => x.t !== 'd' && x.t !== 'a' && it.f[x.k]);
  return f ? (f.k === 'last4' ? `•••• ${it.f[f.k]}` : it.f[f.k]) : '';
}

// Estado del vencimiento: vencido, próximo (dentro del aviso) o en regla
function expiry(it) {
  const f = TYPES[it.type].fields.find((x) => x.exp);
  const date = f && it.f[f.k];
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const days = daysUntil(date);
  const cls = days < 0 ? 'expired' : days <= data.warnDays ? 'soon' : 'ok';
  return { date, days, cls, label: f.l };
}
function expiryText(e) {
  if (e.days < 0) return -e.days <= 60 ? `Vencido hace ${plural(-e.days, 'día', 'días')}` : `Vencido el ${fmtDate(e.date)}`;
  if (e.days === 0) return 'Vence hoy';
  if (e.days === 1) return 'Vence mañana';
  if (e.cls === 'soon') return `Vence en ${e.days} días`;
  return `Hasta el ${fmtDate(e.date)}`;
}

function visibleItems() {
  const q = normalize(query.trim());
  return data.items.filter((it) => {
    if (filter !== 'all' && it.person !== filter) return false;
    if (!q) return true;
    const hay = [itemTitle(it), TYPES[it.type].label, personName(it.person), it.notes, ...Object.values(it.f)].map(normalize).join(' ');
    return q.split(/\s+/).every((w) => hay.includes(w));
  });
}

// ---------- Render ----------

function render() {
  renderSummary();
  renderPeople();
  renderList();
}

function renderSummary() {
  const items = filter === 'all' ? data.items : data.items.filter((it) => it.person === filter);
  const withExp = items.map((it) => ({ it, e: expiry(it) })).filter((x) => x.e);
  const expired = withExp.filter((x) => x.e.cls === 'expired');
  const soon = withExp.filter((x) => x.e.cls === 'soon');
  const attention = [...expired, ...soon].sort((a, b) => a.e.days - b.e.days);
  const n = attention.length;
  $('summary').classList.toggle('alert', expired.length > 0);
  $('summary').innerHTML = `
    <p class="label">Vencimientos</p>
    <div class="big-stat">
      ${n ? `<span class="big-number">${n}</span><span class="big-label">${n === 1 ? 'partida requiere' : 'partidas requieren'} atención</span>`
        : `<span class="big-ok">${icon('check', 40)}</span><span class="big-label">${items.length ? 'Todo en regla' : 'Aún no hay nada guardado'}</span>`}
    </div>
    <dl class="tiles">
      <div class="${expired.length ? 't-expired' : ''}"><dt>Vencidos</dt><dd>${expired.length}</dd></div>
      <div class="${soon.length ? 't-soon' : ''}"><dt>Próx. ${data.warnDays} d</dt><dd>${soon.length}</dd></div>
      <div><dt>Partidas</dt><dd>${items.length}</dd></div>
    </dl>
    ${n ? `<ul class="upcoming">${attention.slice(0, 5).map(({ it, e }) => `
      <li><button type="button" data-open="${it.id}">
        <span class="up-dot ${e.cls}"></span>
        <span class="up-name">${esc(itemTitle(it))}${data.people.length > 1 || it.person === '' ? ` <small>${esc(personName(it.person))}</small>` : ''}</span>
        <span class="up-when ${e.cls}">${esc(expiryText(e))}</span>
      </button></li>`).join('')}</ul>` : ''}`;
}

function renderPeople() {
  const opts = [['all', 'Todos'], ...data.people.map((p) => [p.id, p.name]), ['', 'Común']];
  $('people-row').innerHTML = opts.map(([id, name]) => {
    const count = id === 'all' ? data.items.length : data.items.filter((it) => it.person === id).length;
    return `<button type="button" class="chip ${filter === id ? 'on' : ''}" data-person="${esc(id)}">${esc(name)}<span>${count}</span></button>`;
  }).join('');
}

function itemCard(it) {
  const e = expiry(it);
  const type = TYPES[it.type];
  const sub = [it.label ? type.label : '', filter === 'all' ? personName(it.person) : '', itemKeyValue(it)].filter(Boolean).join(' · ');
  return `
    <button type="button" class="item cat-${type.cat}" data-open="${it.id}">
      <span class="item-icon">${icon(typeIcon(it.type), 22)}</span>
      <span class="item-main">
        <span class="item-title">${esc(itemTitle(it))}</span>
        ${sub ? `<span class="item-sub">${esc(sub)}</span>` : ''}
        ${e ? `<span class="item-exp ${e.cls}">${esc(expiryText(e))}</span>` : ''}
      </span>
      ${it.photos.length ? `<span class="item-thumb"><img data-photo="${esc(it.photos[0])}" alt="">${it.photos.length > 1 ? `<i>${it.photos.length}</i>` : ''}</span>` : ''}
    </button>`;
}

function renderList() {
  const items = visibleItems();
  const list = $('list');
  if (!data.items.length) {
    list.innerHTML = `
      <div class="card empty">
        <span class="empty-logo">${logoSVG(72)}</span>
        <h2>Tu archivo está vacío</h2>
        <p class="muted">Guarda aquí el DNI, el carnet de conducir, los seguros, la ITV, las garantías… con sus fotos y fechas de caducidad. DocCTRL te avisará antes de que venzan.</p>
        <button type="button" class="done-btn" data-add>${icon('plus', 18)} Añadir la primera</button>
      </div>`;
    return;
  }
  if (!items.length) {
    list.innerHTML = `<p class="muted center-note">${query ? 'Nada coincide con la búsqueda.' : 'No hay partidas para esta persona.'}</p>`;
    return;
  }
  list.innerHTML = Object.entries(CATS).map(([cat, c]) => {
    const group = items.filter((it) => TYPES[it.type].cat === cat)
      .sort((a, b) => Object.keys(TYPES).indexOf(a.type) - Object.keys(TYPES).indexOf(b.type) || itemTitle(a).localeCompare(itemTitle(b), 'es'));
    if (!group.length) return '';
    return `
      <section class="group cat-${cat}">
        <h2 class="group-title"><span>${icon(c.icon, 16)}</span>${c.label}<small>${group.length}</small></h2>
        <div class="items">${group.map(itemCard).join('')}</div>
      </section>`;
  }).join('');
  hydratePhotos(list);
}

// ---------- Hojas (ventanas inferiores) ----------

function openSheet(cls, label) {
  closeSheet();
  const back = document.createElement('div');
  back.className = 'sheet-backdrop';
  back.innerHTML = `<div class="sheet ${cls}" role="dialog" aria-modal="true" aria-label="${esc(label)}"></div>`;
  document.body.append(back);
  back.addEventListener('click', (e) => { if (e.target === back) closeSheet(); });
  return back.firstElementChild;
}
function closeSheet() {
  document.querySelector('.sheet-backdrop')?.remove();
}

// Elegir el tipo de partida que se añade
function openTypePicker() {
  const sheet = openSheet('picker-sheet tall', 'Añadir');
  sheet.innerHTML = `
    <div class="sheet-head"><h2 class="sheet-title">¿Qué quieres guardar?</h2>
      <button class="icon-btn sm" type="button" data-close aria-label="Cerrar">${icon('close', 18)}</button></div>
    ${Object.entries(CATS).map(([cat, c]) => `
      <p class="opt-label">${c.label}</p>
      <div class="type-grid cat-${cat}">
        ${Object.entries(TYPES).filter(([, t]) => t.cat === cat).map(([k, t]) =>
          `<button type="button" class="type-btn" data-type="${k}"><span>${icon(typeIcon(k), 22)}</span>${esc(t.label)}</button>`).join('')}
      </div>`).join('')}`;
  sheet.querySelector('[data-close]').addEventListener('click', closeSheet);
  sheet.querySelectorAll('[data-type]').forEach((b) => b.addEventListener('click', () => openEditor(null, b.dataset.type)));
}

// Alta y edición de una partida
let editorPhotos = null; // [{id, blob?}] mientras el editor está abierto

function openEditor(id, typeKey) {
  const it = id ? data.items.find((x) => x.id === id) : null;
  const type = TYPES[it ? it.type : typeKey];
  const tkey = it ? it.type : typeKey;
  const defPerson = it ? it.person : filter !== 'all' ? filter : data.people[0]?.id || '';
  let person = defPerson;
  editorPhotos = (it?.photos || []).map((p) => ({ id: p }));
  const sheet = openSheet('editor-sheet tall', type.label);

  const field = (f) => {
    const v = esc(it?.f[f.k] ?? '');
    const input = f.t === 'a'
      ? `<textarea data-k="${f.k}" rows="2">${v}</textarea>`
      : `<input data-k="${f.k}" type="${f.t === 'd' ? 'date' : f.t === 'tel' ? 'tel' : 'text'}" ${f.t === 'n' ? 'inputmode="numeric"' : f.t === 'eur' ? 'inputmode="decimal"' : ''} ${f.max ? `maxlength="${f.max}"` : ''} value="${v}" autocomplete="off">`;
    return `<label class="fld ${f.t === 'a' ? 'wide' : ''} ${f.exp ? 'is-exp' : ''}"><span>${esc(f.l)}${f.t === 'eur' ? ' (€)' : ''}${f.exp ? ` ${icon('bell', 12)}` : ''}</span>${input}</label>`;
  };

  sheet.innerHTML = `
    <div class="sheet-head cat-${type.cat}">
      <span class="item-icon">${icon(typeIcon(tkey), 22)}</span>
      <h2 class="sheet-title">${esc(type.label)}</h2>
      <button class="icon-btn sm" type="button" data-close aria-label="Cerrar">${icon('close', 18)}</button>
    </div>
    <p class="opt-label">De quién es</p>
    <div class="chips-wrap" id="ed-person">
      ${[...data.people.map((p) => [p.id, p.name]), ['', 'Común']].map(([pid, name]) =>
        `<button type="button" class="chip ${person === pid ? 'on' : ''}" data-pid="${esc(pid)}">${esc(name)}</button>`).join('')}
    </div>
    <div class="fields">
      <label class="fld wide"><span>Nombre (opcional)</span><input id="ed-label" type="text" value="${esc(it?.label || '')}" placeholder="${esc(type.label)}" autocomplete="off"></label>
      ${type.fields.map(field).join('')}
    </div>
    ${type.note ? `<p class="muted small type-note">${esc(type.note)}</p>` : ''}
    <p class="opt-label">Fotos</p>
    <div class="photo-strip" id="ed-photos"></div>
    <label class="fld wide"><span>Notas</span><textarea id="ed-notes" rows="3">${esc(it?.notes || '')}</textarea></label>
    <div class="editor-actions">
      ${it ? `<button type="button" class="ghost-btn danger" id="ed-delete">${icon('trash', 18)} Eliminar</button>` : '<span></span>'}
      <button type="button" class="done-btn" id="ed-save">Guardar</button>
    </div>`;

  const drawPhotos = () => {
    const strip = sheet.querySelector('#ed-photos');
    strip.innerHTML = editorPhotos.map((p, i) => `
      <span class="ph"><img ${p.blob ? '' : `data-photo="${esc(p.id)}"`} alt="">
        <button type="button" class="ph-del" data-i="${i}" aria-label="Quitar foto">${icon('close', 14)}</button></span>`).join('')
      + `<button type="button" class="ph-add" id="ed-add-photo">${icon('camera', 24)}<span>Añadir</span></button>`;
    editorPhotos.forEach((p, i) => {
      if (p.blob) strip.querySelectorAll('.ph img')[i].src = p.url;
    });
    hydratePhotos(strip);
    strip.querySelectorAll('.ph-del').forEach((b) => b.addEventListener('click', () => {
      editorPhotos.splice(Number(b.dataset.i), 1);
      drawPhotos();
    }));
    strip.querySelector('#ed-add-photo').addEventListener('click', () => $('photo-input').click());
  };
  drawPhotos();
  sheet._drawPhotos = drawPhotos;

  sheet.querySelector('[data-close]').addEventListener('click', closeSheet);
  sheet.querySelectorAll('#ed-person .chip').forEach((b) => b.addEventListener('click', () => {
    person = b.dataset.pid;
    sheet.querySelectorAll('#ed-person .chip').forEach((c) => c.classList.toggle('on', c === b));
  }));

  sheet.querySelector('#ed-save').addEventListener('click', async () => {
    const f = {};
    sheet.querySelectorAll('[data-k]').forEach((el) => { const v = el.value.trim(); if (v) f[el.dataset.k] = v; });
    const label = sheet.querySelector('#ed-label').value.trim();
    const notes = sheet.querySelector('#ed-notes').value.trim();
    // Fotos nuevas a IndexedDB; las quitadas, fuera
    try {
      for (const p of editorPhotos) if (p.blob) await putFile(p.id, p.blob);
    } catch (_) {
      return alert('No se han podido guardar las fotos en este dispositivo (¿falta espacio?).');
    }
    const keep = new Set(editorPhotos.map((p) => p.id));
    for (const old of it?.photos || []) if (!keep.has(old)) { delFile(old).catch(() => {}); urlCache.delete(old); }
    editorPhotos.filter((p) => p.blob).forEach((p) => urlCache.set(p.id, p.url));
    const rec = { id: it?.id || uid(), type: tkey, person, label, f, notes, photos: editorPhotos.map((p) => p.id), upd: todayISO() };
    if (it) Object.assign(it, rec);
    else data.items.push(rec);
    persist();
    editorPhotos = null;
    render();
    openDetail(rec.id);
    toast(it ? 'Cambios guardados' : 'Partida guardada');
  });

  sheet.querySelector('#ed-delete')?.addEventListener('click', () => {
    if (!confirm(`¿Eliminar «${itemTitle(it)}» y sus fotos? No se puede deshacer.`)) return;
    it.photos.forEach((p) => { delFile(p).catch(() => {}); urlCache.delete(p); });
    data.items = data.items.filter((x) => x !== it);
    persist();
    closeSheet();
    render();
    toast('Partida eliminada');
  });
}

$('photo-input').addEventListener('change', async (e) => {
  const files = [...e.target.files];
  e.target.value = '';
  const sheet = document.querySelector('.editor-sheet');
  if (!sheet || !editorPhotos) return;
  for (const file of files) {
    try {
      const blob = await compressImage(file);
      editorPhotos.push({ id: uid(), blob, url: URL.createObjectURL(blob) });
    } catch (_) {
      toast('No se ha podido leer una de las fotos.');
    }
  }
  sheet._drawPhotos();
});

// Ficha de una partida: datos (tocar para copiar), fotos y acciones
function openDetail(id) {
  const it = data.items.find((x) => x.id === id);
  if (!it) return;
  const type = TYPES[it.type];
  const e = expiry(it);
  const sheet = openSheet('detail-sheet tall', itemTitle(it));
  const value = (f, v) => (f.t === 'd' ? fmtDate(v) : f.t === 'eur' ? `${v} €` : f.k === 'last4' ? `•••• ${v}` : v);
  const rows = type.fields.filter((f) => it.f[f.k]);
  sheet.innerHTML = `
    <div class="sheet-head cat-${type.cat}">
      <span class="item-icon">${icon(typeIcon(it.type), 22)}</span>
      <div class="head-text"><h2 class="sheet-title">${esc(itemTitle(it))}</h2>
        <p class="muted small">${esc([it.label ? type.label : '', personName(it.person)].filter(Boolean).join(' · '))}</p></div>
      <button class="icon-btn sm" type="button" data-close aria-label="Cerrar">${icon('close', 18)}</button>
    </div>
    ${e ? `<div class="exp-banner ${e.cls}">${icon('bell', 18)}<span><b>${esc(expiryText(e))}</b><small>${esc(e.label)}: ${fmtDate(e.date)}</small></span></div>` : ''}
    ${rows.length ? `<dl class="facts">${rows.map((f) => `
      <div class="fact ${f.t === 'a' ? 'wide' : ''}">
        <dt>${esc(f.l)}</dt>
        <dd><button type="button" class="copy" data-copy="${esc(it.f[f.k])}">${esc(value(f, it.f[f.k]))}</button>
          ${f.t === 'tel' ? `<a class="call" href="tel:${esc(it.f[f.k].replace(/[^\d+]/g, ''))}" aria-label="Llamar">${icon('phone', 16)}</a>` : ''}</dd>
      </div>`).join('')}</dl>` : '<p class="muted small">Sin datos todavía. Pulsa «Editar» para completarla.</p>'}
    ${it.photos.length ? `<div class="photo-grid">${it.photos.map((p, i) => `<button type="button" class="ph" data-view="${i}"><img data-photo="${esc(p)}" alt="Foto ${i + 1}"></button>`).join('')}</div>` : ''}
    ${it.notes ? `<div class="notes"><p class="opt-label">Notas</p><p>${esc(it.notes).replace(/\n/g, '<br>')}</p></div>` : ''}
    <p class="muted tiny">Actualizada el ${fmtDate(it.upd)} · toca un dato para copiarlo</p>
    <div class="editor-actions">
      ${e ? `<button type="button" class="ghost-btn" id="dt-ics">${icon('bell', 18)} Recordatorio</button>` : '<span></span>'}
      <button type="button" class="done-btn" id="dt-edit">${icon('edit', 16)} Editar</button>
    </div>`;
  hydratePhotos(sheet);
  sheet.querySelector('[data-close]').addEventListener('click', closeSheet);
  sheet.querySelector('#dt-edit').addEventListener('click', () => openEditor(it.id));
  sheet.querySelector('#dt-ics')?.addEventListener('click', () => downloadICS(it, e));
  sheet.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      toast('Copiado');
    } catch (_) {
      toast('No se ha podido copiar');
    }
  }));
  sheet.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => openViewer(it.photos, Number(b.dataset.view))));
}

// Visor de fotos a pantalla completa
function openViewer(photos, start) {
  let i = start;
  const v = document.createElement('div');
  v.className = 'viewer';
  v.innerHTML = `
    <img alt="">
    <button class="icon-btn v-close" type="button" aria-label="Cerrar">${icon('close', 20)}</button>
    ${photos.length > 1 ? `<button class="icon-btn v-prev" type="button" aria-label="Anterior">${icon('prev', 20)}</button>
      <button class="icon-btn v-next" type="button" aria-label="Siguiente">${icon('next', 20)}</button>
      <span class="v-count"></span>` : ''}`;
  document.body.append(v);
  const show = async () => {
    v.querySelector('img').src = (await fileURL(photos[i])) || '';
    const c = v.querySelector('.v-count');
    if (c) c.textContent = `${i + 1} / ${photos.length}`;
  };
  v.querySelector('.v-close').addEventListener('click', () => v.remove());
  v.querySelector('.v-prev')?.addEventListener('click', () => { i = (i - 1 + photos.length) % photos.length; show(); });
  v.querySelector('.v-next')?.addEventListener('click', () => { i = (i + 1) % photos.length; show(); });
  v.addEventListener('click', (e) => { if (e.target === v) v.remove(); });
  show();
}

// ---------- Recordatorio en el calendario (.ics) ----------
// Evento de día completo en la fecha de vencimiento, con avisos con la antelación elegida y una semana antes.

function downloadICS(it, e) {
  const d = e.date.replace(/-/g, '');
  const next = new Date(`${e.date}T12:00:00`);
  next.setDate(next.getDate() + 1);
  const d2 = `${next.getFullYear()}${pad(next.getMonth() + 1)}${pad(next.getDate())}`;
  const icsEsc = (s) => String(s).replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const who = it.person ? ` (${personName(it.person)})` : '';
  const summary = `Vence: ${itemTitle(it)}${who}`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const alarm = (days) => ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsEsc(summary)}`, `TRIGGER:-P${days}D`, 'END:VALARM'];
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//OmT Finance//DocCTRL//ES', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', `UID:${it.id}-${d}@docctrl`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${d2}`,
    `SUMMARY:${icsEsc(summary)}`, `DESCRIPTION:${icsEsc(`${e.label} de ${TYPES[it.type].label}. Recordatorio creado con DocCTRL.`)}`,
    ...alarm(data.warnDays), ...(data.warnDays > 7 ? alarm(7) : []),
    'END:VEVENT', 'END:VCALENDAR',
  ];
  const file = new File([lines.join('\r\n') + '\r\n'], `docctrl-${normalize(itemTitle(it)).replace(/[^a-z0-9]+/g, '-')}.ics`, { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// ---------- Personas y aviso (menú ⋯) ----------

function openPeopleSheet() {
  const sheet = openSheet('people-sheet', 'Personas');
  const draw = () => {
    sheet.innerHTML = `
      <h2 class="sheet-title">Personas</h2>
      <p class="muted small">Para llevar los papeles de una persona, una pareja o toda la familia. Lo que no es de nadie en concreto (hogar, coche familiar…) va en «Común».</p>
      <div class="people-list">
        ${data.people.map((p) => `
          <div class="person-row" data-id="${esc(p.id)}">
            <input type="text" value="${esc(p.name)}" aria-label="Nombre" autocomplete="off">
            <span class="muted small">${data.items.filter((it) => it.person === p.id).length}</span>
            <button type="button" class="alw-del" aria-label="Quitar">${icon('trash', 16)}</button>
          </div>`).join('')}
      </div>
      <div class="alw-add"><button class="text-btn" type="button" id="pp-add">${icon('plus', 16)} Añadir persona</button></div>
      <div class="body-actions"><button class="done-btn" type="button" data-done>Listo</button></div>`;
    sheet.querySelectorAll('.person-row').forEach((row) => {
      const p = data.people.find((x) => x.id === row.dataset.id);
      row.querySelector('input').addEventListener('input', (e) => { if (e.target.value.trim()) { p.name = e.target.value.trim(); persist(); render(); } });
      row.querySelector('.alw-del').addEventListener('click', () => {
        const n = data.items.filter((it) => it.person === p.id).length;
        if (n && !confirm(`${p.name} tiene ${plural(n, 'partida', 'partidas')}. Pasarán a «Común». ¿Continuar?`)) return;
        data.items.forEach((it) => { if (it.person === p.id) it.person = ''; });
        data.people = data.people.filter((x) => x !== p);
        if (filter === p.id) filter = 'all';
        persist(); render(); draw();
      });
    });
    sheet.querySelector('#pp-add').addEventListener('click', () => {
      const id = uid();
      data.people.push({ id, name: `Persona ${data.people.length + 1}` });
      persist(); render(); draw();
      const input = sheet.querySelector(`.person-row[data-id="${id}"] input`);
      input.focus();
      input.select();
    });
    sheet.querySelector('[data-done]').addEventListener('click', closeSheet);
  };
  draw();
}

function openWarnSheet() {
  const sheet = openSheet('warn-sheet', 'Aviso de vencimientos');
  const draw = () => {
    sheet.innerHTML = `
      <h2 class="sheet-title">Aviso de vencimientos</h2>
      <p class="muted small">Con cuánta antelación se marca una partida como «próxima a vencer». También se usa en los recordatorios que se añaden al calendario.</p>
      <div class="seg wrap">
        ${[15, 30, 60, 90, 180].map((d) => `<button type="button" class="${data.warnDays === d ? 'on' : ''}" data-d="${d}">${d} días</button>`).join('')}
      </div>
      <div class="body-actions"><button class="done-btn" type="button" data-done>Listo</button></div>`;
    sheet.querySelectorAll('[data-d]').forEach((b) => b.addEventListener('click', () => { data.warnDays = Number(b.dataset.d); persist(); render(); draw(); }));
    sheet.querySelector('[data-done]').addEventListener('click', closeSheet);
  };
  draw();
}

// ---------- Copia de seguridad (JSON con fotos) ----------

const blobToDataURL = (blob) => new Promise((resolve) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.readAsDataURL(blob); });

async function exportBackup() {
  toast('Preparando la copia…');
  const files = {};
  for (const it of data.items) for (const p of it.photos) {
    const blob = await getFile(p).catch(() => null);
    if (blob) files[p] = await blobToDataURL(blob);
  }
  const json = JSON.stringify({ app: 'DocCTRL', version: APP_VERSION, exported: new Date().toISOString(), data, files });
  const name = `docctrl-copia-${todayISO()}.json`;
  const file = new File([json], name, { type: 'application/json' });
  // En el móvil, el menú Compartir permite «Guardar en Archivos» o enviarlo
  if (matchMedia('(pointer: coarse)').matches && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Copia de DocCTRL' });
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

$('import-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const obj = JSON.parse(await file.text());
    if (obj.app !== 'DocCTRL' || !obj.data) throw new Error('formato');
    const next = cleanData(obj.data);
    const nPhotos = Object.keys(obj.files || {}).length;
    if (!confirm(`Se importarán ${plural(next.items.length, 'partida', 'partidas')} y ${plural(nPhotos, 'foto', 'fotos')}, y se sustituirá todo lo guardado en este dispositivo. ¿Continuar?`)) return;
    await clearFiles();
    urlCache.clear();
    for (const [id, url] of Object.entries(obj.files || {})) await putFile(id, await (await fetch(url)).blob());
    data = next;
    filter = 'all';
    persist();
    render();
    toast('Copia importada');
  } catch (_) {
    alert('El archivo no es una copia válida de DocCTRL.');
  }
});

// ---------- Menú ⋯ ----------

const MENU = [
  { label: 'Personas', icon: 'people', run: () => openPeopleSheet() },
  { label: 'Aviso de vencimientos', icon: 'bell', run: () => openWarnSheet() },
  { label: 'Opciones de visualización', icon: 'palette', run: () => openDisplaySheet() },
  { label: 'Exportar copia', icon: 'download', run: () => exportBackup() },
  { label: 'Importar copia', icon: 'upload', run: () => $('import-input').click() },
];

function openMenu() {
  const menu = $('menu');
  menu.innerHTML = MENU.map((m, i) =>
    `<button class="menu-item" role="menuitem" data-i="${i}">${icon(m.icon, 20)}<span>${m.label}</span></button>`).join('');
  menu.querySelectorAll('.menu-item').forEach((b) => b.addEventListener('click', () => {
    closeMenu();
    MENU[b.dataset.i].run();
  }));
  const r = $('menu-btn').getBoundingClientRect();
  menu.style.top = `${r.bottom + 6}px`;
  menu.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
  menu.hidden = false;
  $('menu-btn').setAttribute('aria-expanded', 'true');
}
function closeMenu() {
  $('menu').hidden = true;
  $('menu-btn').setAttribute('aria-expanded', 'false');
}
$('menu-btn').addEventListener('click', (e) => {
  e.stopPropagation();
  if ($('menu').hidden) openMenu();
  else closeMenu();
});
document.addEventListener('click', (e) => {
  if (!$('menu').hidden && !e.target.closest('#menu')) closeMenu();
});
window.addEventListener('resize', closeMenu);

// ---------- Opciones de visualización (modo y fondo) ----------

const WALLS = {
  ambar: { name: 'Ámbar', c: ['251 191 36', '253 224 71', '251 146 60', '217 119 6'] },
  coral: { name: 'Coral', c: ['248 113 113', '253 164 175', '251 146 60', '244 63 94'] },
  menta: { name: 'Menta', c: ['52 211 153', '134 239 172', '45 212 191', '22 163 74'] },
  glaciar: { name: 'Glaciar', c: ['96 165 250', '186 230 253', '56 189 248', '37 99 235'] },
};
const lightQuery = matchMedia('(prefers-color-scheme: light)');
let display = { theme: 'auto', wall: 'ambar', ...load(DISPLAY_KEY, {}) };
if (!WALLS[display.wall]) display.wall = 'ambar';

function applyDisplay() {
  const light = display.theme === 'light' || (display.theme === 'auto' && lightQuery.matches);
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  document.documentElement.dataset.wall = display.wall;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', light ? '#fcf6ee' : '#100c08');
}
lightQuery.addEventListener('change', () => { if (display.theme === 'auto') applyDisplay(); });

function wallPreview(key) {
  const [c1, c2, c3, c4] = WALLS[key].c;
  const light = document.documentElement.dataset.theme === 'light';
  const a = light ? 0.4 : 0.5;
  const base = light ? '#fcf6ee' : '#100c08';
  return `radial-gradient(70% 60% at 15% 10%, rgb(${c1} / ${a}), transparent 70%), radial-gradient(60% 55% at 90% 25%, rgb(${c2} / ${a * 0.8}), transparent 72%),
    radial-gradient(70% 60% at 75% 95%, rgb(${c3} / ${a * 0.85}), transparent 70%), radial-gradient(60% 55% at 5% 85%, rgb(${c4} / ${a * 0.8}), transparent 72%), ${base}`;
}

function openDisplaySheet() {
  const sheet = openSheet('', 'Opciones de visualización');
  const draw = () => {
    sheet.innerHTML = `
      <h2 class="sheet-title">Opciones de visualización</h2>
      <p class="opt-label">Modo</p>
      <div class="seg" role="group" aria-label="Modo">
        ${[['dark', 'Oscuro'], ['light', 'Claro'], ['auto', 'Automático']].map(([v, l]) =>
          `<button type="button" data-theme-opt="${v}" class="${display.theme === v ? 'on' : ''}" aria-pressed="${display.theme === v}">${l}</button>`).join('')}
      </div>
      <p class="muted small">${display.theme === 'auto' ? 'Sigue el modo claro u oscuro del sistema.' : '&nbsp;'}</p>
      <p class="opt-label">Fondo</p>
      <div class="walls">
        ${Object.entries(WALLS).map(([k, w]) =>
          `<button type="button" class="wall ${display.wall === k ? 'on' : ''}" data-wall-opt="${k}" style="background:${wallPreview(k)}" aria-pressed="${display.wall === k}">${w.name}</button>`).join('')}
      </div>
      <div class="body-actions"><button class="done-btn" type="button" data-done>Listo</button></div>`;
    sheet.querySelectorAll('[data-theme-opt]').forEach((b) => b.addEventListener('click', () => {
      display.theme = b.dataset.themeOpt;
      save(DISPLAY_KEY, display);
      applyDisplay();
      draw();
    }));
    sheet.querySelectorAll('[data-wall-opt]').forEach((b) => b.addEventListener('click', () => {
      display.wall = b.dataset.wallOpt;
      save(DISPLAY_KEY, display);
      applyDisplay();
      draw();
    }));
    sheet.querySelector('[data-done]').addEventListener('click', closeSheet);
  };
  draw();
}

// ---------- Eventos de la pantalla principal ----------

$('add-btn').addEventListener('click', openTypePicker);
$('search').addEventListener('input', (e) => { query = e.target.value; renderList(); });
$('people-row').addEventListener('click', (e) => {
  const b = e.target.closest('[data-person]');
  if (!b) return;
  filter = b.dataset.person;
  render();
});
document.querySelector('main').addEventListener('click', (e) => {
  const open = e.target.closest('[data-open]');
  if (open) return openDetail(open.dataset.open);
  if (e.target.closest('[data-add]')) openTypePicker();
});

// ---------- Pantalla de inicio ----------

$('enter-btn').addEventListener('click', () => {
  const body = document.body;
  if (body.classList.contains('entering')) return;
  body.classList.add('entering');
  setTimeout(() => {
    $('splash').remove();
    body.classList.remove('booting', 'entering');
    maybeShowInstallHint();
  }, 820);
});

// ---------- Aviso: añadir a la pantalla de inicio (solo móvil y tablet) ----------

const ua = navigator.userAgent;
// El iPad con iPadOS se identifica como Mac, pero tiene pantalla táctil
const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

const HINT_ICONS = {
  share: '<path d="M12 3.5v11M8 7.5l4-4 4 4"/><path d="M7 10.5H6a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1"/>',
  more: '<circle cx="12" cy="5.5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="18.5" r="1.5" fill="currentColor"/>',
  add: '<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8.5v7M8.5 12h7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const hintIcon = (name) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${HINT_ICONS[name]}</svg>`;

function maybeShowInstallHint() {
  if (!(isIOS || isAndroid) || isStandalone()) return;
  if (load(INSTALL_HINT_KEY, null) === 'off') return;
  const steps = isIOS
    ? [
        ['share', 'Pulsa el botón <b>Compartir</b> de Safari (abajo en el iPhone, arriba en el iPad).'],
        ['add', 'Desliza hacia abajo y elige <b>Añadir a pantalla de inicio</b>.'],
        ['check', 'Pulsa <b>Añadir</b>. El icono de DocCTRL aparecerá junto a tus apps.'],
      ]
    : [
        ['more', 'Pulsa el menú <b>⋮</b> de Chrome, arriba a la derecha.'],
        ['add', 'Elige <b>Añadir a pantalla de inicio</b> o <b>Instalar aplicación</b>.'],
        ['check', 'Confirma con <b>Instalar</b>. El icono de DocCTRL aparecerá junto a tus apps.'],
      ];
  closeSheet();
  const back = document.createElement('div');
  back.className = 'sheet-backdrop center';
  back.innerHTML = `
    <div class="sheet install-sheet" role="dialog" aria-modal="true" aria-labelledby="install-title">
      <span class="install-logo">${logoSVG(56)}</span>
      <h2 class="sheet-title" id="install-title">Añade DocCTRL a tu pantalla de inicio</h2>
      <p class="muted small">Así la abrirás como una app más, a pantalla completa y con un solo toque.</p>
      <ol class="install-steps">
        ${steps.map(([ic, text]) => `<li><span class="step-icon">${hintIcon(ic)}</span><span>${text}</span></li>`).join('')}
      </ol>
      <div class="install-footer">
        <label class="no-more"><input type="checkbox" id="install-no-more" /> No mostrar más</label>
        <button class="done-btn" type="button" id="install-ok">Aceptar</button>
      </div>
    </div>`;
  document.body.append(back);
  back.querySelector('#install-ok').addEventListener('click', () => {
    if (back.querySelector('#install-no-more').checked) save(INSTALL_HINT_KEY, 'off');
    closeSheet();
  });
}

// ---------- Siempre en vertical y sin zoom ----------

try { screen.orientation?.lock?.('portrait').catch(() => {}); } catch (_) { /* no compatible */ }
document.addEventListener('gesturestart', (e) => e.preventDefault());
document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });

// Pide al navegador que no borre los datos guardados (fotos incluidas) si falta espacio
navigator.storage?.persist?.().catch(() => {});

applyDisplay();
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
