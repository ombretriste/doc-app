# DocCTRL

*by OmT Finance*

Versión **0.1.0** (se muestra en la pantalla de inicio). Las correcciones y ajustes suben el último número (0.1.1); las novedades, el del medio (0.2.0).

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
  - Finanzas: cuenta bancaria, tarjeta bancaria (solo los últimos 4 dígitos).
  - Otros: garantía, suscripción, mascota, carnet de socio, otro documento.
- Cada partida tiene sus campos, un nombre opcional, notas y **fotos** (se reducen a 1800 px en JPEG). La fecha marcada con 🔔 es la que genera el aviso.
- **Ficha**: tocar un dato lo copia; los teléfonos tienen botón de llamar; las fotos se abren a pantalla completa. **Recordatorio** descarga un evento `.ics` para el calendario, con avisos con la antelación elegida y una semana antes.
- Menú ⋯: Personas, Aviso de vencimientos (15–180 días), Opciones de visualización (oscuro/claro/automático y cuatro fondos: Ámbar, Coral, Menta y Glaciar), Exportar copia e Importar copia.

Los datos se guardan solo en el propio dispositivo: los campos en `localStorage` (`docctrl:v1`) y las fotos en IndexedDB (`docctrl`). La copia exportada es un `.json` con todo, fotos incluidas; sirve para pasar los datos a otro dispositivo.

## Desarrollo

Sitio estático sin dependencias ni paso de compilación:

```bash
python3 -m http.server 8000
```

Al cambiar archivos, sube `APP_VERSION` en `app.js`, la línea de versión de este README y la versión de `CACHE` en `sw.js`.

## Despliegue

Importa el repositorio en [Vercel](https://vercel.com/new) con el preset **Other** (sin comando de compilación). Cada `git push` a `main` se despliega automáticamente.
