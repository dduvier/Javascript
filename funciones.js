//---------- ARRAYS --------------------------------------------------------------------
let ordenActual = [];
let ordenActualString;

//---------- Variables Globales --------------------------------------------------------
let acceso = false;

//--------------- NODOS ----------------------------------------------------------------
const btnCardId = document.getElementById("btnCardId");
const seccionMenu = document.getElementById("menu");
const carritoModal = document.getElementById("productosEnCarrito");


//---------- FUNCIONES ----------------------------------------------------------------
function printMenu(){
    let menuObj = "\n\n";
    for(const productoTemp of productos){
        menuObj = menuObj + productoTemp.id + " - " + productoTemp.nombre + " - $" + productoTemp.precio + "\n";
    }
    return menuObj;
}

function printOrden(){
    let ordenObj = "";
    for(const productoTemp of ordenActual){
        ordenObj = ordenObj + productoTemp.nombre + " - $" + productoTemp.precio + "\n";
    }
    return ordenObj;
}

function precioParcial(objeto){
    objeto.precioSemi = objeto.precio * objeto.cantidad;
}

function actualizarDom(){
    let precioTotalObj;
    let precioTotalObj2;
    let itemsCarritoObj;
    let itemsCarritoObj2;
    let precioTotalTemp;
    let itemsCarritoTemp;
    ordenActual.forEach(element => {
        precioParcial(element);
    });
    precioTotalTemp = ordenActual.reduce((acumulador,precioObjeto)=>acumulador+precioObjeto.precioSemi,0);
    itemsCarritoTemp = ordenActual.reduce((acumulador,cantidadObjeto)=>acumulador+cantidadObjeto.cantidad,0);
    precioTotalObj = document.getElementById("precioFinal");
    precioTotalObj2 = document.getElementById("precioFinal2");
    itemsCarritoObj = document.getElementById("itemsCarrito");
    itemsCarritoObj2 = document.getElementById("itemsCarrito2");
    precioTotalObj.innerText = precioTotalTemp;
    precioTotalObj2.innerText = precioTotalTemp;
    itemsCarritoObj.innerText = itemsCarritoTemp;
    itemsCarritoObj2.innerText = itemsCarritoTemp;
}

function actualizarListaMenu(){
    let padre;
    let titulo;
    padre = document.getElementById("listaProductos");
    titulo = document.createElement("h3");
    titulo.innerHTML = "Listado del carrito: \n";
    padre.innerHTML = "";
    padre.appendChild(titulo);
    for(const producto of ordenActual){
        let listItem;
        let stringObj;
        listItem = document.createElement("li");
        stringObj = "Producto: " + producto.nombre + "  -  Precio: " + producto.precio;
        listItem.innerText = stringObj;
        padre.appendChild(listItem);
    }
}

//Agrega el producto al array ordenActual con push (mi pedido)
function agregarCarrito(prodTemp){
    let objetoBuscado;
    if(productos.some((index)=>index.id==prodTemp.id)){
        let existeEnOrden;
        existeEnOrden = ordenActual.find( (index)=>index.id == prodTemp.id);
        if(!existeEnOrden){
            objetoBuscado = productos.find((index)=>index.id == prodTemp.id);
            if(prodTemp.cantidad){
                objetoBuscado.cantidad = prodTemp.cantidad;
            }else{
                objetoBuscado.cantidad = 1;
            }
            ordenActual.push(objetoBuscado);
            mostrarCarrito(prodTemp);
        }
        else{
            console.log("Ya esta en el carrito");
            objetoBuscado = productos.find((index)=>index.id == prodTemp.id);
            objetoBuscado.cantidad = objetoBuscado.cantidad + 1;
            ordenActual = ordenActual.filter( prod => prod.id !== prodTemp.id);
            ordenActual.push(objetoBuscado);
            const variableAux = document.getElementById(`cantidad${existeEnOrden.cantidad-1}${existeEnOrden.nombre}`);
            variableAux.innerHTML = `<p id="cantidad${existeEnOrden.cantidad}${existeEnOrden.nombre}"> Cant.: ${existeEnOrden.cantidad}</p>`;
        }
    }
    else{
        alert("ERROR - No se agrego el producto!");
    }
    actualizarListaMenu();
    actualizarDom();
    guardarOrdenLocalStorage();
    console.log("Prod: "+ objetoBuscado.nombre + "\nCantidad: " + objetoBuscado.cantidad);
    
}

//Agrega el "div" del producto al MODAL del Carrito
function mostrarCarrito(productoTemp){

            let div = document.createElement("div");
            div.className = "productoEnCarrito";
            div.innerHTML = `
                                <div class="modal-body">
                                    <p class="modalTituloProducto">${productoTemp.nombre}</p>
                                    <p> Precio(unid): $${productoTemp.precio}</p>
                                    <p id="cantidad${productoTemp.cantidad}${productoTemp.nombre}"> Cant.: ${productoTemp.cantidad}</p>
                                    <button class="productoEliminar" id="eliminarProducto${productoTemp.id}" >X1</button>
                                </div>
                            `
            carritoModal.appendChild(div);

        let btnEliminar = document.getElementById(`eliminarProducto${productoTemp.id}`);
        btnEliminar.addEventListener("click", ()=>{
            ordenActual = ordenActual.filter( prod => prod.id !== productoTemp.id);
            btnEliminar.parentElement.remove();
            actualizarListaMenu();
            actualizarDom();
            guardarOrdenLocalStorage();
        });
}

//Imprime CARDs y escucha clicks para agregarCarrito() y mostrarCarrito()
function mostrarProductos(){
    productos.forEach(prod => {
        let div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
                            <div class="card" style="width: 18rem;">
                                <img src="" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${prod.nombre}</h5>
                                    <p class="card-text">${prod.descripcion}</p>
                                    <h6>$${prod.precio}</h6>
                                    <a href="#" class="btn btn-primary btnCard" id="btnCardId${prod.id}" >Agregar</a>
                                </div>
                            </div>
                        `
        seccionMenu.appendChild(div);
        let btnClickeado = document.getElementById(`btnCardId${prod.id}`);
        btnClickeado.addEventListener("click", ()=>{console.log(prod.id);});
        btnClickeado.addEventListener("click", ()=>{agregarCarrito(prod);});
        actualizarListaMenu();
        actualizarDom();
    })
}

//Funcion guardar local
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Guarda OrdenActual en local storage
function guardarOrdenLocalStorage(){
    guardarLocal("ordenActualLocalStorage",JSON.stringify(ordenActual));
}

function leerOrdenLocalStorage(){
    const ordenGuardada = JSON.parse(localStorage.getItem("ordenActualLocalStorage"));
    if(ordenGuardada){
        for(const obj of ordenGuardada){
            const objTemp = new producto;
            objTemp.id = obj.id;
            objTemp.nombre = obj.nombre;
            objTemp.precio = obj.precio;
            objTemp.cantidad = obj.cantidad;
            objTemp.precioSemi = obj.precioSemi;
            agregarCarrito(objTemp);
            actualizarDom();
            actualizarListaMenu();
        }
    }
}

//FUNCION PRINCIPAL-----------------------------------------------------------
leerOrdenLocalStorage();
mostrarProductos();