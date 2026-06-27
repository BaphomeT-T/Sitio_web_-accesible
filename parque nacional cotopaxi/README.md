# Parque Nacional Cotopaxi — Sitio web accesible

Proyecto académico de la asignatura Usabilidad y Accesibilidad. Sitio
informativo de turismo sobre el Parque Nacional Cotopaxi, construido en
HTML, CSS y JavaScript "vanilla" (sin frameworks), siguiendo HTML
semántico y el principio "HTML primero, ARIA solo si es necesario".

## Cómo verlo

No requiere instalación ni build. Basta abrir `index.html` en un
navegador, o servir la carpeta con cualquier servidor estático (por
ejemplo la extensión "Live Server" de VS Code) para que el video y las
rutas relativas funcionen igual que en producción.

## Estructura del proyecto

```
Sitio_web_ accesible/
├── index.html          Inicio
├── planifica.html       Planifica tu visita
├── rutas.html            Rutas y senderos
├── servicios.html        Servicios
├── contacto.html         Contacto y consultas
├── css/
│   ├── base.css          Reset, variables de color/tipografía, foco, botones
│   ├── layout.css        Cabecera, navegación, pie de página, cuadrículas
│   └── components.css    Tarjetas, formulario, tabla, modal, acordeón, filtros
├── js/
│   ├── nav.js            Menú de navegación colapsable (móvil)
│   ├── inicio.js         Mostrar/ocultar detalle del estado del parque
│   ├── rutas.js           Filtro por dificultad + buscador de rutas
│   ├── servicios.js       Apertura/cierre de los modales de servicios
│   └── contacto.js        Validación accesible del formulario de contacto
├── img/
│   ├── iconos/            Iconos SVG decorativos (ya incluidos)
│   └── fotos/              Fotografías reales del parque (pendiente, ver abajo)
├── mockups/                Wireframes originales del equipo
└── docs/
    ├── wcag-checklist.md     Mapeo de criterios WCAG 2.2 A/AA implementados
    ├── aria-justificacion.md Inventario de cada uso de ARIA y por qué
    ├── atag.md                Análisis de las herramientas usadas (ATAG)
    └── uaag-pruebas.md        Plantilla para registrar pruebas en navegadores/AT
```

## Fotografías pendientes (`img/fotos/`)

El sitio ya referencia estas rutas; falta colocar los archivos reales
(formato `.jpg`, recomendado 1200×675px o similar 16:9 para que no haya
recorte raro con `object-fit: cover`):

| Archivo a crear | Usado en | Alt text ya escrito en el HTML |
|---|---|---|
| `img/fotos/cotopaxi-hero.jpg` | `index.html` (hero) | "Vista panorámica del volcán Cotopaxi nevado, con el páramo andino y vegetación de pajonal en primer plano" |
| `img/fotos/planifica-acceso.jpg` | `planifica.html` | "Garita de control de acceso del Parque Nacional Cotopaxi con la vía de ingreso al fondo" |
| `img/fotos/mapa-senderos.jpg` | `rutas.html` | "Mapa del Parque Nacional Cotopaxi con la ubicación de los senderos al refugio José Rivas, la laguna de Limpiopungo y el sendero El Salitre" |

Si una foto real no coincide exactamente con el `alt` propuesto, ajusten el
texto alternativo en el HTML para que describa fielmente la foto que
coloquen (el `alt` debe describir la imagen real, no al revés).

## Componentes interactivos implementados (requisito 6.4)

1. **Menú desplegable** responsive (`js/nav.js`, todas las páginas).
2. **Acordeón** de preguntas frecuentes con `<details>` nativo (`planifica.html`).
3. **Filtro de búsqueda** por dificultad y por nombre de ruta (`rutas.html`, `js/rutas.js`).
4. **Modal** de detalle por cada servicio, con `<dialog>` nativo (`servicios.html`, `js/servicios.js`).
5. **Botón mostrar/ocultar** del estado del parque (`index.html`, `js/inicio.js`).
6. **Mensajes dinámicos** de validación y confirmación del formulario (`contacto.html`, `js/contacto.js`).

## Próximos pasos sugeridos para el equipo

1. Colocar las 3 fotografías reales descritas arriba.
2. Ejecutar WAVE y axe DevTools sobre cada página y completar `docs/uaag-pruebas.md`.
3. Hacer las pruebas de navegador/móvil/lector de pantalla/teclado y documentarlas en `docs/uaag-pruebas.md`.
4. Revisar que el video de YouTube incrustado en `index.html` siga disponible antes de la presentación.
