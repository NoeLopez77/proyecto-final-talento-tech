
console.log("productos");

const productos = [
    {
        id: 1,
        nombre: "Esmaltes",
        precio: 5500,
        imagen: "img/esmaltes.jpg"
    },
    {
        id: 2,
        nombre: "esmaltes2",
        precio: 38000,
        imagen: "img/esmaltes2.jpg"
    },
    {
        id: 3,
        nombre: "cabinas",
        precio: 44200,
        imagen: "img/cabina led.jpg"
    },
    {
        id: 4,
        nombre: "cabina 2",
        precio: 32800,
        imagen: "img/cabina led2.jpg"
    },
    {
        id: 5,
        nombre: "cabina 3",
        precio: 48900,
        imagen: "img/cabina led3.jpg"
    },
    {
        id: 6,
        nombre: "press on francesitas",
        precio: 10000,
        imagen: "img/francesita con diseño.jpg"
    },
    {
        id: 7,
        nombre: "mundialistas",
        precio: 14000,
        imagen: "img/mundialistas.jpg"
    },
    {
        id: 8,
        nombre: "tendencia",
        precio: 20000,
        imagen: "img/tendencia.jpg"
    },
    {
        id: 9,
        nombre: "dark cute",
        precio: 8900,
        imagen: "img/darks.jpg"
    },
    {
        id: 10,
        nombre: "coquette",
        precio: 8900,
        imagen: "img/coquette.jpg"
    },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const itemsCarrito = document.getElementById("items-carrito");
const total = document.getElementById("total");
const cantidad = document.getElementById("cantidad-carrito");


function mostrarProductos() {

    listaProductos.innerHTML = "";

    productos.forEach(producto => {

        listaProductos.innerHTML += `
        <div class="producto">

            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>$${producto.precio}</p>

            <button onclick="agregarCarrito(${producto.id})">
                Agregar al carrito
            </button>

        </div>
        `;
    });

}

// =======================
// AGREGAR
// =======================

function agregarCarrito(id){

    const existe = carrito.find(item => item.id === id);

    if(existe){

        existe.cantidad++;

    }else{

        const producto = productos.find(p => p.id === id);

        carrito.push({
            ...producto,
            cantidad:1
        });

    }

    guardarCarrito();
    actualizarCarrito();

}

// =======================
// ACTUALIZAR
// =======================

function actualizarCarrito(){

    itemsCarrito.innerHTML="";

    let suma=0;

    carrito.forEach(producto=>{

        suma += producto.precio * producto.cantidad;

        itemsCarrito.innerHTML += `

        <div class="item-carrito">

            <h4>${producto.nombre}</h4>

            <p>Cantidad: ${producto.cantidad}</p>

            <p>$${producto.precio * producto.cantidad}</p>

            <button onclick="sumar(${producto.id})">+</button>

            <button onclick="restar(${producto.id})">-</button>

            <button onclick="eliminar(${producto.id})">
            Eliminar
            </button>

        </div>

        <hr>

        `;

    });

    total.textContent = suma;

    cantidad.textContent = carrito.reduce(
        (acc,item)=>acc+item.cantidad,0
    );

}

// =======================
// SUMAR
// =======================

function sumar(id){

    carrito.find(p=>p.id===id).cantidad++;

    guardarCarrito();

    actualizarCarrito();

}

// =======================
// RESTAR
// =======================

function restar(id){

    const producto = carrito.find(p=>p.id===id);

    producto.cantidad--;

    if(producto.cantidad<=0){

        carrito = carrito.filter(p=>p.id!==id);

    }

    guardarCarrito();

    actualizarCarrito();

}

// =======================
// ELIMINAR
// =======================

function eliminar(id){

    carrito = carrito.filter(p=>p.id!==id);

    guardarCarrito();

    actualizarCarrito();

}

// =======================
// LOCAL STORAGE
// =======================

function guardarCarrito(){

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

}

// =======================
// BOTONES
// =======================

document.getElementById("vaciar").addEventListener("click",()=>{

    carrito=[];

    guardarCarrito();

    actualizarCarrito();

});

document.getElementById("comprar").addEventListener("click",()=>{

    if(carrito.length===0){

        alert("El carrito está vacío.");

        return;

    }

    alert("¡Gracias por comprar en Fairy Nails by Valu!");

    carrito=[];

    guardarCarrito();

    actualizarCarrito();

});

// El carrito se guarda en localStorage

window.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});