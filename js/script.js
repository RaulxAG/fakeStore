window.onload = function () {
  let products = document.createElement("section");
  products.className = "products";

  let index = 0;
  let loading = false;

  let apiUrl = `https://fakestoreapi.com/products`;

  function loadMoreProducts() {
    if (loading) return;
    loading = true;

    fetch(apiUrl)
    .then(res => res.json())
    .then(json => renderProducts(json))
    .catch((error) => {
        alert("Error al intentar obtener más productos: " + error.message);
    });
  }

  document.getElementById("filtro").addEventListener("change", function () {
    let filterOption = this.value;

    index = 0;

    if (filterOption === "electronic") {
      apiUrl = `https://fakestoreapi.com/products/category/electronics`;
    } else if (filterOption === "jewelery") {
      apiUrl = `https://fakestoreapi.com/products/category/jewelery`;
    } else if (filterOption === "men") {
      apiUrl = `https://fakestoreapi.com/products/category/men's%20clothing`;
    } else if (filterOption === "women") {
      apiUrl = `https://fakestoreapi.com/products/category/women's%20clothing`;
    } else if (filterOption === "LowToHigh") {
      apiUrl = `https://fakestoreapi.com/products`;
    } else if (filterOption === "HighToLow") {
      apiUrl = `https://fakestoreapi.com/products?sort=desc`;
    } else if (filterOption === "default") {
      apiUrl = `https://fakestoreapi.com/products`;
    }

    console.log(apiUrl);
    products.innerHTML = "";
    loadMoreProducts();
  });

  function LoadingAlert() {
    console.log("Cargando elementos...");
  }

  window.addEventListener('scroll', function () {
    if (isAtBottom()) {
      loadMoreProducts();
    }
  });

  function isAtBottom() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  }

  function renderProducts(json) {
   for (let i = 0; i < 8; i++) {
      let element = json[index];

      let card = document.createElement("div");
      card.id = element.id;
      card.className = "products__card " + element.category.replace(/\s+/g, '_').replace(/'/g, '');

      let product_image = document.createElement("img");
      product_image.className = "card__image";
      product_image.src = element.image;

      let product_name = document.createElement("p");
      product_name.className = "card__name";
      product_name.innerHTML = element.title;

      let product__price = document.createElement("p");
      product__price.className = "card__price";
      product__price.innerHTML = element.price + " €";

      let product__detail = document.createElement("a");
      product__detail.className = "card__detail";
      product__detail.href = "pages/detalle.html?id=" + element.id;
      product__detail.innerHTML = "Ver detalles";

      card.appendChild(product_image);
      card.appendChild(product_name);
      card.appendChild(product__price);

      if (localStorage.getItem('Carrito')) {
         let product__button = document.createElement("button");
         product__button.className = "card__button";
         product__button.innerHTML = "Añadir al carrito";
         product__button.addEventListener('click', function () {
         let carrito = JSON.parse(localStorage.getItem('Carrito'));
      
         var newProduct = {
               "id": element.id,
               "image": element.image,
               "title": element.title,
               "quantity": 1
         };

         var existingProduct = carrito.products.find(cartElement => cartElement.id === element.id);
      
         if (existingProduct) {
               existingProduct.quantity++;
         } else {
               carrito.products.push(newProduct);
         }

         localStorage.setItem('Carrito', JSON.stringify(carrito));
         });

         card.appendChild(product__button);
      }
      
      card.appendChild(product__detail);
      products.appendChild(card);

      index++;
    };
    loading = false;
    LoadingAlert();
  }

  loadMoreProducts();

  document.getElementsByTagName("main")[0].appendChild(products);
}
