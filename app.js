class Producto {
    constructor(id, nombre, precio, stock, img, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.alt = alt
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    levantarProductos() {
        this.listaProductos = [
            new Producto(1, "predator white", 19000, 10, "./assets/img/zapatilla1.webp", "zapatillas blancas"),
            new Producto(2, "predator black", 19000, 10, "./assets/img/zapatilla2.webp", "zapatillas negras"),
            new Producto(3, "raptor red", 22000, 10, "./assets/img/zapatilla3.webp", "zapatillas rojas"),
            new Producto(4, "raptor green", 22000, 10, "./assets/img/zapatilla4.webp", "zapatillas verdes"),
            new Producto(5, "raptor grey", 22000, 10, "./assets/img/zapatilla5.webp", "zapatillas grises"),
            new Producto(6, "sirius black", 17000, 10, "./assets/img/zapatilla6.webp", "zapatillas negras"),
            new Producto(7, "sirius white", 17000, 10, "./assets/img/zapatilla7.webp", "zapatillas blanca y negro"),
            new Producto(8, "sirius grey", 17000, 10, "./assets/img/zapatilla8.webp", "zapatillas blanca y gris")
        ]
    }

    mostrarEnDOM() {
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title text-center">${producto.nombre}</h5>
                    <p class="card-text text-center">$${producto.precio}</p>
                    <a href="#" id="zapatilla-${producto.id}" class="btn btn-primary d-flex justify-content-center">Agregar al carrito</a>
                </div>
            </div>`
        })
    }

    darEventoClickAProductos(controladorCarrito) {
        this.listaProductos.forEach(producto => {
            const btnAP = document.getElementById(`zapatilla-${producto.id}`)
            btnAP.addEventListener("click", () => {

                controladorCarrito.agregar(producto)
                controladorCarrito.guardarEnStorage()
                controladorCarrito.mostrarEnDOM(contenedor_carrito)
            })
        })
    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
    }

    agregar(producto) {
        this.listaCarrito.push(producto)
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    verificarExistenciaEnStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if (this.listaCarrito.length > 0) {
            this.mostrarEnDOM()
        }
    }

    limpiarContenedor_Carrito() {
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarEnDOM() {
        this.limpiarContenedor_Carrito()
        this.listaCarrito.forEach(producto => {
            this.contenedor_carrito.innerHTML +=
                `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title text-center mb-4">${producto.nombre}</h5>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        </div>
                    </div>
                </div>
            </div>`
        })
    }
}

const controladorProductos = new ProductoController()

controladorProductos.levantarProductos()

const controladorCarrito = new CarritoController()

controladorCarrito.verificarExistenciaEnStorage()

controladorProductos.mostrarEnDOM()

controladorProductos.darEventoClickAProductos(controladorCarrito)