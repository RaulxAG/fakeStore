window.onload = function () {
   // Comprobar si la clave "Usuario" existe en el local storage
   if (!localStorage.getItem("Usuario")) {
       // Ejecutar código correspondiente si la clave no existe

       document.getElementById("formularioInicioSesion").addEventListener("submit", function (event) {
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
                   alert("¡Inicio de sesión exitoso!");
                   localStorage.setItem('Usuario', JSON.stringify(datos));
                   createCart();
               })
               .catch((error) => {
                   alert("Error en el inicio de sesión: " + error.message);
               });
       });

       function createCart() {
           fetch('https://fakestoreapi.com/carts', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                   userId: 5,
                   date: '2020-02-03',
                   products: []
               }),
           })
               .then(res => res.json())
               .then(json => {
                   localStorage.setItem('Carrito', JSON.stringify(json));
                   location.reload();
               })
               .catch((error) => {
                   alert("Error al crear el carrito: " + error.message);
               });
       }
   } else {
      exitButton();
   }

   function exitButton() {
      document.getElementById("formularioInicioSesion").remove();
      let exitButton = document.createElement("button")
      exitButton.className = "sessionClose";
      exitButton.innerHTML = "Cerrar Sesión";
      exitButton.addEventListener('click', () => {
         localStorage.removeItem("Usuario");
         localStorage.removeItem("Carrito");
         alert("Sesion Finalizada.");
         location.reload();
      })

      document.getElementById("mainInicioSesion").appendChild(exitButton);
   }
};