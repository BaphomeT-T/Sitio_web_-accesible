/**
 * rutas.js
 * Componentes interactivos de la pagina "Rutas y senderos":
 *  1) Filtro por dificultad (grupo de radios estilizados como chips).
 *  2) Buscador por nombre de ruta (input type="search").
 *  3) Mapa interactivo: puntos de interes que abren un <dialog> con
 *     informacion general del lugar (mismo patron de modal nativo
 *     que en servicios.js: showModal() ya gestiona foco, atrapamiento
 *     de foco y cierre con Escape, sin necesidad de ARIA adicional).
 * Los tres se inicializan de forma independiente: si una parte de la
 * pagina no esta presente, el resto sigue funcionando igual.
 */
(function () {
  "use strict";

  var formularioFiltro = document.querySelector("[data-rol='filtro-rutas']");
  var campoBusqueda = document.querySelector("#buscar-ruta");
  var filas = document.querySelectorAll("[data-rol='fila-ruta']");
  var resultado = document.querySelector("#resultado-busqueda");

  if (filas.length) {
    var dificultadSeleccionada = function () {
      if (!formularioFiltro) {
        return "todas";
      }
      var marcado = formularioFiltro.querySelector("input[name='dificultad']:checked");
      return marcado ? marcado.value : "todas";
    };

    var textoBusqueda = function () {
      return campoBusqueda ? campoBusqueda.value.trim().toLowerCase() : "";
    };

    var aplicarFiltros = function () {
      var dificultad = dificultadSeleccionada();
      var texto = textoBusqueda();
      var visibles = 0;

      filas.forEach(function (fila) {
        var coincideDificultad = dificultad === "todas" || fila.dataset.dificultad === dificultad;
        var nombre = (fila.dataset.nombre || "").toLowerCase();
        var coincideTexto = texto === "" || nombre.indexOf(texto) !== -1;
        var visible = coincideDificultad && coincideTexto;

        fila.hidden = !visible;
        if (visible) {
          visibles += 1;
        }
      });

      if (resultado) {
        resultado.textContent =
          visibles === 0
            ? "No se encontraron rutas con esos criterios."
            : "Mostrando " + visibles + " de " + filas.length + " rutas.";
      }
    };

    if (formularioFiltro) {
      formularioFiltro.addEventListener("change", aplicarFiltros);
    }

    if (campoBusqueda) {
      campoBusqueda.addEventListener("input", aplicarFiltros);
    }

    aplicarFiltros();
  }

  /* Mapa interactivo: puede haber varios botones (marcadores del mapa
     y botones de la lista equivalente) apuntando al mismo <dialog>,
     asi que se agrupan por id de modal antes de enlazar los eventos
     de apertura. El cierre y el retorno de foco quedan iguales que
     en servicios.js, pero el foco vuelve siempre al ultimo boton que
     abrio el modal (sea del mapa o de la lista). */
  var botonesAbrirMapa = document.querySelectorAll("[data-abrir-modal]");
  var ultimoBotonPorModal = {};

  botonesAbrirMapa.forEach(function (boton) {
    var id = boton.getAttribute("data-abrir-modal");
    var dialogo = document.getElementById(id);
    if (!dialogo) {
      return;
    }

    boton.addEventListener("click", function () {
      ultimoBotonPorModal[id] = boton;
      dialogo.showModal();
    });

    if (dialogo.dataset.modalListo === "true") {
      return;
    }
    dialogo.dataset.modalListo = "true";

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
      var ultimoBoton = ultimoBotonPorModal[id];
      if (ultimoBoton) {
        ultimoBoton.focus();
      }
    });
  });
})();