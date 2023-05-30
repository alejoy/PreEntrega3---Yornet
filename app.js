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
      productos.push(producto);
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
    mostrarTotal();
  } else {
    contenedorCarrito.style.display = 'none';
  }
}

function mostrarTotal() {
  const total = carrito.reduce((accumulator, producto) => accumulator + producto.price, 0);
  const elementoTotal = document.querySelector('#total');
  if (elementoTotal !== null) {
    elementoTotal.textContent = `$${totalCarrito.toFixed(2)}`;
  }
}

function mostrarCarrito() {
  const tbodyCarrito = document.querySelector('#tbodyCarrito');
  const filaTotal = document.querySelector('#filaTotal');
  const totalCarritoElemento = document.querySelector('#totalCarrito');
  if (tbodyCarrito !== null) {
    tbodyCarrito.innerHTML = '';
  }

  let totalCarrito = 0;

  carrito.forEach(producto => {
    const fila = document.createElement('tr');

    const columnaProducto = document.createElement('td');
    columnaProducto.textContent = producto.title;
    fila.appendChild(columnaProducto);

    const columnaPrecio = document.createElement('td');
    columnaPrecio.textContent = `$${producto.price}`;
    fila.appendChild(columnaPrecio);

    const columnaTotal = document.createElement('td');
    columnaTotal.textContent = `$${producto.price}`;
    fila.appendChild(columnaTotal);

    const columnaEliminar = document.createElement('td');
    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('boton-eliminar');
    botonEliminar.setAttribute('data-id', producto.id);
    botonEliminar.textContent = 'Eliminar';
    columnaEliminar.appendChild(botonEliminar);
    fila.appendChild(columnaEliminar);

    tbodyCarrito.appendChild(fila);

    totalCarrito += producto.price;
  });

  totalCarritoElemento.textContent = `$${totalCarrito.toFixed(2)}`;

  // Mostrar la fila total solo si hay productos en el carrito
  if (filaTotal !== null) {
    filaTotal.style.display = carrito.length > 0 ? 'table-row' : 'none';
  }

  // Agregar eventos de clic a los botones de eliminar
  const botonesEliminar = document.querySelectorAll('.boton-eliminar');
  botonesEliminar.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.getAttribute('data-id');
      eliminarProducto(id);
    });
  });
}

// Guardar los datos del carrito en el Local Storage
function guardarCarritoLocalStorage() {
  const carritoJSON = JSON.stringify(carrito);
  localStorage.setItem('carrito', carritoJSON);
}

// Obtener los datos del carrito guardados en el Local Storage al cargar la página
function obtenerCarritoLocalStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    carrito = JSON.parse(carritoJSON);
  }
}

const botonVaciarCarrito = document.querySelector('.boton-vaciar');
botonVaciarCarrito.addEventListener('click', vaciarCarrito);

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
  guardarCarritoLocalStorage(); // Guardar los datos del carrito vacío en el Local Storage
  const tbodyCarrito = document.querySelector('#tbodyCarrito');
    if (tbodyCarrito !== null) {
    tbodyCarrito.innerHTML = '';
    }
  contenedorCarrito.style.display = 'none';
}

function eliminarProducto(id) {
  const indice = carrito.findIndex(producto => producto.id === Number(id));

  if (indice !== -1) {
    // Eliminar el producto del array carrito
    carrito.splice(indice, 1);
    console.log(carrito);
    // Actualizar el carrito en el Local Storage
    guardarCarritoLocalStorage();
    mostrarCarrito();
  }
}

contenedorProductos.addEventListener('click', async(event) => {
  if (event.target.classList.contains('boton-agregar')) {
    const idProducto = event.target.getAttribute('data-id');
    const producto = await getProductById(idProducto);
    agregarAlCarrito(producto);
  }

  if (event.target.id === 'carrito') {
    mostrarCarrito();
  }
});

contenedorCarrito.addEventListener('click', (event) => {
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
  
  if (carrito.length > 0) {
    contenedorCarrito.style.display = 'block';
    mostrarCarrito();
    mostrarTotal();
  }

  actualizarCarrito(); // Actualizar el contador del carrito al cargar la página

});

document.getElementById('formularioContacto').addEventListener('submit', function (event) {
  event.preventDefault(); 

  // Mostrar el modal de confirmación
  $('#modalConfirmacion').modal('show');
});

// Agregar evento de clic al botón "Comprar"
const botonComprar = document.querySelector('.boton-comprar');
botonComprar.addEventListener('click', mostrarModalComprar);

// Función para mostrar el modal de compra
function mostrarModalComprar() {
  const listaProductosElemento = document.querySelector('#listaProductos');
  listaProductosElemento.innerHTML = '';
  carrito.forEach(producto => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = producto.title;
    listaProductosElemento.appendChild(li);
  });

  $('#modalComprar').modal('show');
}

// Agregar evento de clic al botón "Confirmar Compra" del modal
const botonConfirmarCompra = document.querySelector('#modalComprar .btn-primary');
botonConfirmarCompra.addEventListener('click', confirmarCompra);

// Función para confirmar la compra
function confirmarCompra() {
  const mensajeCompra = document.querySelector('#modalMensaje .mensaje-compra');
  mensajeCompra.textContent = 'Gracias por su compra';

  $('#modalComprar').modal('hide');
  $('#modalMensaje').modal('show');

  // Ocultar el modal después de 3 segundos
  setTimeout(() => {
    $('#modalMensaje').modal('hide');
    mensajeCompra.textContent = '';
  }, 3000);

  carrito = [];
  actualizarCarrito();
  guardarCarritoLocalStorage();
}


