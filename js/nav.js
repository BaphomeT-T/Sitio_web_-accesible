/**
 * nav.js
 * Controla el menu de navegacion colapsable en pantallas pequenas.
 * Patron de mejora progresiva: el menu es visible por defecto en el
 * HTML/CSS; solo cuando este script corre se agrega la clase
 * "js-listo" a <html>, que es la que permite a layout.css colapsar
 * el menu. Si JavaScript falla, el menu queda siempre visible.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js-listo");

  var boton = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-principal");

  if (!boton || !nav) {
    return;
  }

  function cerrarMenu() {
    nav.classList.remove("menu-abierto");
    boton.setAttribute("aria-expanded", "false");
  }

  function abrirMenu() {
    nav.classList.add("menu-abierto");
    boton.setAttribute("aria-expanded", "true");
  }

  boton.addEventListener("click", function () {
    var abierto = boton.getAttribute("aria-expanded") === "true";
    if (abierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  nav.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
      cerrarMenu();
      boton.focus();
    }
  });

  var anchoEscritorioMedia = window.matchMedia("(min-width: 64rem)");
  anchoEscritorioMedia.addEventListener("change", function (evento) {
    if (evento.matches) {
      cerrarMenu();
    }
  });
})();
