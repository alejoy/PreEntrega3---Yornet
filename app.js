const URL_API = 'https://fakestoreapi.com/products';
const contenedorProductos = document.querySelector('#productos');
const carritoElemento = document.querySelector('#carrito');
const contadorCarrito = document.querySelector('#contadorCarrito');
const contenedorCarrito = document.querySelector('#contenedorCarrito');
let carrito = [];

// Obtener los datos del carrito guardados en el Local Storage al cargar la página
function obtenerCarritoLocalStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
    actualizarCarrito();
  }
}

// Guardar los datos del carrito en el Local Storage
function guardarCarritoLocalStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}

async function mostrarProductos() {
  try {
    const respuesta = await fetch(URL_API);
    const productos = await respuesta.json();
    let html = '';
 console.log(productos)
    productos.forEach(producto => {
      html += `
        <div class="item-producto">
          <img src="${producto.image}" alt="${producto.title}">
          <h2>${producto.title}</h2>
          <p>$${producto.price}</p>
          <button class="boton-agregar" data-id="${producto.id}">Agregar al carrito</button>
        </div>
      `;
    });

    contenedorProductos.innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}

function agregarAlCarrito(productos) {
  if (carrito.includes(productos)) {
    console.log('El producto ya está en el carrito.');
  } else {
    carrito.push(productos);
    actualizarCarrito();
    guardarCarritoLocalStorage(); // Guardar los datos del carrito en el Local Storage
    console.log('Producto agregado al carrito:', productos);
  }
}

function actualizarCarrito() {
  contadorCarrito.textContent = carrito.length;

  if (carrito.length > 0) {
    contenedorCarrito.style.display = 'block';
    mostrarCarrito();
  } else {
    contenedorCarrito.style.display = 'none';
  }
}

function mostrarCarrito() {
  let html = '';
console.log(carrito)
  carrito.forEach(productos => {
    html += `
      <div class="item-carrito">
        <h3>${productos.title}</h3>
        <p>$${productos.price}</p>
      </div>
    `;
  });

  html += `
    <div class="botones-carrito">
      <button class="boton-vaciar">Vaciar carrito</button>
      <button class="boton-comprar">Comprar</button>
    </div>
  `;

  contenedorCarrito.innerHTML = html;
  contenedorCarrito.style.display = 'block';
}

const botonVaciarCarrito = document.querySelector('.boton-vaciar');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  guardarCarritoLocalStorage(); // Guardar los datos del carrito vacío en el Local Storage
  contenedorCarrito.innerHTML = '';
  contenedorCarrito.style.display = 'none';
  console.log('Carrito vaciado.');
}

contenedorProductos.addEventListener('click', (event) => {
  if (event.target.classList.contains('boton-agregar')) {
    const idProducto = event.target.getAttribute('data-id');
    const producto = getProductById(idProducto);
    agregarAlCarrito(producto);
  }

  if (event.target.id === 'carrito') {
    mostrarCarrito();
  }

  if (event.target.classList.contains('boton-vaciar')) {
    vaciarCarrito();
  }
});

async function getProductById(id) {
  try {
    const respuesta = await fetch(`${URL_API}/${id}`);
    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('load', () => {
  obtenerCarritoLocalStorage(); // Obtener los datos del carrito guardados en el Local Storage al cargar la página
  mostrarProductos();
});

