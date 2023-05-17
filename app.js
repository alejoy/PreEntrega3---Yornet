//const carrito = [];

/* let elemento

elemento= document
elemento = document.head
elemento = document.body
elemento = document.forms
elemento = document.scripts
elemento = document.images

console.log(elemento) */

// METODO TRADICIONAL => id, class, tags

/* const navbar = document.getElementsByClassName("navbar") 
const contenedor = document.getElementsByClassName("container")
const inputNombre = document.getElementById("inputName")
const formulario = document.getElementsByTagName("form")

console.log(formulario) */

// METODO MODERNO => id, class, tags

/* const navbar = document.querySelector(".navbar")
const contenedor = document.querySelectorAll(".container")
const inputNombre = document.querySelector("#inputName")
const formulario = document.querySelector("form")
console.log(formulario) */

/* const encabezado = document.querySelector("h2").textContent= "Nuevo encabezado desde Javascript"
console.log(encabezado) */

// Eliminar un elemento del DOM

/* const textDelete = document.querySelector("h5")
textDelete.remove()

console.log(textDelete) */

// Agregar elementos en el DOM

/* const textAdded = document.createElement("h5")
textAdded.innerHTML = "<h5>Texto agregado</h5>"
document.body.appendChild(textAdded)

console.log(textAdded) */

/* const listaVacia = document.querySelector(".lista-vacia")

let otrosCursos=["Desarrollo Web","Javascript","ReactJs","NodeJs"]

for (let curso of otrosCursos){
    let listado = document.createElement("li")
    listado.innerHTML= curso
    listaVacia.appendChild(listado)
}

console.log(listaVacia) */

/* let cursos = [
    {id:1 , titulo:"Desarrollo Web" , precio:1000},
    {id:2 , titulo: "Javascript (con carpi y el tio Omar)" , precio:9000},
    {id:3 , titulo:"React Js(Omar)" , precio: 1000},
    {id:4 , titulo: "Node Js", precio: 6000}
]

function agregarAlCarrito(producto) {
    // Primero, verificamos si el producto ya está en el carrito
    if (carrito.includes(producto)) {
      console.log('El producto ya está en el carrito.');
    } else {
      // Si el producto no está en el carrito, lo agregamos
      carrito.push(producto);
      console.log('Producto agregado al carrito:', producto);
    }
  }

  function quitarDelCarrito(producto) {
    // Buscamos el elemento del carrito correspondiente al producto
    const itemCarrito = document.querySelector(`[data-producto="${producto}"]`);
    
    // Si el elemento existe, lo eliminamos del carrito
    if (itemCarrito) {
      itemCarrito.remove();
      console.log(`Producto ${producto} eliminado del carrito.`);
    } else {
      console.log(`El producto ${producto} no se encontró en el carrito.`);
    }
  }

  function vaciarCarrito() {
    // Buscamos todos los elementos del carrito
    const itemsCarrito = document.querySelectorAll('.item-carrito');
  
    // Iteramos sobre todos los elementos y los eliminamos del carrito
    itemsCarrito.forEach(item => {
      item.remove();
    });
  
    console.log('Carrito vaciado.');
  }

for (let curso of cursos){
    let contenedor = document.createElement("div")
    contenedor.innerHTML=
    `

    <div class="card border-dark mb-3" style="max-width: 20rem;">
    <div class="card-header">${curso.titulo}</div>
    <div class="card-body">
        <p class="card-text"> $ ${curso.precio}</p>
            <button type="button" class="btn btn-dark">Agregar al carrito</button>
        </div>
    </div>

    
    `

    document.body.appendChild(contenedor)
} */

const URL_API = 'https://fakestoreapi.com/products';
const contenedorProductos = document.querySelector('#productos');
const carritoElemento = document.querySelector('#carrito');
const contadorCarrito = document.querySelector('#contadorCarrito');
const contenedorCarrito = document.querySelector('#contenedorCarrito');
let carrito = [];

async function mostrarProductos() {
  try {
    const respuesta = await fetch(URL_API);
    const productos = await respuesta.json();
    let html = '';

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

function agregarAlCarrito(producto) {
  if (carrito.includes(producto)) {
    console.log('El producto ya está en el carrito.');
  } else {
    carrito.push(producto);
    actualizarCarrito();
    console.log('Producto agregado al carrito:', producto);
  }
}

function actualizarCarrito() {
  contadorCarrito.textContent = carrito.length;
}

function mostrarCarrito() {
  let html = '';

  carrito.forEach(producto => {
    html += `
      <div class="item-carrito">
        <h3>${producto.title}</h3>
        <p>$${producto.price}</p>
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

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
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

mostrarProductos();

// Añadir esta función para eliminar un producto del carrito
function eliminarDelCarrito(producto) {
    const index = carrito.indexOf(producto);
    if (index > -1) {
      carrito.splice(index, 1);
      actualizarCarrito();
      console.log('Producto eliminado del carrito:', producto);
      mostrarCarrito(); // Actualizar la vista del carrito después de eliminar un producto
    }
  }
  
  contenedorCarrito.addEventListener('click', (event) => {
    if (event.target.classList.contains('boton-vaciar')) {
      vaciarCarrito();
    }
  
    if (event.target.classList.contains('boton-eliminar')) {
      const idProducto = event.target.getAttribute('data-id');
      const producto = getProductById(idProducto);
      eliminarDelCarrito(producto);
    }
  });
  
