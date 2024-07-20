
let boton = document.getElementById("boton");
boton.addEventListener("click", traerDatos);

function traerDatos() {
    let dni = document.getElementById("dni").value;
    const url = `https://apiperu.dev/api/dni/${dni}?api_token=6cccc3563007629406ee9ae54f4b9e06cabd591238142d95b061a9a82e406494`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(datos => {
            console.log(datos); // Verifica la estructura de la respuesta de la API
            if (datos && datos.data) {
                document.getElementById("doc").value = datos.data.numero || '';
                document.getElementById("nombre").value = datos.data.nombres || '';
                document.getElementById("apellido").value = (datos.data.apellido_paterno || '') + " " + (datos.data.apellido_materno || '');
            } else {
                alert('No se encontraron datos para el DNI ingresado.');
                limpiarCampos();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al consultar la API.');
            limpiarCampos();
        });
}

function limpiarCampos() {
    document.getElementById("doc").value = '';
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
}
// Asegúrate de incluir esto en tu archivo JS principal, después de la definición de `traerDatos`.

document.getElementById('generarCita').addEventListener('click', function(event) {
    // Evitar que el enlace realice la redirección inmediatamente
    event.preventDefault();

    // Mostrar notificación
    alert('Cita generada exitosamente');

    // Redirigir a index.html después de un breve retraso para permitir que el usuario vea la notificación
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1000); // El tiempo en milisegundos antes de redirigir (1 segundo en este caso)
});
