'use strict';

// Versión de la app (se ve en la pantalla de inicio). Arreglos y ajustes: 0.x.y; novedades: 0.x.0.
const APP_VERSION = '0.3.3';
const STORAGE_KEY = 'docctrl:v1';
const DISPLAY_KEY = 'docctrl:display';
const INSTALL_HINT_KEY = 'docctrl:installHint';
const NOTIFY_KEY = 'docctrl:notify';
const SYNC_KEY = 'docctrl:sync';

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
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
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
  cloud: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9a4.75 4.75 0 0 1-.5 9.5z"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.34-5.66L20 8.5"/><path d="M20 4v4.5h-4.5"/>',
  logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 16l-4-4 4-4M6 12h10"/>',
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
      <path class="logo-arc" pathLength="1" d="M60 8 A52 52 0 1 1 14.97 86" stroke="url(#${id})" stroke-width="3"/>
      <circle class="logo-dot" cx="14.97" cy="86" r="3" fill="#fbbf24" stroke="none"/>
      <rect x="33" y="43" width="54" height="36" rx="5" stroke="url(#${id})" stroke-width="1.8"/>
      <circle cx="47" cy="57" r="5" stroke="url(#${id})" stroke-width="1.6"/>
      <path d="M39 71c1.5-4 4.5-6 8-6s6.5 2 8 6" stroke="url(#${id})" stroke-width="1.6"/>
      <path d="M61 54h18M61 61h18M61 68h11" stroke="url(#${id})" stroke-width="1.6"/>
    </svg>`;
}
document.querySelectorAll('[data-logo]').forEach((el) => { el.innerHTML = logoSVG(Number(el.dataset.logo)); });
document.getElementById('app-version').textContent = `Versión ${APP_VERSION}`;

// ---------- Catálogo de partidas ----------
// Campos: t = text · d = fecha · n = número · tel = teléfono · eur = importe · a = texto largo · rep = repetición.
// `exp: true` marca la fecha que vence (caducidad, ITV, renovación…) y genera avisos. Con un campo `rep`
// (cada cuántos meses se repite), al pasar la fecha se salta sola a la siguiente: recibos, seguros…
// `lead`: días de antelación con que avisa por defecto ese tipo · `tip`: consejo que acompaña al aviso
// · `charge`: es un cargo («Cargo en 3 días») en vez de un vencimiento · `titleKey`: campo que da nombre a la partida.

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
const REP = (def = '') => F('rep', 'Se repite', 'rep', { def });
const REPS = [['', 'No se repite'], ['1', 'Cada mes'], ['2', 'Cada 2 meses'], ['3', 'Cada 3 meses'], ['6', 'Cada 6 meses'], ['12', 'Cada año'], ['24', 'Cada 2 años']];
const repLabel = (v) => REPS.find(([k]) => k === String(v))?.[1] || '';
const RENEW_TIP = 'Pide cita previa con tiempo para renovarlo.';

const TYPES = {
  dni: { cat: 'id', label: 'DNI', lead: 90, tip: RENEW_TIP, fields: [F('num', 'Número'), F('fullname', 'Nombre completo'), F('birth', 'Fecha de nacimiento', 'd'), F('idesp', 'Nº de soporte (IDESP)'), F('issued', 'Expedición', 'd'), EXP()] },
  passport: { cat: 'id', label: 'Pasaporte', icon: 'passport', lead: 90, tip: RENEW_TIP, fields: [F('num', 'Número'), F('issued', 'Expedición', 'd'), EXP(), F('place', 'Expedido en')] },
  license: { cat: 'id', label: 'Carnet de conducir', icon: 'license', lead: 90, tip: 'Necesitarás un reconocimiento médico en un centro autorizado.', fields: [F('num', 'Número'), F('classes', 'Permisos (B, A2…)'), F('issued', 'Expedición', 'd'), EXP(), F('points', 'Puntos', 'n')] },
  nie: { cat: 'id', label: 'NIE / TIE', lead: 90, tip: RENEW_TIP, fields: [F('num', 'Número'), EXP()] },
  healthcard: { cat: 'id', label: 'Tarjeta sanitaria', icon: 'health', fields: [F('num', 'Nº de tarjeta'), F('cip', 'Código CIP'), F('center', 'Centro de salud'), F('doctor', 'Médico de cabecera'), F('phone', 'Teléfono de citas', 'tel')] },
  tse: { cat: 'id', label: 'Tarjeta sanitaria europea', icon: 'health', lead: 30, tip: 'Se renueva gratis en la web de la Seguridad Social.', fields: [F('num', 'Nº de tarjeta'), EXP()] },
  ss: { cat: 'id', label: 'Seguridad Social', icon: 'shield', fields: [F('num', 'Nº de afiliación')] },

  vehicle: { cat: 'car', label: 'Vehículo e ITV', lead: 30, tip: 'Reserva cita en la estación de ITV.', fields: [F('plate', 'Matrícula'), F('model', 'Marca y modelo'), F('vin', 'Nº de bastidor'), F('reg', 'Matriculación', 'd'), EXP('Próxima ITV')] },
  carins: { cat: 'car', label: 'Seguro del vehículo', icon: 'shield', lead: 30, tip: 'Buen momento para comparar precios.', fields: [COMPANY, POLICY, F('plate', 'Matrícula'), F('assist', 'Asistencia en carretera', 'tel'), PRICE(), EXP('Vencimiento'), REP('12')] },
  cartax: { cat: 'car', label: 'Impuesto de circulación', icon: 'receipt', lead: 15, charge: true, fields: [F('plate', 'Matrícula'), F('council', 'Ayuntamiento'), PRICE('Importe'), EXP('Fecha de pago'), REP('12')] },

  homeins: { cat: 'home', label: 'Seguro de hogar', icon: 'shield', lead: 30, tip: 'Buen momento para comparar precios.', fields: [COMPANY, POLICY, F('phone', 'Teléfono de siniestros', 'tel'), PRICE(), EXP('Vencimiento'), REP('12')] },
  rent: { cat: 'home', label: 'Alquiler o hipoteca', icon: 'key', fields: [F('entity', 'Banco o propietario'), F('ref', 'Nº de contrato'), F('price', 'Cuota mensual', 'eur'), F('start', 'Inicio', 'd'), EXP('Fin o revisión')] },
  utility: { cat: 'home', label: 'Suministro (luz, gas, agua, internet)', titleKey: 'service', icon: 'bolt', fields: [F('service', 'Servicio'), COMPANY, F('contract', 'Nº de contrato'), F('cups', 'CUPS o nº de cliente'), F('phone', 'Teléfono de averías', 'tel'), F('price', 'Importe aproximado', 'eur')] },
  boiler: { cat: 'home', label: 'Revisión de caldera o gas', icon: 'flame', lead: 30, fields: [COMPANY, F('phone', 'Teléfono', 'tel'), F('last', 'Última revisión', 'd'), EXP('Próxima revisión'), REP('12')] },

  medins: { cat: 'health', label: 'Seguro médico', icon: 'shield', lead: 30, fields: [COMPANY, POLICY, F('card', 'Nº de tarjeta'), F('phone', 'Teléfono', 'tel'), PRICE(), EXP('Vencimiento'), REP('12')] },
  lifeins: { cat: 'health', label: 'Seguro de vida', icon: 'shield', lead: 30, fields: [COMPANY, POLICY, F('capital', 'Capital asegurado', 'eur'), F('benef', 'Beneficiarios'), PRICE(), EXP('Vencimiento'), REP('12')] },
  medfile: { cat: 'health', label: 'Ficha médica', icon: 'heart', fields: [F('blood', 'Grupo sanguíneo'), F('allergies', 'Alergias', 'a'), F('meds', 'Medicación habitual', 'a'), F('contact', 'Contacto de emergencia'), F('ephone', 'Teléfono de emergencia', 'tel')] },

  receipt: { cat: 'money', label: 'Recibo o pago periódico', titleKey: 'concept', icon: 'receipt', lead: 3, charge: true, tip: 'Comprueba que haya saldo en la cuenta.', fields: [F('concept', 'Concepto (IBI, comunidad, colegio…)'), F('issuer', 'Emisor'), F('price', 'Importe', 'eur'), EXP('Próximo cargo'), REP('1'), F('account', 'Cuenta de cargo')] },
  bank: { cat: 'money', label: 'Cuenta bancaria', icon: 'bank', fields: [F('bank', 'Banco'), F('iban', 'IBAN'), F('holders', 'Titulares'), F('phone', 'Teléfono del banco', 'tel')] },
  card: { cat: 'money', label: 'Tarjeta bancaria', icon: 'card', lead: 30, tip: 'El banco suele mandar la nueva: actualízala donde pagues con ella.', note: 'Por seguridad, guarda solo los últimos 4 dígitos: nunca el número completo, el PIN ni el CVV.', fields: [F('bank', 'Banco'), F('last4', 'Últimos 4 dígitos', 'n', { max: 4 }), EXP(), F('phone', 'Teléfono para bloquearla', 'tel')] },

  warranty: { cat: 'other', label: 'Garantía', titleKey: 'product', icon: 'tag', lead: 30, tip: 'Si falla algo, reclámalo antes de que acabe.', fields: [F('product', 'Producto'), F('shop', 'Tienda'), F('bought', 'Fecha de compra', 'd'), F('price', 'Precio', 'eur'), EXP('Fin de la garantía')] },
  subscription: { cat: 'other', label: 'Suscripción', titleKey: 'service', icon: 'repeat', lead: 7, charge: true, tip: '¿La sigues usando? Si no, cancélala antes.', fields: [F('service', 'Servicio'), F('price', 'Importe', 'eur'), EXP('Próxima renovación'), REP('1')] },
  pet: { cat: 'other', label: 'Mascota', titleKey: 'petname', icon: 'paw', lead: 15, tip: 'Pide cita en el veterinario.', fields: [F('petname', 'Nombre'), F('chip', 'Nº de microchip'), F('vet', 'Veterinario'), F('phone', 'Teléfono del veterinario', 'tel'), EXP('Próxima vacuna'), REP('12')] },
  membership: { cat: 'other', label: 'Carnet de socio', titleKey: 'entity', icon: 'ticket', lead: 15, fields: [F('entity', 'Entidad (gimnasio, biblioteca…)'), F('num', 'Nº de socio'), EXP()] },
  generic: { cat: 'other', label: 'Otro documento', icon: 'doc', fields: [F('num', 'Número o referencia'), EXP(), REP()] },
};
// Antelación de los avisos: la de la partida, la de su tipo o la general. 'off' = sin avisos.
const LEADS = [0, 1, 3, 7, 15, 30, 60, 90, 180];
const leadText = (n) => (n === 0 ? 'El mismo día' : n === 1 ? '1 día antes' : `${n} días antes`);
const itemLead = (it) => (it.lead === 'off' ? null : Number.isFinite(it.lead) ? it.lead : TYPES[it.type].lead ?? data.warnDays);
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

// ---------- Fotos y avisos (IndexedDB) ----------
// Los datos van en localStorage; las fotos, comprimidas, en IndexedDB («files», clave = id de la foto).
// «meta» guarda la lista de avisos ya calculada, que es lo que lee el service worker al llegar un push.

let dbPromise;
function openDB() {
  return (dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open('docctrl', 2);
    req.onupgradeneeded = () => {
      for (const name of ['files', 'meta']) if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }));
}
async function idb(mode, fn, store = 'files') {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, mode);
    const req = fn(tx.objectStore(store));
    tx.oncomplete = () => resolve(req?.result);
    tx.onerror = () => reject(tx.error);
  });
}
const putFile = (id, blob) => idb('readwrite', (s) => s.put(blob, id));
const getFile = (id) => idb('readonly', (s) => s.get(id));
const delFile = (id) => idb('readwrite', (s) => s.delete(id));
const clearFiles = () => idb('readwrite', (s) => s.clear());
const kvGet = (k) => idb('readonly', (s) => s.get(k), 'meta');
const kvSet = (k, v) => idb('readwrite', (s) => s.put(v, k), 'meta');

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
// people: [{id, name, at}] · items: [{id, type, person ('' = común), label, f: {campo: valor}, notes, photos: [id],
// lead (días | 'off' | sin poner = el del tipo), upd (AAAA-MM-DD), at (ms del último cambio)}]
// deleted: {id: ms} de partidas y personas borradas (para que la sincronización respete los borrados).
// warnDays: antelación general, para los tipos que no tienen una propia · settingsAt: cuándo se cambió.

function cleanData(d) {
  const people = Array.isArray(d?.people) ? d.people.filter((p) => p?.id && p.name).map((p) => ({ id: String(p.id), name: String(p.name), at: Number(p.at) || 0 })) : [];
  const items = (Array.isArray(d?.items) ? d.items : []).filter((it) => it?.id && TYPES[it.type]).map((it) => ({
    id: String(it.id),
    type: it.type,
    person: typeof it.person === 'string' ? it.person : '',
    label: String(it.label || ''),
    f: Object.fromEntries(Object.entries(it.f || {}).filter(([, v]) => v !== '' && v != null).map(([k, v]) => [k, String(v)])),
    notes: String(it.notes || ''),
    photos: Array.isArray(it.photos) ? it.photos.map(String) : [],
    ...(it.lead === 'off' || (Number.isFinite(it.lead) && it.lead >= 0) ? { lead: it.lead } : {}),
    upd: it.upd || todayISO(),
    at: Number(it.at) || 0,
  }));
  const deleted = Object.fromEntries(Object.entries(d?.deleted || {}).filter(([, v]) => Number.isFinite(v)));
  const warnDays = Number.isFinite(Number(d?.warnDays)) && Number(d.warnDays) > 0 ? Number(d.warnDays) : 60;
  return { people: people.length || d?.people ? people : [{ id: 'p1', name: 'Yo', at: 0 }], items, deleted, warnDays, settingsAt: Number(d?.settingsAt) || 0 };
}

let data = cleanData(load(STORAGE_KEY, null));
let filter = 'all'; // 'all' · '' (común) · id de persona
let query = '';

// Guarda en el dispositivo, recalcula los avisos y sube los cambios a la nube (si está activada)
function persist() {
  if (!save(STORAGE_KEY, data)) toast('No se han podido guardar los datos en este dispositivo.');
  queueReminders();
  queueSync();
}

const personName = (id) => (id ? data.people.find((p) => p.id === id)?.name || 'Común' : 'Común');
const itemTitle = (it) => it.label || it.f[TYPES[it.type].titleKey] || TYPES[it.type].label;
// Dato que identifica la partida en la lista: el primer campo relleno que no sea fecha
function itemKeyValue(it) {
  const f = TYPES[it.type].fields.find((x) => x.t !== 'd' && x.t !== 'a' && x.t !== 'rep' && x.k !== TYPES[it.type].titleKey && it.f[x.k]);
  return f ? (f.k === 'last4' ? `•••• ${it.f[f.k]}` : f.t === 'eur' ? `${it.f[f.k]} €` : it.f[f.k]) : '';
}

// Fechas que se repiten: la ocurrencia n se calcula desde la fecha original (31 de enero + 1 mes = 28/29 de febrero)
function addMonths(iso, months) {
  const [y, m, d] = iso.split('-').map(Number);
  const first = new Date(Date.UTC(y, m - 1 + months, 1));
  const last = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return `${first.getUTCFullYear()}-${pad(first.getUTCMonth() + 1)}-${pad(Math.min(d, last))}`;
}
function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}
// Ocurrencias de una fecha (que se repite cada `rep` meses) desde `from` hasta `to`, como mucho `max`
function occurrences(date, rep, from, to, max = 60) {
  if (!rep) return date >= from && date <= to ? [date] : [];
  const out = [];
  for (let n = 0, d = date; d <= to && out.length < max && n < 2400; n++, d = addMonths(date, n * rep)) if (d >= from) out.push(d);
  return out;
}

// Estado del vencimiento: vencido, próximo (dentro del aviso) o en regla. Si se repite, la próxima fecha.
function expiry(it) {
  const type = TYPES[it.type];
  const f = type.fields.find((x) => x.exp);
  const base = f && it.f[f.k];
  if (!base || !/^\d{4}-\d{2}-\d{2}$/.test(base)) return null;
  const rep = Number(it.f.rep) || 0;
  const date = rep ? occurrences(base, rep, todayISO(), '9999-12-31', 1)[0] || base : base;
  const days = daysUntil(date);
  const lead = itemLead(it);
  const cls = days < 0 ? 'expired' : lead != null && days <= lead ? 'soon' : 'ok';
  return { date, days, cls, label: f.l, rep, charge: !!type.charge };
}
function expiryText(e) {
  const w = e.charge ? 'Cargo' : 'Vence';
  if (e.days < 0) return -e.days <= 60 ? `Vencido hace ${plural(-e.days, 'día', 'días')}` : `Vencido el ${fmtDate(e.date)}`;
  if (e.days === 0) return `${w} hoy`;
  if (e.days === 1) return `${w} mañana`;
  if (e.cls === 'soon') return `${w} en ${e.days} días`;
  return `${e.charge ? 'Próximo cargo' : 'Hasta'} el ${fmtDate(e.date)}`;
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
      <div class="${soon.length ? 't-soon' : ''}"><dt>Próximos</dt><dd>${soon.length}</dd></div>
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
  const sub = [itemTitle(it) !== type.label ? type.label : '', filter === 'all' ? personName(it.person) : '', itemKeyValue(it)].filter(Boolean).join(' · ');
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
    const raw = it ? it.f[f.k] ?? '' : f.def ?? '';
    const v = esc(raw);
    const input = f.t === 'a'
      ? `<textarea data-k="${f.k}" rows="2">${v}</textarea>`
      : f.t === 'rep'
      ? `<select data-k="${f.k}">${REPS.map(([k, l]) => `<option value="${k}" ${String(raw) === k ? 'selected' : ''}>${l}</option>`).join('')}</select>`
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
      ${type.fields.some((f) => f.exp) ? `<label class="fld wide"><span>Avisar ${icon('bell', 12)}</span><select id="ed-lead">
        <option value="" ${it?.lead == null ? 'selected' : ''}>Automático (${leadText(type.lead ?? data.warnDays)})</option>
        ${LEADS.map((n) => `<option value="${n}" ${it?.lead === n ? 'selected' : ''}>${leadText(n)}</option>`).join('')}
        <option value="off" ${it?.lead === 'off' ? 'selected' : ''}>Sin avisos</option>
      </select></label>` : ''}
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
    const leadVal = sheet.querySelector('#ed-lead')?.value ?? '';
    const rec = { id: it?.id || uid(), type: tkey, person, label, f, notes, photos: editorPhotos.map((p) => p.id), upd: todayISO(), at: Date.now() };
    if (leadVal !== '') rec.lead = leadVal === 'off' ? 'off' : Number(leadVal);
    if (it) { delete it.lead; Object.assign(it, rec); }
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
    data.deleted[it.id] = Date.now();
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
  const value = (f, v) => (f.t === 'd' ? fmtDate(v) : f.t === 'eur' ? `${v} €` : f.t === 'rep' ? repLabel(v) : f.k === 'last4' ? `•••• ${v}` : v);
  const lead = itemLead(it);
  const rows = type.fields.filter((f) => it.f[f.k]);
  sheet.innerHTML = `
    <div class="sheet-head cat-${type.cat}">
      <span class="item-icon">${icon(typeIcon(it.type), 22)}</span>
      <div class="head-text"><h2 class="sheet-title">${esc(itemTitle(it))}</h2>
        <p class="muted small">${esc([itemTitle(it) !== type.label ? type.label : '', personName(it.person)].filter(Boolean).join(' · '))}</p></div>
      <button class="icon-btn sm" type="button" data-close aria-label="Cerrar">${icon('close', 18)}</button>
    </div>
    ${e ? `<div class="exp-banner ${e.cls}">${icon('bell', 18)}<span><b>${esc(expiryText(e))}</b><small>${esc(e.label)}: ${fmtDate(e.date)}${e.rep ? ` · ${repLabel(e.rep).toLowerCase()}` : ''} · ${lead == null ? 'sin avisos' : `aviso ${leadText(lead).toLowerCase()}`}</small></span></div>` : ''}
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
  sheet.querySelector('#dt-ics')?.addEventListener('click', () => downloadICS([it]));
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

