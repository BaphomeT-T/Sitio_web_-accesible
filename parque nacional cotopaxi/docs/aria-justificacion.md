# Uso de WAI-ARIA: principio "HTML primero"

Siguiendo la guía de la asignatura (sección 7.2), este sitio usa **HTML
semántico nativo siempre que es posible** y reserva ARIA solo para los cinco
casos que la propia guía señala como aceptables. No se usa ningún otro
atributo ARIA en el sitio (no hay `aria-label`, `role="status"`,
`aria-live`, `aria-hidden`, roles de pestañas, etc.).

## Inventario completo de ARIA usado

| Atributo | Dónde | Por qué HTML no bastaba |
|---|---|---|
| `aria-expanded` | Botón de menú móvil (`.menu-toggle`, todas las páginas) y botón "Ver más detalles del estado" (`index.html`) | HTML no tiene un atributo nativo para indicar si un control que despliega contenido está abierto o cerrado. Es exactamente el ejemplo "aria-expanded en menús desplegables" que cita la guía. |
| `aria-controls` | Los mismos dos botones anteriores | Relaciona el botón con el panel que controla cuando esa relación no puede inferirse del DOM (el panel no es hijo directo del botón). Ejemplo "aria-controls para relacionar botones con paneles" de la guía. |
| `role="alert"` | Resumen de errores y confirmación de envío del formulario (`contacto.html`), y cada mensaje de error individual (`.mensaje-error`) | Son los únicos mensajes dinámicos críticos del sitio: aparecen sin recarga de página y el usuario debe conocerlos de inmediato aunque no tenga el foco ahí. HTML no tiene una región de notificación nativa. Coincide con el ejemplo "role=alert para mensajes dinámicos importantes". |
| `aria-current="page"` | Enlace del menú principal correspondiente a la página activa (en las 5 páginas) | Indica cuál es la página actual dentro de un grupo de enlaces equivalentes; no existe un atributo HTML nativo para "página actual" dentro de una lista de navegación. Ejemplo "aria-current para indicar la página actual". |
| `aria-describedby` | Todos los campos del formulario de contacto, apuntando al texto de ayuda y al mensaje de error | Asocia programáticamente la instrucción y el error con su campo para tecnologías asistivas, cuando esa relación visual (cercanía) no es suficiente para un lector de pantalla. Ejemplo "aria-describedby para instrucciones o errores de formulario". |

## Componentes donde se evitó ARIA a propósito

| Componente | Solución usada | Por qué no se necesitó ARIA |
|---|---|---|
| Acordeón de preguntas frecuentes (`planifica.html`) | `<details>` / `<summary>` nativos | El navegador ya expone el estado abierto/cerrado y la relación resumen-contenido sin ningún atributo adicional. |
| Modal de detalle de servicios (`servicios.html`) | `<dialog>` nativo con `.showModal()` | `<dialog>` ya tiene rol de diálogo implícito, atrapa el foco y se cierra con `Escape` de forma nativa en navegadores modernos. |
| Filtro por dificultad (`rutas.html`) | Grupo de `<input type="radio">` con `<label>`, dentro de `<fieldset>`/`<legend>` | El estado "seleccionado" ya lo anuncia el navegador de forma nativa; no hace falta `aria-pressed` ni un patrón de pestañas ARIA. |
| Iconos decorativos (logo, "qué llevar", tarjetas de servicios) | `<img alt="">` | Es el mecanismo HTML estándar para que una imagen sea ignorada por tecnologías asistivas (requisito 6.2), sin necesidad de `aria-hidden`. |
| Flechas de acordeón / botón "mostrar más" | Pseudo-elemento CSS (`::after`) | El contenido generado por CSS no se expone a la tabla de accesibilidad; al ser puramente decorativo no requiere ocultarse explícitamente con ARIA. |
| Indicar página actual visualmente | Borde inferior + color en `.nav-principal__enlace[aria-current="page"]` | El `aria-current` ya cubre la parte de accesibilidad; el estilo CSS reutiliza ese mismo atributo como selector, sin duplicar lógica. |

## Conclusión

De los seis usos de ARIA recomendados como ejemplo en la guía, este sitio
implementa cinco (todos salvo casos que no aplican al contenido del
parque). No se introdujo ningún atributo ARIA adicional "por si acaso": en
cada componente interactivo se evaluó primero si un elemento HTML nativo
(`details`, `dialog`, `input type="radio"`, `img alt=""`) ya resolvía el
problema de accesibilidad antes de recurrir a ARIA.
