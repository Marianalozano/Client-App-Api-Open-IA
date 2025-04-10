/**
 * Función asincrónica para enviar un mensaje a la API y mostrar la respuesta en la página.
 */
async function enviarMensaje() {
    // Obtiene el mensaje ingresado por el usuario en el campo de entrada
    const inputMensaje = document.getElementById("prompt").value;
    // Obtiene el elemento donde se mostrará la respuesta de la API
    const respuestaElemento = document.getElementById("respuesta");

    // Verifica si el campo de entrada está vacío
    if (inputMensaje.trim() === "") {
        respuestaElemento.textContent = "Por favor, escribe un mensaje.";
        return; // Sale de la función si no hay mensaje
    }

    // URL de la API donde se enviará el mensaje (debe ser reemplazada con la URL real)
    const url = "http://44.192.98.80/api-gpt-php/endpoints/chat.php";
    
    // Datos que se enviarán en la solicitud
    const datos = { message: inputMensaje };

    try {
        // Realiza la solicitud a la API utilizando el método POST
        const respuesta = await fetch(url, {
            method: "POST", // Método de la solicitud
            headers: {
                "Content-Type": "application/json" // Especifica el tipo de contenido como JSON
            },
            body: JSON.stringify(datos) // Convierte los datos a formato JSON antes de enviarlos
        });

        // Convierte la respuesta de la API a formato JSON
        const resultado = await respuesta.json();

        // Verifica si la API respondió con un estado 200 (éxito)
        if (resultado.status === 200) {
            // Muestra la respuesta de la API en la página
            respuestaElemento.textContent = resultado.data.reply;
        } else {
            // Muestra un mensaje de error si la API devuelve un estado diferente
            respuestaElemento.textContent = "Error en la respuesta de la API.";
        }
    } catch (error) {
        // Captura y maneja cualquier error en la conexión con la API
        respuestaElemento.textContent = "Error en la conexión con la API.";
        console.error("Error:", error); // Muestra detalles del error en la consola
    }
}