// ---------- Recordatorios en el calendario (.ics) ----------
// Un evento de día completo por vencimiento (con repetición si la tiene) y avisos con la antelación
// de cada partida y el día anterior. Sirve para una partida o para todas a la vez.

function icsEvent(it, stamp) {
  const e = expiry(it);
  if (!e) return [];
  const d = e.date.replace(/-/g, '');
  const d2 = addDays(e.date, 1).replace(/-/g, '');
  const icsEsc = (s) => String(s).replace(/[\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
  const who = it.person ? ` (${personName(it.person)})` : '';
  const summary = `${e.charge ? 'Cargo' : 'Vence'}: ${itemTitle(it)}${who}`;
  const lead = itemLead(it);
  const alarm = (days) => ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsEsc(summary)}`, `TRIGGER:-P${days}D`, 'END:VALARM'];
  const tip = TYPES[it.type].tip ? ` ${TYPES[it.type].tip}` : '';
  return [
    'BEGIN:VEVENT', `UID:${it.id}@docctrl`, `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${d2}`,
    ...(e.rep ? [`RRULE:FREQ=MONTHLY;INTERVAL=${e.rep}`] : []),
    `SUMMARY:${icsEsc(summary)}`, `DESCRIPTION:${icsEsc(`${e.label} de ${TYPES[it.type].label}.${tip} Creado con DocCTRL.`)}`,
    ...(lead == null ? [] : [...alarm(lead), ...(lead > 1 ? alarm(1) : [])]),
    'END:VEVENT',
  ];
}

function downloadICS(items) {
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const events = items.flatMap((it) => icsEvent(it, stamp));
  if (!events.length) return toast('No hay fechas que añadir al calendario.');
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//OmT Finance//DocCTRL//ES', 'CALSCALE:GREGORIAN', ...events, 'END:VCALENDAR'];
  const name = items.length === 1 ? `docctrl-${normalize(itemTitle(items[0])).replace(/[^a-z0-9]+/g, '-')}.ics` : `docctrl-vencimientos-${todayISO()}.ics`;
  const file = new File([lines.join('\r\n') + '\r\n'], name, { type: 'text/calendar' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = file.name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// ---------- Personas (menú ⋯) ----------

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
      row.querySelector('input').addEventListener('input', (e) => { if (e.target.value.trim()) { p.name = e.target.value.trim(); p.at = Date.now(); persist(); render(); } });
      row.querySelector('.alw-del').addEventListener('click', () => {
        const n = data.items.filter((it) => it.person === p.id).length;
        if (n && !confirm(`${p.name} tiene ${plural(n, 'partida', 'partidas')}. Pasarán a «Común». ¿Continuar?`)) return;
        const now = Date.now();
        data.items.forEach((it) => { if (it.person === p.id) { it.person = ''; it.at = now; } });
        data.people = data.people.filter((x) => x !== p);
        data.deleted[p.id] = now;
        if (filter === p.id) filter = 'all';
        persist(); render(); draw();
      });
    });
    sheet.querySelector('#pp-add').addEventListener('click', () => {
      const id = uid();
      data.people.push({ id, name: `Persona ${data.people.length + 1}`, at: Date.now() });
      persist(); render(); draw();
      const input = sheet.querySelector(`.person-row[data-id="${id}"] input`);
      input.focus();
      input.select();
    });
    sheet.querySelector('[data-done]').addEventListener('click', closeSheet);
  };
  draw();
}

// ---------- Avisos (notificaciones push) ----------
// Mismo diseño que TaskCTRL: la app calcula los avisos de los próximos 400 días, guarda su texto en
// IndexedDB (lo lee el service worker) y sube al servidor SOLO los días en que toca avisar. Ese día el
// servidor manda un push vacío y el service worker compone la notificación con los datos del móvil.

const AHEAD_DAYS = 400;
const LATE_DAYS = 3; // un aviso que no llegó (móvil apagado…) aún se muestra hasta 3 días después
const PUSH_HOUR_UTC = 6; // los días de aviso se suben a las 6:00 UTC (8:00 en verano, 7:00 en invierno)

// Lista de avisos: [{k: clave única, d: día del aviso, t: título, b: texto, id: partida}]
function reminderList() {
  const today = todayISO();
  const from = addDays(today, -LATE_DAYS);
  const to = addDays(today, AHEAD_DAYS);
  const out = [];
  for (const it of data.items) {
    const type = TYPES[it.type];
    const f = type.fields.find((x) => x.exp);
    const base = f && it.f[f.k];
    const lead = itemLead(it);
    if (!base || !/^\d{4}-\d{2}-\d{2}$/.test(base) || lead == null) continue;
    const rep = Number(it.f.rep) || 0;
    const who = it.person ? ` · ${personName(it.person)}` : '';
    // Avisos: con la antelación elegida, una semana antes (si la antelación es mayor) y el mismo día
    const offsets = [...new Set([lead, lead > 14 ? 7 : null, 0].filter((x) => x != null))];
    for (const due of occurrences(base, rep, from, addDays(to, lead), 30)) {
      for (const off of offsets) {
        const d = addDays(due, -off);
        // Si un aviso no llegó, se recupera solo el del mismo día (los de antes ya dirían una fecha desfasada)
        if (d < (off === 0 ? from : today) || d > to) continue;
        const w = type.charge ? 'Cargo' : 'Vence';
        const when = off === 0 ? `${w} hoy` : off === 1 ? `${w} mañana` : `${w} en ${off} días`;
        out.push({
          k: `${it.id}:${due}:${off}`,
          d,
          t: `${itemTitle(it)}${who}`,
          b: `${when} (${fmtDate(due)}).${type.tip && off > 0 ? ` ${type.tip}` : ''}`,
          id: it.id,
        });
      }
    }
  }
  return out.sort((a, b) => (a.d < b.d ? -1 : a.d > b.d ? 1 : 0)).slice(0, 800);
}

let meta = {}; // { device, subscribed } (en IndexedDB, compartido con el service worker)
// Los avisos se activan en cada dispositivo por separado: no se sincronizan
let notifyOn = load(NOTIFY_KEY, false) === true;
const setNotify = (on) => { notifyOn = on; save(NOTIFY_KEY, on); };
const ua = navigator.userAgent;
// El iPad con iPadOS se identifica como Mac, pero tiene pantalla táctil
const isIOS = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
const isAndroid = /Android/.test(ua);
const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const canNotify = () => 'Notification' in window && 'serviceWorker' in navigator;
const canPush = () => canNotify() && 'PushManager' in window;
let serverOK = null; // null: sin comprobar · true/false

async function pushApi(body) {
  const res = await fetch('api/push', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(out.error || `http ${res.status}`), { status: res.status });
  return out;
}
async function checkServer() {
  try {
    const res = await fetch('api/push', { cache: 'no-store' });
    serverOK = res.ok && (await res.json()).configured === true;
  } catch (_) {
    serverOK = false;
  }
  return serverOK;
}
const randomHex = (n) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => b.toString(16).padStart(2, '0')).join('');
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0));
async function saveMeta(patch) {
  meta = { ...meta, ...patch };
  await kvSet('meta', meta).catch(() => {});
}

// Guarda la lista para el service worker y sube los días de aviso al servidor
async function storeReminders() {
  const list = reminderList();
  await kvSet('reminders', list).catch(() => {});
  if (!meta.subscribed || !notifyOn) return;
  // Los días ya pasados (o hoy) solo si les queda algún aviso por mostrar
  const today = todayISO();
  const shown = new Set((await kvGet('shown').catch(() => null)) || []);
  const times = [...new Set(list.filter((r) => r.d > today || !shown.has(r.k)).map((r) => r.d))].map((d) => {
    const [y, m, dd] = d.split('-').map(Number);
    return Math.max(Date.UTC(y, m - 1, dd, PUSH_HOUR_UTC), Date.now() + 60e3); // los de hoy (o atrasados), en el próximo envío
  });
  try { await pushApi({ action: 'schedule', device: meta.device, times }); } catch (err) {
    if (err.status === 404) await saveMeta({ subscribed: false }); // el servidor olvidó el dispositivo: se vuelve a suscribir
  }
}
let reminderTimer;
function queueReminders() {
  clearTimeout(reminderTimer);
  reminderTimer = setTimeout(() => storeReminders(), 1200);
}

async function subscribePush() {
  if (!canPush() || !(await checkServer())) { await saveMeta({ subscribed: false }); return false; }
  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      const { publicKey } = await pushApi({ action: 'key' });
      sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: unb64u(publicKey) });
    }
    const device = meta.device || randomHex(16);
    await pushApi({ action: 'subscribe', device, sub: sub.toJSON() });
    await saveMeta({ device, subscribed: true });
    await storeReminders();
    return true;
  } catch (err) {
    console.warn(err);
    await saveMeta({ subscribed: false });
    return false;
  }
}

async function enableNotifications() {
  if (!canNotify()) {
    alert(isIOS && !isStandalone()
      ? 'En el iPhone y el iPad los avisos solo funcionan con la app añadida a la pantalla de inicio. Añádela desde Safari (Compartir → Añadir a pantalla de inicio), ábrela desde su icono y actívalos ahí.'
      : 'Este navegador no permite notificaciones.');
    return false;
  }
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') {
    alert('Sin permiso no se pueden mostrar avisos. Puedes darlo en los ajustes del móvil o del navegador (Notificaciones → DocCTRL).');
    return false;
  }
  setNotify(true);
  const pushed = await subscribePush();
  (await navigator.serviceWorker.ready).showNotification('Avisos activados ✅', {
    body: pushed ? 'Te avisaré antes de que venzan tus documentos y de los próximos cargos.' : 'El servidor de avisos no está disponible todavía: de momento solo verás los avisos dentro de la app.',
    icon: 'icons/icon-192.png',
    tag: 'docctrl-test',
  });
  return true;
}

async function disableNotifications() {
  setNotify(false);
  if (meta.device) pushApi({ action: 'unsubscribe', device: meta.device }).catch(() => {});
  await saveMeta({ subscribed: false });
}

async function sendTest() {
  if (meta.subscribed) {
    try {
      await pushApi({ action: 'test', device: meta.device });
      toast('Aviso enviado: llega en unos segundos');
      return;
    } catch (_) {
      toast('El servidor no ha podido enviarlo');
    }
  }
  (await navigator.serviceWorker.ready).showNotification('DocCTRL', { body: 'Así se verán los avisos.', icon: 'icons/icon-192.png', tag: 'docctrl-test' });
}

function openNotifSheet() {
  const sheet = openSheet('tall', 'Avisos');
  const draw = () => {
    const perm = canNotify() ? Notification.permission : 'unsupported';
    const active = notifyOn && perm === 'granted';
    let status;
    if (perm === 'unsupported') {
      status = ['bad', 'Este navegador no puede mostrar avisos', isIOS && !isStandalone()
        ? 'En iPhone/iPad: añade DocCTRL a la pantalla de inicio desde Safari y ábrela desde su icono.' : 'Prueba con Chrome o Safari actualizados.'];
    } else if (perm === 'denied') {
      status = ['bad', 'Avisos bloqueados', 'Permite las notificaciones de DocCTRL en los ajustes del móvil o del navegador.'];
    } else if (!active) {
      status = ['', 'Avisos desactivados', 'Actívalos y te avisaré antes de que venzan tus documentos y de los próximos cargos.'];
    } else if (meta.subscribed) {
      status = ['ok', 'Avisos activados', 'Llegan aunque la app esté cerrada, por la mañana del día que toca.'];
    } else {
      status = ['bad', 'Avisos sin servidor', serverOK === false
        ? 'El servidor de avisos no está disponible (falta conectar la base de datos en Vercel).' : 'Comprobando el servidor de avisos…'];
    }
    const next = reminderList().filter((r) => r.d >= todayISO()).slice(0, 5);
    sheet.innerHTML = `
      <div class="sheet-head">
        <h2 class="sheet-title">Avisos</h2>
        <button type="button" class="icon-btn sm" data-close aria-label="Cerrar">${icon('close', 18)}</button>
      </div>
      <div class="notif-status ${status[0]}">${icon('bell', 22)}<span><b>${status[1]}</b><small>${status[2]}</small></span></div>
      <div class="row-btns">
        ${active
          ? `<button type="button" class="ghost-btn" data-test>${icon('bell', 17)} Probar aviso</button><button type="button" class="ghost-btn danger" data-off>Desactivar</button>`
          : perm === 'default' || perm === 'granted' ? `<button type="button" class="done-btn" data-on>${icon('bell', 18)} Activar avisos</button>` : ''}
      </div>
      <p class="muted small">Cada partida avisa con su antelación (se cambia al editarla), una semana antes y el mismo día. Por defecto: DNI, pasaporte, NIE y carnet de conducir, 90 días (para pedir cita); seguros, ITV y garantías, 30; suscripciones, 7; recibos, 3. Los recibos, seguros y suscripciones que se repiten saltan solos a la siguiente fecha.</p>
      <p class="opt-label">Antelación para el resto</p>
      <div class="seg wrap">
        ${[15, 30, 60, 90].map((d) => `<button type="button" class="${data.warnDays === d ? 'on' : ''}" data-d="${d}">${d} días</button>`).join('')}
      </div>
      <p class="opt-label">Próximos avisos</p>
      ${next.length ? `<ul class="next-list">${next.map((r) => `<li><span>${fmtDate(r.d)}</span><span><b>${esc(r.t)}</b><small>${esc(r.b)}</small></span></li>`).join('')}</ul>`
        : '<p class="muted small">No hay avisos programados. Añade fechas de caducidad, de cargo o de renovación a tus partidas.</p>'}
      <button type="button" class="ghost-btn wide-btn" data-ics>${icon('download', 17)} Añadir todo al calendario</button>
      <p class="muted small">Crea un archivo de calendario con todos los vencimientos y sus alarmas: una alternativa a las notificaciones que funciona en cualquier dispositivo.</p>
      <div class="body-actions"><button class="done-btn" type="button" data-close>Listo</button></div>`;
  };
  draw();
  if (serverOK === null) checkServer().then(draw);
  sheet.addEventListener('click', async (e) => {
    if (e.target.closest('[data-close]')) return closeSheet();
    if (e.target.closest('[data-on]')) { await enableNotifications(); draw(); }
    if (e.target.closest('[data-off]')) { await disableNotifications(); draw(); }
    if (e.target.closest('[data-test]')) sendTest();
    if (e.target.closest('[data-ics]')) downloadICS(data.items);
    const d = e.target.closest('[data-d]');
    if (d) { data.warnDays = Number(d.dataset.d); data.settingsAt = Date.now(); persist(); render(); draw(); }
  });
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
    const now = Date.now();
    next.items.forEach((it) => { it.at = now; });
    next.people.forEach((pp) => { pp.at = now; });
    next.settingsAt = now;
    // Lo que había aquí y no está en la copia se marca como borrado (también en la nube)
    for (const x of [...data.items, ...data.people]) if (!next.items.some((y) => y.id === x.id) && !next.people.some((y) => y.id === x.id)) next.deleted[x.id] = now;
    data = next;
    filter = 'all';
    persist();
    render();
    toast('Copia importada');
  } catch (_) {
    alert('El archivo no es una copia válida de DocCTRL.');
  }
});

// ---------- Sincronización en la nube (cifrada) ----------
// Igual que TaskCTRL y PayCTRL: usuario y contraseña derivan (PBKDF2) una clave para identificarse y
// otra, que nunca sale del dispositivo, para cifrar (AES-GCM). Sal propia («docctrl-…»): mismo usuario
// que en las otras apps, cuenta distinta. Se fusiona partida a partida (gana el cambio más reciente y
// los borrados se respetan). Las fotos se cifran y suben una a una. Los avisos son de cada dispositivo.
const SYNC_API = 'api/sync';
const SYNC_EVERY_MS = 3 * 60 * 1000; // sincronización periódica mientras la app está abierta
const PBKDF2_ITERATIONS = 310000;
const utf8 = new TextEncoder();

let sync = load(SYNC_KEY, null); // { username, user, auth, key, at }
const saveSync = () => { if (sync) save(SYNC_KEY, sync); else { try { localStorage.removeItem(SYNC_KEY); } catch (_) {} } };
let syncTimer = null;
let syncBusy = false;
let syncAgain = false;
let syncError = '';

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
const sha256hex = async (text) => hex(await crypto.subtle.digest('SHA-256', utf8.encode(text)));
const toB64 = (buf) => {
  const bytes = new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.length; i += 0x8000) str += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(str);
};
const fromB64 = (str) => Uint8Array.from(atob(str), (ch) => ch.charCodeAt(0));

async function deriveAccount(username, password) {
  const u = username.trim().toLowerCase();
  const base = await crypto.subtle.importKey('raw', utf8.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = (salt) => crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: utf8.encode(salt), iterations: PBKDF2_ITERATIONS }, base, 256);
  const [auth, key] = await Promise.all([bits(`docctrl-auth:${u}`), bits(`docctrl-enc:${u}`)]);
  return { username: u, user: await sha256hex(`docctrl-user:${u}`), auth: hex(auth), key: toB64(key) };
}

const aesKey = (account) => crypto.subtle.importKey('raw', fromB64(account.key), 'AES-GCM', false, ['encrypt', 'decrypt']);
async function encryptBytes(bytes, account = sync) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await aesKey(account), bytes);
  return `${toB64(iv)}.${toB64(ct)}`;
}
async function decryptBytes(blob, account = sync) {
  const [iv, ct] = blob.split('.');
  return crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(iv) }, await aesKey(account), fromB64(ct));
}
const encryptData = (obj, account) => encryptBytes(utf8.encode(JSON.stringify(obj)), account);
const decryptData = async (blob, account) => JSON.parse(new TextDecoder().decode(await decryptBytes(blob, account)));

async function syncCall(action, extra = {}, account = sync) {
  const body = JSON.stringify({ action, user: account.user, auth: account.auth, ...extra });
  const res = await fetch(SYNC_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    // Al salir de la app, que la subida termine aunque se cierre (Safari lo limita a 64 KB)
    keepalive: document.hidden && body.length < 60000,
  });
  const out = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(out.error || `http ${res.status}`), { status: res.status });
  return out;
}

const syncErrorText = (err) => ({
  auth: 'Usuario o contraseña incorrectos.',
  exists: 'Ese nombre de usuario ya existe. Elige otro o entra con tu cuenta.',
  'too-many': 'Demasiados intentos. Espera 15 minutos.',
  invite: 'La clave de registro no es correcta.',
  'not-configured': 'Falta conectar la base de datos en Vercel (Storage → Upstash Redis).',
  OperationError: 'No se han podido descifrar los datos de la nube.',
}[err.message || err.name] || 'No se pudo conectar con la nube. Se reintentará.');

// De cada partida o persona, la versión con el `at` más reciente; un borrado gana si es posterior
function mergeById(a, b, deleted) {
  const byId = new Map();
  for (const x of [...(a || []), ...(b || [])]) {
    const cur = byId.get(x.id);
    if (!cur || (x.at || 0) > (cur.at || 0)) byId.set(x.id, x);
  }
  return [...byId.values()].filter((x) => !(deleted[x.id] >= (x.at || 0)));
}
function mergeData(a, b) {
  const deleted = { ...(a.deleted || {}) };
  for (const [id, at] of Object.entries(b.deleted || {})) if (!(deleted[id] >= at)) deleted[id] = at;
  const newer = (b.settingsAt || 0) > (a.settingsAt || 0) ? b : a;
  return { items: mergeById(a.items, b.items, deleted), people: mergeById(a.people, b.people, deleted), deleted, warnDays: newer.warnDays, settingsAt: newer.settingsAt || 0 };
}
const cloudPart = (x) => ({ items: x.items, people: x.people, deleted: x.deleted, warnDays: x.warnDays, settingsAt: x.settingsAt });
const byIdSort = (arr) => (arr || []).slice().sort((p, q) => (p.id < q.id ? -1 : 1));
const syncSig = (x) => JSON.stringify([byIdSort(x.items), byIdSort(x.people), Object.entries(x.deleted || {}).sort(), x.warnDays, x.settingsAt]);

// Hay cambios locales: se suben en unos segundos (se agrupan)
function queueSync() {
  if (!sync) return;
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => syncNow(), 1500);
}

// Fotos: después de los datos (así una foto nunca está en la nube sin una partida que la use).
// Se suben las que faltan, se bajan las que no hay aquí y se borran las que ya no usa ninguna partida.
async function syncFiles() {
  const used = new Set(data.items.flatMap((it) => it.photos));
  const remote = new Set((await syncCall('file-list')).ids);
  let got = false;
  for (const id of used) {
    const local = await getFile(id).catch(() => null);
    if (remote.has(id) && !local) {
      try {
        const { blob } = await syncCall('file-get', { id });
        await putFile(id, new Blob([await decryptBytes(blob)], { type: 'image/jpeg' }));
        got = true;
      } catch (err) { if (err.status !== 404) throw err; }
    } else if (!remote.has(id) && local) {
      await syncCall('file-put', { id, blob: await encryptBytes(await local.arrayBuffer()) });
    }
  }
  for (const id of remote) if (!used.has(id)) await syncCall('file-del', { id });
  // Fotos de este dispositivo que ya no usa ninguna partida (borradas en otro)
  const localIds = await idb('readonly', (st) => st.getAllKeys()).catch(() => []);
  for (const id of localIds) if (!used.has(id)) { await delFile(id).catch(() => {}); urlCache.delete(id); }
  if (got) renderList();
}

async function syncNow({ interactive = false } = {}) {
  if (!sync) return false;
  if (syncBusy) { syncAgain = true; return false; }
  syncBusy = true;
  try {
    for (let attempt = 0; attempt < 4; attempt++) {
      const remote = await syncCall('pull');
      const cloud = remote.blob ? cleanData(await decryptData(remote.blob)) : null;
      const merged = cloud ? mergeData(data, cloud) : cloudPart(data);
      // Lo nuevo de la nube se aplica aquí
      if (syncSig(merged) !== syncSig(data)) {
        data = cleanData({ ...data, ...merged });
        if (filter !== 'all' && filter !== '' && !data.people.some((p) => p.id === filter)) filter = 'all';
        save(STORAGE_KEY, data);
        queueReminders();
        render();
      }
      // Y lo nuevo de aquí se sube
      if (cloud && syncSig(cloudPart(data)) === syncSig(cloud)) break;
      try {
        await syncCall('push', { blob: await encryptData(cloudPart(data)), baseRev: remote.rev });
        break;
      } catch (err) {
        if (err.status !== 409) throw err; // otro dispositivo subió justo antes: se vuelve a fusionar
      }
    }
    await syncFiles();
    sync.at = Date.now();
    syncError = '';
    saveSync();
    return true;
  } catch (err) {
    console.warn(err);
    syncError = syncErrorText(err);
    if (interactive) toast(syncError);
    return false;
  } finally {
    syncBusy = false;
    if (syncAgain) { syncAgain = false; queueSync(); }
  }
}

function syncStatusText() {
  if (!sync) return 'Desactivada';
  if (syncError) return syncError;
  if (!sync.at) return 'Pendiente';
  const mins = Math.round((Date.now() - sync.at) / 60000);
  return `Al día · ${mins < 1 ? 'hace un momento' : mins < 60 ? `hace ${mins} min` : new Date(sync.at).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}`;
}

function openSyncSheet() {
  const sheet = openSheet('tall', 'Sincronización en la nube');
  const head = `
    <div class="sheet-head">
      <h2 class="sheet-title">Sincronización en la nube</h2>
      <button type="button" class="icon-btn sm" data-close aria-label="Cerrar">${icon('close', 18)}</button>
    </div>`;

  const renderConnected = () => {
    sheet.innerHTML = `${head}
      <div class="notif-status ${syncError ? 'bad' : 'ok'}">${icon('cloud', 22)}<span><b>Conectado como ${esc(sync.username)}</b><small class="s-status">${esc(syncStatusText())}</small></span></div>
      <p class="muted small">Tus partidas y fotos se cifran en este dispositivo antes de subirse. Entra con el mismo usuario y contraseña en el móvil de tu pareja, en tu tablet o en el ordenador para tenerlo todo también allí. Si cambias algo en dos sitios a la vez, se juntan los cambios.</p>
      <p class="muted small">Los avisos se activan en cada dispositivo por separado (⋯ → Avisos).</p>
      <div class="row-btns">
        <button type="button" class="done-btn" data-now>${icon('refresh', 17)} Sincronizar ahora</button>
        <button type="button" class="ghost-btn danger" data-logout>${icon('logout', 17)} Desconectar</button>
      </div>`;
  };

  const renderForm = (mode = 'login') => {
    sheet.innerHTML = `${head}
      <p class="muted small">Para tener tus documentos en varios dispositivos o compartirlos con tu familia. Se cifran aquí con tu contraseña antes de subirse: nadie más puede leerlos, ni siquiera el servidor. <b>Si olvidas la contraseña no se pueden recuperar.</b></p>
      <div class="seg" role="group" aria-label="Cuenta">
        <button type="button" data-mode="login" class="${mode === 'login' ? 'on' : ''}">Ya tengo cuenta</button>
        <button type="button" data-mode="create" class="${mode === 'create' ? 'on' : ''}">Crear cuenta</button>
      </div>
      <label class="fld"><span>Usuario</span><input id="s-user" type="text" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="40" /></label>
      <label class="fld"><span>Contraseña</span><input id="s-pass" type="password" autocomplete="${mode === 'create' ? 'new-password' : 'current-password'}" maxlength="128" /></label>
      ${mode === 'create' ? `
      <label class="fld"><span>Repite la contraseña</span><input id="s-pass2" type="password" autocomplete="new-password" maxlength="128" /></label>
      <label class="fld"><span>Clave de registro</span><input id="s-invite" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" maxlength="64" placeholder="Clave administrador" /></label>` : ''}
      <p class="form-error" id="s-error" role="alert"></p>
      <div class="body-actions"><button type="button" class="done-btn" id="s-go">${mode === 'create' ? 'Crear cuenta' : 'Entrar'}</button></div>`;
    const q = (sel) => sheet.querySelector(sel);
    q('#s-go').addEventListener('click', async () => {
      const err = q('#s-error');
      const username = q('#s-user').value.trim();
      const password = q('#s-pass').value;
      if (username.length < 3) return void (err.textContent = 'El usuario debe tener al menos 3 caracteres.');
      if (password.length < 8) return void (err.textContent = 'La contraseña debe tener al menos 8 caracteres.');
      if (mode === 'create' && password !== q('#s-pass2').value) return void (err.textContent = 'Las contraseñas no coinciden.');
      if (mode === 'create' && !q('#s-invite').value.trim()) return void (err.textContent = 'Introduce la clave de registro.');
      const btn = q('#s-go');
      btn.disabled = true;
      btn.textContent = 'Un momento…';
      err.textContent = '';
      try {
        const account = await deriveAccount(username, password);
        if (mode === 'create') await syncCall('register', { invite: q('#s-invite').value.trim() }, account);
        else await syncCall('pull', {}, account); // comprueba usuario y contraseña
        sync = { ...account, at: null };
        saveSync();
        const ok = await syncNow({ interactive: true });
        if (ok) toast(mode === 'create' ? 'Cuenta creada. Tus documentos ya están en la nube' : 'Conectado. Documentos sincronizados');
        renderConnected();
      } catch (e) {
        console.warn(e);
        err.textContent = syncErrorText(e);
        btn.disabled = false;
        btn.textContent = mode === 'create' ? 'Crear cuenta' : 'Entrar';
      }
    });
    q('#s-user').focus();
  };

  sheet.addEventListener('click', async (e) => {
    if (e.target.closest('[data-close]')) return closeSheet();
    const m = e.target.closest('[data-mode]');
    if (m) return renderForm(m.dataset.mode);
    if (e.target.closest('[data-now]')) {
      sheet.querySelector('.s-status').textContent = 'Sincronizando…';
      await syncNow({ interactive: true });
      renderConnected();
    }
    if (e.target.closest('[data-logout]')) {
      if (!confirm('¿Desconectar este dispositivo? Los documentos se quedan en él, pero dejarán de sincronizarse.')) return;
      sync = null;
      saveSync();
      renderForm();
      toast('Sincronización desactivada en este dispositivo');
    }
  });
  if (sync) renderConnected();
  else renderForm();
}

// Mientras la app está abierta, trae cada poco lo cambiado en otros dispositivos
setInterval(() => { if (!document.hidden) syncNow(); }, SYNC_EVERY_MS);

// ---------- Menú ⋯ ----------

const MENU = [
  { label: 'Personas', icon: 'people', run: () => openPeopleSheet() },
  { label: 'Avisos', icon: 'bell', run: () => openNotifSheet() },
  { label: 'Sincronización en la nube', icon: 'cloud', run: () => openSyncSheet() },
  { label: 'Opciones de visualización', icon: 'palette', run: () => openDisplaySheet() },
  { label: 'Nivel de seguridad', icon: 'shield', run: () => openSecuritySheet() },
  { label: 'Exportar copia', icon: 'download', run: () => exportBackup() },
  { label: 'Importar copia', icon: 'upload', run: () => $('import-input').click() },
  { label: 'Bloquear', icon: 'lock', run: () => lockApp(), show: () => securityLevel() !== 'none' },
];

function openMenu() {
  const menu = $('menu');
  menu.innerHTML = MENU.map((m, i) => (m.show && !m.show() ? '' :
    `<button class="menu-item" role="menuitem" data-i="${i}">${icon(m.icon, 20)}<span>${m.label}</span></button>`)).join('');
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

// ---------- Seguridad (opcional) ----------
// La misma que UnderCTRL y PayCTRL, pero desactivada por defecto: en el menú ⋯ → Nivel de seguridad
// se elige Face ID / huella (passkey con WebAuthn) o un código numérico. Es de cada dispositivo.
// Del código solo se guarda un hash PBKDF2 con sal. Una web no sabe si el móvil se ha bloqueado:
// al volver a la app pasado RELOCK_AFTER_MS se pide otra vez.
const SECURITY_KEY = 'docctrl:security'; // 'none' (por defecto) | 'bio' | 'pin'
const PIN_KEY = 'docctrl:pin';
const CRED_KEY = 'docctrl:cred';
const SESSION_KEY = 'docctrl:session';
const RELOCK_AFTER_MS = 2 * 60 * 1000;
const isIPhone = /iPhone|iPod/.test(ua);
const isWindows = /Windows/.test(ua);
const BIO = isIPhone ? 'Face ID' : isAndroid ? 'la huella' : isWindows ? 'Windows Hello' : 'Touch ID';
const BIO_NAME = BIO === 'la huella' ? 'Huella dactilar' : BIO;
let bioAvailable = null; // se averigua al arrancar
const securityLevel = () => {
  const v = load(SECURITY_KEY, 'none');
  return v === 'bio' || v === 'pin' ? v : 'none';
};
// Sin biometría en el dispositivo, «Face ID» pasa a código
const effectiveLevel = () => (securityLevel() === 'bio' && bioAvailable === false ? 'pin' : securityLevel());
const randomBytes = (n) => crypto.getRandomValues(new Uint8Array(n));

const session = {
  mark: () => save(SESSION_KEY, { at: Date.now() }),
  clear: () => { try { localStorage.removeItem(SESSION_KEY); } catch (_) {} },
  get: () => {
    const v = load(SESSION_KEY, null);
    return v && Date.now() - v.at < RELOCK_AFTER_MS ? v : null;
  },
};
let unlocked = securityLevel() === 'none';

async function biometricsAvailable() {
  return !!(window.PublicKeyCredential && await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable());
}
async function registerBio() {
  const cred = await navigator.credentials.create({
    publicKey: {
      challenge: randomBytes(32),
      rp: { name: 'DocCTRL' },
      user: { id: randomBytes(16), name: 'docctrl', displayName: 'DocCTRL' },
      pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
      authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required', residentKey: 'preferred' },
      timeout: 60000,
    },
  });
  save(CRED_KEY, toB64(cred.rawId));
}
async function verifyBio() {
  await navigator.credentials.get({
    publicKey: {
      challenge: randomBytes(32),
      allowCredentials: [{ type: 'public-key', id: fromB64(load(CRED_KEY, '')) }],
      userVerification: 'required',
      timeout: 60000,
    },
  });
}
async function bioAuth() {
  try {
    if (!load(CRED_KEY, null)) await registerBio();
    else await verifyBio();
    return true;
  } catch (err) {
    toast(err.name === 'NotAllowedError' ? `Verificación cancelada. Vuelve a intentarlo con ${BIO}.` : `No se pudo verificar con ${BIO}.`);
    return false;
  }
}

async function pinHash(pin, salt) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pin), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 200000 }, base, 256);
  return toB64(bits);
}

// Pide (o crea) el código. Va por encima de la pantalla de inicio.
function pinSheet(create, intro = '') {
  return new Promise((resolve) => {
    const back = document.createElement('div');
    back.className = 'sheet-backdrop over-splash';
    back.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Código de acceso">
        <h2 class="sheet-title">${create ? 'Crea un código de acceso' : 'Código de acceso'}</h2>
        <p class="muted small">${intro || (create
          ? 'Elige un código numérico de 4 a 12 cifras para proteger la app en este dispositivo.'
          : 'Introduce tu código para ver tus documentos.')}</p>
        <label class="fld"><span>Código</span><input class="p1" type="password" inputmode="numeric" autocomplete="${create ? 'new-password' : 'current-password'}" maxlength="12"></label>
        ${create ? '<label class="fld"><span>Repite el código</span><input class="p2" type="password" inputmode="numeric" autocomplete="new-password" maxlength="12"></label>' : ''}
        <p class="form-error p-err" role="alert"></p>
        <div class="editor-actions">
          <button class="ghost-btn p-cancel" type="button">Cancelar</button>
          <button class="done-btn p-ok" type="button">${create ? 'Guardar' : 'Entrar'}</button>
        </div>
      </div>`;
    const q = (sel) => back.querySelector(sel);
    const done = (v) => { back.remove(); resolve(v); };
    q('.p-cancel').addEventListener('click', () => done(false));
    const submit = async () => {
      const pin = q('.p1').value;
      if (create) {
        if (!/^\d{4,12}$/.test(pin)) return void (q('.p-err').textContent = 'Usa solo números (de 4 a 12 cifras).');
        if (pin !== q('.p2').value) return void (q('.p-err').textContent = 'Los códigos no coinciden.');
        const salt = randomBytes(16);
        save(PIN_KEY, { salt: toB64(salt), hash: await pinHash(pin, salt) });
        return done(true);
      }
      const stored = load(PIN_KEY, null);
      if (stored && (await pinHash(pin, fromB64(stored.salt))) === stored.hash) return done(true);
      q('.p-err').textContent = 'Código incorrecto.';
      q('.p1').select();
    };
    q('.p-ok').addEventListener('click', submit);
    back.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    document.body.append(back);
    q('.p1').focus();
  });
}

