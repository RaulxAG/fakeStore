window.onload = function () {
   const urlActual = window.location.href;
   const urlObjeto = new URL(urlActual);
   const id = urlObjeto.searchParams.get("id");

   let h2 = document.createElement("h2");
   h2.innerHTML = "Mostrando detalles del articulo: " + id;
   h2.className = "detalle__titulo";

   let main = document.getElementsByTagName("main")[0];

   main.appendChild(h2);

   fetch('https://fakestoreapi.com/products/'+id)
       .then(res=>res.json())
       .then(json => renderProducts(json))
       .catch((error) => alert("Error al intentar obtener el objeto con el id " + id + ": " + error.message)
   );

   function renderProducts(json) {
      let product = document.createElement("div");
      product.className = "producto__detalle";

      let image = document.createElement("img");
      image.width = 170;
      image.src = json.image;

      let title = document.createElement("h3");
      title.innerHTML = json.title;

      let category = document.createElement("h5");
      category.innerHTML = json.category;

      let description = document.createElement("p");
      description.className = "detalle__description"
      description.innerHTML = json.description;

      let price = document.createElement("p");
      price.className = "detalle__price";
      price.innerHTML = json.price + " €";

      product.appendChild(image);
      product.appendChild(title);
      product.appendChild(category);
      product.appendChild(description);
      product.appendChild(price);

      if (localStorage.getItem('Carrito')) {
         let product__button = document.createElement("button");
         product__button.className = "card__button";
         product__button.innerHTML = "Añadir al carrito";
         product__button.addEventListener('click', function () {
               let carrito = JSON.parse(localStorage.getItem('Carrito'));

               var newProduct = {
                  "id": json.id,
                  "image": json.image,
                  "title": json.title,
                  "quantity": 1
               };

               // Verificar si el producto ya está en el carrito
               var existingProduct = carrito.products.find(cartElement => cartElement.id === json.id);

               if (existingProduct) {
                  // Si el producto ya está en el carrito, incrementar la cantidad
                  existingProduct.quantity++;
               } else {
                  // Si el producto no está en el carrito, agregarlo
                  carrito.products.push(newProduct);
               }

               localStorage.setItem('Carrito', JSON.stringify(carrito));
         });

         // Append the button outside of the if statement
         product.appendChild(product__button);
      }

      main.appendChild(product);
   }
}