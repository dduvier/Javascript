//---------- ARRAYS --------------------------------------------------------------------
let ordenActual = [];
let ordenActualString;

//---------- Variables Globales --------------------------------------------------------
let primerAcceso = true;

//--------------- NODOS ----------------------------------------------------------------
const btnCardId = document.getElementById("btnCardId");
const seccionMenu = document.getElementById("menu");
const carritoModal = document.getElementById("productosEnCarrito");


//---------- FUNCIONES ----------------------------------------------------------------
//funcion que calcula el precio por la cantidad de producto y lo escribe en el precio parcial del objeto (precioSemi)
function precioParcial(objeto){
    objeto.precioSemi = objeto.precio * objeto.cantidad;
}

//Actualiza el precio final y cantidad de items del carrito
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
        if(!primerAcceso){
            swal({
                title: "Producto Agregado!",
                text: `Se agrego ${objetoBuscado.nombre} al carrito`,
                icon: "success",
                button: "OK",
              });
        }
    }
    else{
        alert("ERROR - No se agrego el producto!");
    }
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
            let objetoBuscado;
            objetoBuscado = productos.find((index)=>index.id == productoTemp.id);
            if(productoTemp.cantidad == 1){
                productoTemp.cantidad = 0;
                objetoBuscado.cantidad = 0;
                ordenActual = ordenActual.filter( prod => prod.id !== productoTemp.id);
                btnEliminar.parentElement.remove();
            }
            if(productoTemp.cantidad > 1){
                ordenActual = ordenActual.filter( prod => prod.id !== productoTemp.id);
                productoTemp.cantidad = productoTemp.cantidad - 1;

                ordenActual.push(productoTemp);
                const variableAux = document.getElementById(`cantidad${productoTemp.cantidad+1}${productoTemp.nombre}`);
                const variableAux2 = document.getElementById(`cantidad${productoTemp.cantidad}${productoTemp.nombre}`);
                if(variableAux2){
                    if(variableAux){
                        variableAux.remove();
                    }
                    variableAux2.innerText = `Cant.: ${productoTemp.cantidad}`;
                }
                else{
                    variableAux.innerHTML = `<p id="cantidad${productoTemp.cantidad}${productoTemp.nombre}"> Cant.: ${productoTemp.cantidad}</p>`;
                }
            }
            swal({
                title: "Producto borrado!",
                text: `Se borro una unidad de ${productoTemp.nombre} del carrito`,
                icon: "warning",
                button: "OK",
              });
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
        btnClickeado.addEventListener("click", ()=>{agregarCarrito(prod);});
        actualizarDom();
    })
}

//Funcion guardar local
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Guarda OrdenActual en local storage
function guardarOrdenLocalStorage(){
    guardarLocal("ordenActualLocalStorage",JSON.stringify(ordenActual));
}


//Funcion que lee si hay una orden guardada en el Local Storage y la trae a la orden actual
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
        }
    }
    primerAcceso = false;
}

//FUNCION PRINCIPAL-----------------------------------------------------------
leerOrdenLocalStorage();
mostrarProductos();