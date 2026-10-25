# DocCTRL

*by OmT Finance*

Versión **0.2.5** (se muestra en la pantalla de inicio). Las correcciones y ajustes suben el último número (0.1.1); las novedades, el del medio (0.2.0).

App web instalable (PWA) para tener a mano los documentos y datos del día a día de una persona, una pareja o una familia (DNI, carnet de conducir, seguros, ITV, garantías…), con sus fotos y avisos de vencimiento.

## Funcionamiento

- Pantalla de inicio con el logo; al pulsar **Entrar** se pasa a la app. Siempre en vertical.
- **Resumen de vencimientos**: partidas vencidas, las que vencen dentro del aviso (60 días por defecto) y la lista de las más urgentes.
- **Personas**: filtro por persona (más «Común» para lo que es de todos). Se gestionan en el menú ⋯ → Personas.
- **Buscador** por nombre, número, compañía, notas…
- **Partidas** agrupadas por categoría:
  - Identidad: DNI, pasaporte, carnet de conducir, NIE/TIE, tarjeta sanitaria, tarjeta sanitaria europea, Seguridad Social.
  - Vehículos: vehículo e ITV, seguro del vehículo, impuesto de circulación.
  - Hogar: seguro de hogar, alquiler o hipoteca, suministros, revisión de caldera o gas.
  - Salud y seguros: seguro médico, seguro de vida, ficha médica.
  - Finanzas: recibo o pago periódico, cuenta bancaria, tarjeta bancaria (solo los últimos 4 dígitos).
  - Otros: garantía, suscripción, mascota, carnet de socio, otro documento.
- Cada partida tiene sus campos, un nombre opcional, notas y **fotos** (se reducen a 1800 px en JPEG). La fecha marcada con 🔔 es la que genera el aviso.
- **Ficha**: tocar un dato lo copia; los teléfonos tienen botón de llamar; las fotos se abren a pantalla completa. **Recordatorio** descarga un evento `.ics` para el calendario, con avisos con la antelación elegida y una semana antes.
- **Repetición**: recibos, seguros, suscripciones, impuesto de circulación, caldera y vacunas pueden repetirse (cada mes, 2, 3, 6, 12 o 24 meses); al pasar la fecha saltan solos a la siguiente.
- **Avisos**: cada partida avisa con su antelación (se cambia al editarla: automático, 0–180 días o sin avisos), una semana antes y el mismo día. Por defecto: DNI, pasaporte, NIE y carnet 90 días; seguros, ITV, garantías y tarjetas 30; impuesto de circulación y mascota 15; suscripciones 7; recibos 3; el resto, la antelación general (⋯ → Avisos).
- Menú ⋯: Personas, Avisos, Sincronización en la nube, Opciones de visualización (oscuro/claro/automático y cuatro fondos: Ámbar, Coral, Menta y Glaciar), Exportar copia e Importar copia.

## Notificaciones push

Mismo diseño que TaskCTRL (`api/push.js`, sin dependencias: firma VAPID con WebCrypto):

1. La app calcula los avisos de los próximos 400 días, guarda su texto en IndexedDB (`docctrl` → `meta` → `reminders`) y sube a `api/push` **solo los días** en que toca avisar (nunca nombres ni números).
2. El cron de Vercel (`vercel.json`) llama a `/api/push?run` una vez al día (07:00 UTC: 9:00 en verano, 8:00 en invierno) y el servidor manda un push vacío a cada dispositivo al que le toca.
3. El service worker recibe el push, lee los avisos del móvil y muestra la notificación (hasta 3 sueltas o un resumen). Al tocarla se abre la ficha de la partida.

En iPhone/iPad hace falta iOS 16.4 o posterior y abrir la app desde el icono de la pantalla de inicio. Los avisos se activan en cada dispositivo por separado (⋯ → Avisos). Alternativa sin servidor: ⋯ → Avisos → «Añadir todo al calendario» (`.ics` con alarmas).

## Sincronización en la nube

Igual que TaskCTRL y PayCTRL (`api/sync.js`): usuario y contraseña derivan con PBKDF2 una clave de acceso y otra de cifrado (sales `docctrl-…`), los datos se cifran con AES-GCM en el dispositivo y el servidor solo guarda bloques ilegibles. Se fusiona partida a partida (gana el cambio más reciente, los borrados se respetan). Las fotos se cifran y suben una a una (`file-put/get/list/del`, hasta 3 MB cada una). Crear cuenta pide la misma clave de registro que UnderCTRL.

## Configuración en Vercel

1. **Storage → Upstash Redis**: conecta la misma base de datos que usan las otras apps (las claves de DocCTRL empiezan por `doc:`) y vuelve a desplegar.
2. Comprueba `https://<tu-app>.vercel.app/api/push` y `/api/sync`: deben decir `"configured": true`. Si no, la lista `vars` muestra qué variables ve el servidor.
3. El cron diario se crea solo con `vercel.json`. (Opcional: un cron en cron-job.org a `/api/push?run` lo hace más puntual.)

Los datos se guardan en el propio dispositivo: los campos en `localStorage` (`docctrl:v1`) y las fotos en IndexedDB (`docctrl`). La copia exportada es un `.json` con todo, fotos incluidas. Con la sincronización activada, se suben a la nube cifrados.

## Desarrollo

Sitio estático sin dependencias ni paso de compilación:

```bash
python3 -m http.server 8000
```

Al cambiar archivos, sube `APP_VERSION` en `app.js`, la línea de versión de este README y la versión de `CACHE` en `sw.js`.

## Despliegue

Importa el repositorio en [Vercel](https://vercel.com/new) con el preset **Other** (sin comando de compilación). Cada `git push` a `main` se despliega automáticamente.