async function authenticate(level = effectiveLevel()) {
  if (level === 'none') return true;
  if (level === 'pin' || !(await biometricsAvailable())) return pinSheet(!load(PIN_KEY, null));
  return bioAuth();
}

async function unlock() {
  // Dentro del margen de sesión (p. ej. iOS cerró la app hace un momento) no se repite
  if (!session.get() && !(await authenticate())) return false;
  unlocked = true;
  session.mark();
  return true;
}

// Vuelve a la pantalla de inicio sin dejar datos a la vista
function lockApp() {
  closeSheet();
  closeMenu();
  document.querySelector('.viewer')?.remove();
  unlocked = false;
  session.clear();
  if (!$('splash')) document.body.prepend(splashTemplate.cloneNode(true));
  document.body.classList.add('booting');
  window.scrollTo(0, 0);
  showUnlockButton();
}

// Glifos de la pantalla de inicio y de la hoja Nivel de seguridad (los mismos que UnderCTRL)
const FACE_GLYPH = '<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><path d="M9 9.5v1M15 9.5v1M12 9.5v3.5h-1M9.5 15.5c1.5 1.2 3.5 1.2 5 0"/>';
const FINGER_GLYPH = '<path d="M7.5 17.5c.8-1.6 1.2-3.4 1.2-5.3a3.3 3.3 0 0 1 6.6 0c0 .9 0 1.8-.2 2.6"/><path d="M5.2 14.8c.3-.9.5-1.8.5-2.8a6.3 6.3 0 0 1 12.2-2.2"/><path d="M12 12.2c0 2.9-.8 5.6-2.2 7.8"/><path d="M14.8 17.2c-.3 1-.7 1.9-1.2 2.8"/><path d="M18.3 13.5c0 1.5-.2 3-.6 4.4"/>';
const KEYPAD_GLYPH = [6, 12, 18].flatMap((y) => [6, 12, 18].map((x) => `<circle cx="${x}" cy="${y - 1.5}" r="1.6"/>`)).join('') + '<circle cx="12" cy="22" r="1.6"/>';
const ENTER_GLYPH = '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>';
const glyphSVG = (g, size, sw) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${g}</svg>`;

// ---------- Pantalla de inicio ----------
// Sin nivel de seguridad: el logo aparece (el arco se dibuja), se ve un instante y se pasa sola a la
// app con la transición de cristal, como en ChatCTRL. Con seguridad: se entra con su botón.
const SPLASH_HOLD_MS = 1700;
const SPLASH_OUT_MS = 1200;
const splashTemplate = $('splash').cloneNode(true); // para volver a bloquear
function enterApp() {
  const body = document.body;
  if (!$('splash') || !unlocked || body.classList.contains('entering')) return;
  body.classList.add('entering');
  setTimeout(() => {
    $('splash').remove();
    body.classList.remove('booting', 'entering');
    if (pendingOpen) { openDetail(pendingOpen); pendingOpen = null; } else maybeShowInstallHint();
  }, SPLASH_OUT_MS);
}

function showUnlockButton() {
  const main = $('splash')?.querySelector('.sp-main');
  if (!main || main.querySelector('.sp-unlock')) return;
  const level = effectiveLevel();
  const glyph = level === 'pin' ? KEYPAD_GLYPH : isIPhone ? FACE_GLYPH : FINGER_GLYPH;
  const label = level === 'pin' ? 'Entrar con código' : `Entrar con ${BIO}`;
  const box = document.createElement('div');
  box.className = 'sp-unlock';
  box.innerHTML = `
    <button class="sp-enter" type="button" aria-label="${esc(label)}">${glyphSVG(glyph, 46, 1.1)}</button>
    <p class="sp-label">${esc(label)}</p>`;
  main.append(box);
  const btn = box.querySelector('button');
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    try {
      if (await unlock()) enterApp();
    } finally {
      btn.disabled = false;
    }
  });
}

function startSplash() {
  if (securityLevel() !== 'none' && session.get()) { unlocked = true; session.mark(); } // volvió enseguida
  if (!unlocked) return showUnlockButton();
  setTimeout(enterApp, SPLASH_HOLD_MS);
  // Abierta desde un aviso: se entra antes
  setTimeout(() => { if (pendingOpen) enterApp(); }, 380);
}

biometricsAvailable().then((v) => { bioAvailable = v; }).catch(() => { bioAvailable = false; });

// ---------- Nivel de seguridad (menú ⋯) ----------
// Cambiarlo pide primero el método actual; después se activa el nuevo.
const SECURITY_OPTS = [
  { key: 'none', title: () => 'Sin protección', sub: () => 'Se entra directamente. Quien use este dispositivo podrá ver tus documentos.' },
  { key: 'bio', title: () => BIO_NAME, sub: () => (bioAvailable === false ? 'No disponible en este dispositivo' : `Se pide ${BIO} al entrar en la app.`) },
  { key: 'pin', title: () => 'Código numérico', sub: () => 'Un código de 4 a 12 cifras.' },
];
const SECURITY_GLYPH = { bio: () => (isIPhone ? FACE_GLYPH : FINGER_GLYPH), pin: () => KEYPAD_GLYPH, none: () => ENTER_GLYPH };

function openSecuritySheet() {
  const sheet = openSheet('', 'Nivel de seguridad');
  const draw = () => {
    const cur = effectiveLevel();
    sheet.innerHTML = `
      <div class="sheet-head"><h2 class="sheet-title">Nivel de seguridad</h2>
        <button class="icon-btn sm" type="button" data-close aria-label="Cerrar">${icon('close', 18)}</button></div>
      <p class="muted small">Cómo se entra en la app en este dispositivo. Para cambiarlo se pide primero el método actual. Al volver a la app pasados 2 minutos se pide otra vez.</p>
      <div class="sec-list" role="radiogroup">${SECURITY_OPTS.map((o) => {
        const disabled = o.key === 'bio' && bioAvailable === false;
        return `
        <button class="sec-opt ${cur === o.key ? 'on' : ''}" type="button" role="radio" aria-checked="${cur === o.key}" data-level="${o.key}" ${disabled ? 'disabled' : ''}>
          <span class="sec-icon">${glyphSVG(SECURITY_GLYPH[o.key](), 22, 1.3)}</span>
          <span class="sec-text"><span class="sec-title">${esc(o.title())}</span><span class="muted small">${esc(o.sub())}</span></span>
          <span class="sec-check">${cur === o.key ? icon('check', 18) : ''}</span>
        </button>`;
      }).join('')}</div>
      ${cur === 'pin' ? '<button class="sec-change" type="button">Cambiar el código</button>' : ''}
      <div class="body-actions"><button class="done-btn" type="button" data-done>Listo</button></div>`;
    sheet.querySelector('[data-close]').addEventListener('click', closeSheet);
    sheet.querySelector('[data-done]').addEventListener('click', closeSheet);
    sheet.querySelectorAll('.sec-opt').forEach((b) => b.addEventListener('click', async () => {
      if (b.dataset.level === effectiveLevel()) return;
      if (await changeSecurity(b.dataset.level)) draw();
    }));
    sheet.querySelector('.sec-change')?.addEventListener('click', async () => {
      if (await changeSecurity('pin', true)) draw();
    });
  };
  draw();
}

async function changeSecurity(next, changePin = false) {
  const cur = effectiveLevel();
  // 1) Verificar con el nivel actual
  if (cur === 'bio' && !(await bioAuth())) return false;
  if (cur === 'pin' && load(PIN_KEY, null) &&
      !(await pinSheet(false, changePin ? 'Introduce el código actual.' : 'Introduce tu código actual para cambiar el nivel de seguridad.'))) return false;
  // 2) Activar el nuevo
  if (next === 'pin' && !(await pinSheet(true, changePin ? 'Elige el nuevo código (de 4 a 12 cifras).' : 'Elige un código numérico de 4 a 12 cifras para entrar en la app.'))) return false;
  if (next === 'bio' && !(await bioAuth())) return false;
  if (next !== 'pin') { try { localStorage.removeItem(PIN_KEY); } catch (_) {} }
  save(SECURITY_KEY, next);
  unlocked = true;
  session.mark();
  toast(changePin ? 'Código actualizado'
    : next === 'none' ? 'Seguridad desactivada: se entra directamente'
    : `Se pedirá ${next === 'pin' ? 'el código' : BIO} al entrar`);
  return true;
}

// Al salir se apunta la hora; al volver pasado el margen, se bloquea
document.addEventListener('visibilitychange', () => {
  if (securityLevel() === 'none' || !unlocked) return;
  if (document.hidden) session.mark();
  else if (session.get()) session.mark();
  else lockApp();
});

// ---------- Aviso: añadir a la pantalla de inicio (solo móvil y tablet) ----------

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

// ---------- Difuminado del contenido sobre el botón Añadir (como en Up to 40% y UnderCTRL) ----------
function updateFade() {
  const barTop = $('add-btn').getBoundingClientRect().top - 10;
  for (const el of document.querySelectorAll('main > *')) {
    el.style.setProperty('--fade-b', `${Math.round(barTop - el.getBoundingClientRect().top)}px`);
  }
}
window.addEventListener('scroll', updateFade, { passive: true });
window.addEventListener('resize', updateFade);
new ResizeObserver(updateFade).observe(document.querySelector('main'));

// Pide al navegador que no borre los datos guardados (fotos incluidas) si falta espacio
navigator.storage?.persist?.().catch(() => {});

// Al tocar una notificación se abre la ficha de esa partida (?open=id, o mensaje del service worker)
let pendingOpen = new URLSearchParams(location.search).get('open');
if (pendingOpen) history.replaceState(null, '', location.pathname);
const appEntered = () => !$('splash');
function openFromNotification(id) {
  if (!id) return;
  if (appEntered()) openDetail(id);
  else pendingOpen = id;
}

applyDisplay();
render();
startSplash();

// La fecha cambia a medianoche y con la app en segundo plano: se repinta al volver
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  render();
  syncNow();
  storeReminders();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (e) => { if (e.data?.type === 'open') openFromNotification(e.data.id); });
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

(async () => {
  try { meta = (await kvGet('meta')) || {}; } catch (_) { meta = {}; }
  syncNow();
  // Si el permiso sigue concedido, renueva la suscripción y los días de aviso
  if (notifyOn && canPush() && Notification.permission === 'granted' && !meta.subscribed) subscribePush();
  else storeReminders();
})();
