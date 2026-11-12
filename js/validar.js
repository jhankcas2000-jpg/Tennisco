/* =============================================================
   PROYECTO : TENNISCO - Tienda de zapatillas
   ARCHIVO  : js/validar.js (validaciones JavaScript)
   CURSO    : Fundamentos Web - UNIAJC
   =============================================================
   FUNCIONES DE VALIDACION:
   - mostrarError(campo, spanId, mensaje): muestra error en rojo
   - limpiarError(spanId): quita el error
   - validarTexto(id, spanId, min, max, etiqueta): nombre, ciudad, etc.
   - validarCorreo(id, spanId): formato de correo
   - validarCelular(id, spanId): 10 digitos, empieza por 3
   - validarCedula(id, spanId): entre 6 y 10 digitos
   - validarClave(id, id2, spanId, spanId2): contrasena y confirmacion
   - validarSelect(id, spanId, etiqueta): listas desplegables
   - validarCheckbox(id, spanId, mensaje): checkbox obligatorio
   - validarTextarea(id, spanId, min, max, etiqueta): area de texto
   - validarFormContacto(): valida todo contacto.html
   - validarFormPedido(): valida todo pedido.html
   - validarFormRegistro(): valida todo registro.html

   COMO SE USA:
   En el HTML, cada campo tiene:
     onblur="validarTexto('nombre','error-nombre',3,60,'Nombre')"
   Y el formulario tiene:
     onsubmit="return validarFormContacto()"
   ============================================================= */


/* ---------- FUNCIONES AUXILIARES ---------- */

/*
 * mostrarError: escribe un mensaje de error en el <span> indicado.
 * - campo: el elemento <input> o <select> que tiene el error
 * - spanId: el id del <span> donde se escribe el mensaje
 * - mensaje: texto del error en espanol
 */
function mostrarError(campo, spanId, mensaje) {
  var span = document.getElementById(spanId);
  span.textContent = mensaje;
  span.className = 'error-msg';
  campo.style.borderColor = '#e53935';
}

/*
 * limpiarError: quita el mensaje de error y restaura el borde.
 * - spanId: el id del <span> a limpiar
 * - campo: (opcional) el elemento para restaurar su borde
 */
function limpiarError(spanId, campo) {
  var span = document.getElementById(spanId);
  span.textContent = '';
  span.className = '';
  if (campo) {
    campo.style.borderColor = '';
  }
}


/* ---------- VALIDAR TEXTO (nombre, ciudad, direccion, etc.) ---------- */
/*
 * Usa trim() para quitar espacios al inicio y final.
 * trim() LIMPIA VISUALMENTE el campo: el usuario ve que los espacios
 * desaparecen al salir del campo.
 *
 * Verifica:
 *   1. Que no este vacio (despues del trim)
 *   2. Que tenga al menos 'min' caracteres
 *   3. Que no pase de 'max' caracteres
 *   4. Que no tenga solo espacios
 */
