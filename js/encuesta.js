const formulario = document.getElementById('encuestaForm');
const btnCancelar = document.getElementById('btnCancelar');

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const fechaNac = document.getElementById('fechaNac').value.trim();
  const sexoSeleccionado = document.querySelector('input[name="sexo"]:checked');
  const valoracionSeleccionada = document.querySelector('input[name="valoracion"]:checked');
  const email = document.getElementById('email').value.trim();
  const comentario = document.getElementById('comentario').value.trim();

  if (!nombre || !apellido || !fechaNac || !sexoSeleccionado || !valoracionSeleccionada || !email) {
    alert('Por favor, complete todos los campos obligatorios.');
    return; 
  }

  const soloLetras = /^[a-zA-Z\s]+$/;
  if (!soloLetras.test(nombre)) {
    alert('El nombre sólo puede contener letras.');
    return;
  }
  if (!soloLetras.test(apellido)) {
    alert('El apellido sólo puede contener letras.');
    return;
  }

  const regexFecha = /^\d{2}-\d{2}-\d{4}$/;
  if (!regexFecha.test(fechaNac)) {
    alert('La fecha de nacimiento debe tener el formato dd-mm-aaaa.');
    return;
  }

  const regexEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!regexEmail.test(email)) {
    alert('Ingrese un correo electrónico válido.');
    return;
  }

  let sexo = sexoSeleccionado.value;
  let valoracion = valoracionSeleccionada.value;

  let mensaje = `¡Datos de la encuesta!\n\n` +
                `Nombre: ${nombre}\n` +
                `Apellido: ${apellido}\n` +
                `Fecha Nac: ${fechaNac}\n` +
                `Sexo: ${sexo}\n` +
                `Valoración: ${valoracion}\n` +
                `Email: ${email}\n` +
                `Comentario: ${comentario}`;

  alert(mensaje);
});


btnCancelar.addEventListener('click', function() {
  const confirma = confirm('¿Deseas volver a la página anterior?');
  if (confirma) {
    window.history.back();
  }
});

