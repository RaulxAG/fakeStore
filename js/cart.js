window.onload = function () {
   if (localStorage.getItem('Carrito')) {
    let main = document.getElementsByTagName("main")[0];

    let carrito = JSON.parse(localStorage.getItem('Carrito'));

    carrito.products.forEach(productFromArray => {
        let product = document.createElement("div");
        product.className = "cart__product";

        let productDiv = document.createElement("div");
        productDiv.className = "cart__product__info";

        let img = document.createElement("img");
        img.className = "cart__product__img";
        img.src = productFromArray.image;
        img.width = 50;

        let title = document.createElement("h4");
        title.className = "cart__product__title";
        title.innerHTML = productFromArray.title;

        let quantity = document.createElement("h4");
        quantity.className = "cart__product__quantity";
        quantity.innerHTML = productFromArray.quantity;

        productDiv.appendChild(img);
        productDiv.appendChild(title);

        let botones = document.createElement("div");
        botones.className = "cart__product__buttons";

        let sumar = document.createElement("button");
        sumar.innerHTML = "+";
        sumar.addEventListener('click', function () {
            let actualQuantity = parseInt(quantity.innerHTML);
            quantity.innerHTML = actualQuantity + 1;

            updateLocalStorageQuantity(productFromArray.id, actualQuantity + 1);
        });

        let restar = document.createElement("button");
        restar.innerHTML = "-";
        restar.addEventListener('click', function () {
            let actualQuantity = parseInt(quantity.innerHTML);
            
            if (actualQuantity - 1 === 0) {
                if (confirm('¿Desea eliminar el producto?')) {
                    product.remove();
                    removeProductFromLocalStorage(productFromArray.id);
                }
            } else {
                // Update the quantity in HTML and localStorage
                quantity.innerHTML = actualQuantity - 1;
                updateLocalStorageQuantity(productFromArray.id, actualQuantity - 1);
            }

            updateLocalStorageQuantity(productFromArray.id, actualQuantity - 1);
        });

        botones.appendChild(restar);
        botones.appendChild(quantity);
        botones.appendChild(sumar);        

        product.appendChild(productDiv);
        product.appendChild(botones);

        main.appendChild(product);
    });

    let comprarDiv = document.createElement("div");
    comprarDiv.className = "cart__buy__container"

    let comprar = document.createElement("button");
    comprar.className = "cart__buy";
    comprar.innerHTML = "Realizar pedido";
    comprar.addEventListener('click', function() {
        alert("Compra realizada con éxito!");
    });

    comprarDiv.appendChild(comprar);

    function updateLocalStorageQuantity(productId, newQuantity) {
        carrito.products.forEach(product => {
            if (product.id === productId) {
                product.quantity = newQuantity;
            }
        });

        localStorage.setItem('Carrito', JSON.stringify(carrito));

        if (carrito.products.length === 0) {
            comprarDiv.remove();
        }
    }

    function removeProductFromLocalStorage(productId) {
        carrito.products = carrito.products.filter(product => product.id !== productId);

        localStorage.setItem('Carrito', JSON.stringify(carrito));
        if (carrito.products.length === 0) {
            comprarDiv.remove();
        }
    }

    if (!(carrito.products.length === 0)) {
        main.appendChild(comprarDiv);   
    }
   } else {
      window.location.href = "/fakeStore/index.html";
      alert("no has iniciado sesion! no puedes acceder al carrito");
   }
}