function validarTexto(id, spanId, min, max, etiqueta) {
  var campo = document.getElementById(id);
  var valor = campo.value.trim();          // trim() quita espacios
  campo.value = valor;                     // se ve limpio en el campo

  if (valor === '') {
    mostrarError(campo, spanId, etiqueta + ' es obligatorio.');
    return false;
  }
  if (valor.length < min) {
    mostrarError(campo, spanId, etiqueta + ' debe tener al menos ' + min + ' caracteres.');
    return false;
  }
  if (valor.length > max) {
    mostrarError(campo, spanId, etiqueta + ' no puede tener mas de ' + max + ' caracteres.');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR CORREO ELECTRONICO ---------- */
/*
 * Verifica:
 *   1. Que no este vacio
 *   2. Que contenga @ y al menos un punto despues del @
 *   3. Que no tenga espacios
 */
function validarCorreo(id, spanId) {
  var campo = document.getElementById(id);
  var valor = campo.value.trim();
  campo.value = valor;

  if (valor === '') {
    mostrarError(campo, spanId, 'El correo es obligatorio.');
    return false;
  }
  // Expresion regular basica para correo
  var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron.test(valor)) {
    mostrarError(campo, spanId, 'Escribe un correo valido. Ej: nombre@correo.com');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR CELULAR ---------- */
/*
 * Reglas para Colombia:
 *   - Exactamente 10 digitos
 *   - Empieza por 3
 *   - Solo numeros (sin espacios, guiones ni letras)
 */
function validarCelular(id, spanId) {
  var campo = document.getElementById(id);
  var valor = campo.value.trim();
  campo.value = valor;

  if (valor === '') {
    mostrarError(campo, spanId, 'El celular es obligatorio.');
    return false;
  }
  var patron = /^3[0-9]{9}$/;
  if (!patron.test(valor)) {
    mostrarError(campo, spanId, 'Debe ser 10 digitos y empezar por 3. Ej: 3001234567');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR CEDULA ---------- */
/*
 * Reglas:
 *   - Entre 6 y 10 digitos
 *   - Solo numeros (sin puntos ni letras)
 */
function validarCedula(id, spanId) {
  var campo = document.getElementById(id);
  var valor = campo.value.trim();
  campo.value = valor;

  if (valor === '') {
    mostrarError(campo, spanId, 'La cedula es obligatoria.');
    return false;
  }
  var patron = /^[0-9]{6,10}$/;
  if (!patron.test(valor)) {
    mostrarError(campo, spanId, 'Entre 6 y 10 digitos, solo numeros, sin puntos.');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR CONTRASENA ---------- */
/*
 * Reglas:
 *   - Minimo 8 caracteres
 *   - Maximo 30 caracteres
 *   - Las dos contrasenas deben ser iguales
 */
function validarClave(id, id2, spanId, spanId2) {
  var campo1 = document.getElementById(id);
  var campo2 = document.getElementById(id2);
  var valor1 = campo1.value;    // NO trim en contrasenas (espacios pueden ser intencionales)
  var valor2 = campo2.value;
  var ok = true;

  if (valor1 === '') {
    mostrarError(campo1, spanId, 'La contrasena es obligatoria.');
    ok = false;
  } else if (valor1.length < 8) {
    mostrarError(campo1, spanId, 'Minimo 8 caracteres.');
    ok = false;
  } else if (valor1.length > 30) {
    mostrarError(campo1, spanId, 'Maximo 30 caracteres.');
    ok = false;
  } else {
    limpiarError(spanId, campo1);
  }

  if (valor2 === '') {
    mostrarError(campo2, spanId2, 'Confirma tu contrasena.');
    ok = false;
  } else if (valor1 !== valor2) {
    mostrarError(campo2, spanId2, 'Las contrasenas no coinciden.');
    ok = false;
  } else if (ok) {
    limpiarError(spanId2, campo2);
  }

  return ok;
}


/* ---------- VALIDAR SELECT ---------- */
/*
 * Verifica que se haya elegido una opcion (que el value no este vacio).
 */
function validarSelect(id, spanId, etiqueta) {
  var campo = document.getElementById(id);
  var valor = campo.value;

  if (valor === '') {
    mostrarError(campo, spanId, 'Debes elegir ' + etiqueta + '.');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR CHECKBOX OBLIGATORIO ---------- */
/*
 * Verifica que el checkbox este marcado.
 */
function validarCheckbox(id, spanId, mensaje) {
  var campo = document.getElementById(id);
  var span = document.getElementById(spanId);

  if (!campo.checked) {
    span.textContent = mensaje;
    span.className = 'error-msg';
    return false;
  }

  span.textContent = '';
  span.className = '';
  return true;
}


/* ---------- VALIDAR TEXTAREA ---------- */
/*
 * Similar a validarTexto pero para <textarea>.
 * Si min es 0, el campo es opcional.
 */
function validarTextarea(id, spanId, min, max, etiqueta) {
  var campo = document.getElementById(id);
  var valor = campo.value.trim();
  campo.value = valor;

  // Si min es 0, el campo es opcional (solo valida si escribio algo)
  if (min === 0 && valor === '') {
    limpiarError(spanId, campo);
    return true;
  }

  if (valor === '' && min > 0) {
    mostrarError(campo, spanId, etiqueta + ' es obligatorio.');
    return false;
  }
  if (valor.length < min) {
    mostrarError(campo, spanId, etiqueta + ' debe tener al menos ' + min + ' caracteres.');
    return false;
  }
  if (valor.length > max) {
    mostrarError(campo, spanId, etiqueta + ' no puede tener mas de ' + max + ' caracteres.');
    return false;
  }

  limpiarError(spanId, campo);
  return true;
}


/* ---------- VALIDAR RADIO (grupo obligatorio) ---------- */
/*
 * Verifica que al menos una opcion del grupo 'name' este seleccionada.
 */
function validarRadio(name, spanId, mensaje) {
  var radios = document.getElementsByName(name);
  var span = document.getElementById(spanId);

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      span.textContent = '';
      span.className = '';
      return true;
    }
  }

  span.textContent = mensaje;
  span.className = 'error-msg';
  return false;
}


/* =============================================================
   VALIDACION COMPLETA DE CADA FORMULARIO
   Cada funcion se ejecuta con onsubmit="return validarFormXxx()"
   Si retorna false, el formulario NO se envia.
   Si retorna true, el formulario se envia a gracias.html.
   ============================================================= */


/* ---------- FORMULARIO: CONTACTO (contacto.html) ---------- */
function validarFormContacto() {
  var ok = true;

  // Validar nombre: minimo 3, maximo 60
  if (!validarTexto('nombre', 'error-nombre', 3, 60, 'El nombre')) ok = false;

  // Validar correo
  if (!validarCorreo('correo', 'error-correo')) ok = false;

  // Validar celular: 10 digitos, empieza por 3
  if (!validarCelular('celular', 'error-celular')) ok = false;

  // Validar ciudad: minimo 2, maximo 40
  if (!validarTexto('ciudad', 'error-ciudad', 2, 40, 'La ciudad')) ok = false;

  // Validar asunto (select)
  if (!validarSelect('asunto', 'error-asunto', 'un asunto')) ok = false;

  // Validar mensaje: minimo 10, maximo 500
  if (!validarTextarea('mensaje', 'error-mensaje', 10, 500, 'El mensaje')) ok = false;

  // Validar checkbox de datos personales
  if (!validarCheckbox('acepto', 'error-acepto', 'Debes autorizar el tratamiento de datos.')) ok = false;

  if (ok) {
    // Todo correcto: se envia el formulario
    return true;
  } else {
    // Hay errores: no se envia
    return false;
  }
}


/* ---------- FORMULARIO: PEDIDO (pedido.html) ---------- */
function validarFormPedido() {
  var ok = true;

  // Grupo 1: datos personales
  if (!validarTexto('nombre', 'error-nombre', 3, 60, 'El nombre')) ok = false;
  if (!validarCedula('cedula', 'error-cedula')) ok = false;
  if (!validarCelular('celular', 'error-celular')) ok = false;
  if (!validarCorreo('correo', 'error-correo')) ok = false;

  // Grupo 2: producto
  if (!validarSelect('modelo', 'error-modelo', 'un modelo de zapatilla')) ok = false;
  if (!validarTexto('talla', 'error-talla', 1, 5, 'La talla')) ok = false;

  // Validar cantidad (number): entre 1 y 20
  var cantidad = document.getElementById('cantidad');
  var cantSpan = document.getElementById('error-cantidad');
  var cantVal = parseInt(cantidad.value);
  if (isNaN(cantVal) || cantVal < 1 || cantVal > 20) {
    mostrarError(cantidad, 'error-cantidad', 'La cantidad debe ser entre 1 y 20.');
    ok = false;
  } else {
    limpiarError('error-cantidad', cantidad);
  }

  // Validar color (radio obligatorio)
  if (!validarRadio('color', 'error-color', 'Elige un color.')) ok = false;

  // Grupo 3: envio
  if (!validarTexto('direccion', 'error-direccion', 5, 100, 'La direccion')) ok = false;
  if (!validarTexto('ciudad-envio', 'error-ciudad-envio', 2, 40, 'La ciudad')) ok = false;
  if (!validarSelect('pago', 'error-pago', 'un metodo de pago')) ok = false;

  // Grupo 4: observaciones (opcional, max 300)
  if (!validarTextarea('observaciones', 'error-observaciones', 0, 300, 'Observaciones')) ok = false;

  // Checkbox terminos
  if (!validarCheckbox('acepto', 'error-acepto', 'Debes aceptar las condiciones de compra.')) ok = false;

  return ok;
}


/* ---------- FORMULARIO: REGISTRO (registro.html) ---------- */
function validarFormRegistro() {
  var ok = true;

  // Grupo 1: datos personales
  if (!validarTexto('nombre', 'error-nombre', 3, 60, 'El nombre')) ok = false;
  if (!validarCorreo('correo', 'error-correo')) ok = false;
  if (!validarCelular('celular', 'error-celular')) ok = false;

  // Fecha de nacimiento
  var fecha = document.getElementById('nacimiento');
  var fechaSpan = document.getElementById('error-nacimiento');
  if (fecha.value === '') {
    mostrarError(fecha, 'error-nacimiento', 'La fecha de nacimiento es obligatoria.');
    ok = false;
  } else {
    limpiarError('error-nacimiento', fecha);
  }

  // Grupo 2: cuenta
  if (!validarClave('clave', 'clave2', 'error-clave', 'error-clave2')) ok = false;
  if (!validarSelect('ciudad', 'error-ciudad', 'una ciudad')) ok = false;

  // Grupo 3: preferencias (opcionales, no bloquean envio)
  if (!validarTextarea('comentario', 'error-comentario', 0, 200, 'El comentario')) ok = false;

  // Checkboxes obligatorios
  if (!validarCheckbox('acepto', 'error-acepto', 'Debes aceptar los terminos y condiciones.')) ok = false;
  if (!validarCheckbox('mayor', 'error-mayor', 'Debes confirmar que eres mayor de 14 anos.')) ok = false;

  return ok;
}
