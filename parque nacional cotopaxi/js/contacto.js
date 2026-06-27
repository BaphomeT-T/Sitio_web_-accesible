/**
 * contacto.js
 * Validacion accesible del formulario de contacto.
 * - No depende solo del color: cada error muestra texto "Error:" y
 *   cambia el borde, y el resumen lista todos los errores con enlaces.
 * - role="alert" se usa unicamente en el resumen de errores y en la
 *   confirmacion final, tal como lo permite la guia de la asignatura
 *   para "mensajes dinamicos importantes".
 * - El envio es simulado: no hay backend, solo se muestra confirmacion.
 */
(function () {
  "use strict";

  var formulario = document.querySelector("#formulario-contacto");
  if (!formulario) {
    return;
  }

  var resumen = document.querySelector("#resumen-errores");
  var listaResumen = document.querySelector("#lista-errores");
  var confirmacion = document.querySelector("#confirmacion-envio");

  var reglas = {
    nombre: {
      validar: function (valor) {
        return valor.trim().length >= 3;
      },
      mensaje: "Escribe tu nombre completo (mínimo 3 caracteres).",
    },
    correo: {
      validar: function (valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
      },
      mensaje: "Ingresa un correo válido, por ejemplo nombre@dominio.com.",
    },
    motivo: {
      validar: function (valor) {
        return valor.trim().length > 0;
      },
      mensaje: "Selecciona el motivo de tu consulta.",
    },
    mensaje: {
      validar: function (valor) {
        return valor.trim().length >= 10;
      },
      mensaje: "Escribe tu consulta con al menos 10 caracteres.",
    },
  };

  function obtenerCampo(nombreCampo) {
    return formulario.elements.namedItem(nombreCampo);
  }

  function mostrarError(nombreCampo, mensaje) {
    var campo = obtenerCampo(nombreCampo);
    var error = document.getElementById(nombreCampo + "-error");
    var contenedor = campo.closest(".campo");

    if (contenedor) {
      contenedor.classList.add("campo--error");
    }
    if (error) {
      error.textContent = "Error: " + mensaje;
      error.hidden = false;
    }
  }

  function limpiarError(nombreCampo) {
    var campo = obtenerCampo(nombreCampo);
    var error = document.getElementById(nombreCampo + "-error");
    var contenedor = campo.closest(".campo");

    if (contenedor) {
      contenedor.classList.remove("campo--error");
    }
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  }

  function validarCampo(nombreCampo) {
    var campo = obtenerCampo(nombreCampo);
    var regla = reglas[nombreCampo];
    var valido = regla.validar(campo.value);

    if (valido) {
      limpiarError(nombreCampo);
    } else {
      mostrarError(nombreCampo, regla.mensaje);
    }
    return valido;
  }

  Object.keys(reglas).forEach(function (nombreCampo) {
    var campo = obtenerCampo(nombreCampo);
    if (campo) {
      campo.addEventListener("blur", function () {
        validarCampo(nombreCampo);
      });
    }
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var camposInvalidos = [];

    Object.keys(reglas).forEach(function (nombreCampo) {
      var esValido = validarCampo(nombreCampo);
      if (!esValido) {
        camposInvalidos.push(nombreCampo);
      }
    });

    if (camposInvalidos.length > 0) {
      if (listaResumen) {
        listaResumen.innerHTML = "";
        camposInvalidos.forEach(function (nombreCampo) {
          var campo = obtenerCampo(nombreCampo);
          var etiqueta = document.querySelector("label[for='" + campo.id + "']");
          var item = document.createElement("li");
          var enlace = document.createElement("a");
          enlace.href = "#" + campo.id;
          enlace.textContent = etiqueta ? etiqueta.textContent : nombreCampo;
          enlace.addEventListener("click", function (e) {
            e.preventDefault();
            campo.focus();
          });
          item.appendChild(enlace);
          listaResumen.appendChild(item);
        });
      }
      if (resumen) {
        resumen.hidden = false;
        resumen.focus();
      }
      return;
    }

    if (resumen) {
      resumen.hidden = true;
    }

    formulario.setAttribute("data-enviado", "true");
    if (confirmacion) {
      confirmacion.hidden = false;
      confirmacion.setAttribute("tabindex", "-1");
      confirmacion.focus();
    }
  });
})();
