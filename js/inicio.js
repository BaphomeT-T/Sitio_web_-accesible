/**
 * inicio.js
 * Boton "mostrar/ocultar" del detalle del estado del parque
 * en la pagina de Inicio (componente interactivo 6.4).
 */
(function () {
  "use strict";

  var boton = document.querySelector("[data-accion='alternar-estado']");
  if (!boton) {
    return;
  }

  var panelId = boton.getAttribute("aria-controls");
  var panel = document.getElementById(panelId);
  if (!panel) {
    return;
  }

  boton.addEventListener("click", function () {
    var expandido = boton.getAttribute("aria-expanded") === "true";
    boton.setAttribute("aria-expanded", String(!expandido));
    panel.hidden = expandido;
    boton.textContent = expandido
      ? "Ver más detalles del estado"
      : "Ocultar detalles del estado";
  });
})();
