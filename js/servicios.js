/**
 * servicios.js
 * Controla los modales (elemento <dialog> nativo) que muestran el
 * detalle de cada servicio. <dialog>.showModal() ya gestiona por si
 * solo el foco, el atrapamiento de foco y el cierre con Escape, por
 * lo que no se necesita ningun atributo ARIA adicional.
 */
(function () {
  "use strict";

  var botonesAbrir = document.querySelectorAll("[data-abrir-modal]");

  botonesAbrir.forEach(function (boton) {
    var id = boton.getAttribute("data-abrir-modal");
    var dialogo = document.getElementById(id);
    if (!dialogo) {
      return;
    }

    boton.addEventListener("click", function () {
      dialogo.showModal();
    });

    var botonCerrar = dialogo.querySelector("[data-cerrar-modal]");
    if (botonCerrar) {
      botonCerrar.addEventListener("click", function () {
        dialogo.close();
      });
    }

    dialogo.addEventListener("click", function (evento) {
      if (evento.target === dialogo) {
        dialogo.close();
      }
    });

    dialogo.addEventListener("close", function () {
      boton.focus();
    });
  });
})();
