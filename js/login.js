window.onload = function() {
    document.getElementById("formularioInicioSesion").addEventListener("submit", function(event) {
        event.preventDefault();

        const url = "https://fakestoreapi.com/auth/login";
        const usuario = document.getElementById("usuario").value;
        const contraseña = document.getElementById("contrasena").value;

        const datosInicioSesion = {
            username: usuario,
            password: contraseña,
        };

        const opcionesSolicitud = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosInicioSesion),
        };

        fetch(url, opcionesSolicitud)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Error en la solicitud: ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then((datos) => {
                alert("Inicio de sesión exitoso. Token de acceso: " + datos.token);
            })
            .catch((error) => {
                alert("Error en el inicio de sesión: " + error.message);
            });
    });
};
