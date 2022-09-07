
//--------------- NODOS ----------------------------------------------------------------
const btnCardId = document.getElementById("btnCardId");
const seccionMenu = document.getElementById("menu");
const carritoModal = document.getElementById("productosEnCarrito");
const carritoModalHistorico = document.getElementById("productosEnCarritoHistorico");
const btnCerrarMesa = document.getElementById("cerrarMesa");
const btnEnviarOrden = document.getElementById("enviarOrden");
const btnHistoricoOrden = document.getElementById("HistoricoOrden");
const btnPedirCuenta = document.getElementById("pedirCuenta");

//---------- FUNCIONES ----------------------------------------------------------------
//funcion que calcula el precio por la cantidad de producto y lo escribe en el precio parcial del objeto (precioSemi)
function precioParcial(objeto){
    objeto.precioSemi = objeto.precio * objeto.cantidad;
}

//Actualiza el precio final y cantidad de items del carrito
function actualizarDom(){
    let precioTotalObj2;
    let itemsCarritoObj2;
    let precioTotalTemp;
    let itemsCarritoTemp;
    ordenActual.forEach(element => {
        precioParcial(element);
    });
    precioTotalTemp = ordenActual.reduce((acumulador,precioObjeto)=>acumulador+precioObjeto.precioSemi,0);
    itemsCarritoTemp = ordenActual.reduce((acumulador,cantidadObjeto)=>acumulador+cantidadObjeto.cantidad,0);
    precioTotalObj2 = document.getElementById("precioFinal2");
    itemsCarritoObj2 = document.getElementById("itemsCarrito2");
    precioTotalObj2.innerText = precioTotalTemp;
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
            swal({
                title: `Desea borrar una unidad de ${productoTemp.nombre}?`,
                text: `Se borrara solo una unidad de ${productoTemp.nombre} de su orden`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
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
                    actualizarDom();
                    guardarOrdenLocalStorage();
                    swal(`Se borró una unidad de ${productoTemp.nombre} de su orden`, {
                    icon: "success",
                  });
                } else {
                  swal("Operacion de borrado Cancelada");
                }
              });
        });
}

//Agrega el "div" del producto al MODAL del Carrito Historico
function mostrarCarritoHistorico(productoTemp){

    let div = document.createElement("div");
    div.className = "productoEnCarritoHistorico";
    div.innerHTML = `
                        <div class="modal-body modal-body-historico">
                            <p class="modalTituloProducto">${productoTemp.nombre}</p>
                            <p> Precio(unid): $${productoTemp.precio}</p>
                            <p id="cantidad${productoTemp.cantidad}${productoTemp.nombre}H"> Cant.: ${productoTemp.cantidad}</p>
                        </div>
                    `
    carritoModalHistorico.appendChild(div);
    actualizarDom();
    if(primerAcceso){
        ordenHistorico.push(productoTemp);
    }
    //guardarOrdenHistoricaLocalStorage();
}

//Imprime CARDs y escucha clicks para agregarCarrito() y mostrarCarrito()
function mostrarProductos(){
    productos.forEach(prod => {
        let div = document.createElement("div");
        div.className = "producto";
        div.innerHTML = `
                            <div class="card" style="width: 18rem;">
                                <img src="${prod.img}" class="card-img-top" alt="">
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

//Funcion que envia la orden al sector cocina, y mueve la orden actual al historico
function enviarOrden(){
    ordenActual.forEach( (prodTemp) => {
        //ordenHistorico.push(prodTemp);
        let objetoBuscado;
        let existeEnOrden;
        existeEnOrden = ordenHistorico.find( (index)=>index.id == prodTemp.id);
        if(!existeEnOrden){
            objetoBuscado = productos.find((index)=>index.id == prodTemp.id);
            if(prodTemp.cantidad){
                objetoBuscado.cantidad = prodTemp.cantidad;
            }else{
                objetoBuscado.cantidad = 1;
            }
            ordenHistorico.push(objetoBuscado);
            mostrarCarritoHistorico(prodTemp);
        }
        else{
            console.log("Ya esta en el Historial");
            objetoBuscado = ordenHistorico.find((index)=>index.id == prodTemp.id);
            objetoBuscado.cantidad = objetoBuscado.cantidad + 1;
            precioParcial(objetoBuscado);
            ordenHistorico = ordenHistorico.filter( prod => prod.id !== prodTemp.id);
            ordenHistorico.push(objetoBuscado);
            const variableAux = document.getElementById(`cantidad${objetoBuscado.cantidad-1}${objetoBuscado.nombre}H`);
            variableAux.innerHTML = `<p id="cantidad${objetoBuscado.cantidad}${objetoBuscado.nombre}H"> Cant.: ${objetoBuscado.cantidad}</p>`;
        }
    precioParcial(prodTemp);
    } );
    ordenActual.splice(0,ordenActual.length);
    guardarOrdenHistoricaLocalStorage();
    guardarOrdenLocalStorage();
    actualizarDom();
}



//FUNCION PRINCIPAL-----------------------------------------------------------
leerOrdenLocalStorage();
leerOrdenHistoricaLocalStorage();
primerAcceso = false;
mostrarProductos();
btnCerrarMesa.addEventListener("click", ()=> {
    swal({
        title: "Cerrar mesa?",
        text: "Si cierra la mesa, se perdera la orden actual y el historial de ordenes",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            logOut();
            swal("Su mesa fue cerrada", {
                icon: "success",
            });
            window.location = "../index.html";
        } 
    });
});

btnEnviarOrden.addEventListener("click", ()=>{
    swal({
        title: "Enviar Orden?",
        text: "Confirma el envio del pedido a la cocina para su preparacion?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete){
            enviarOrden();
            swal("Su pedido fue enviado!", {
                icon: "success",
            });
        } 
        else{
            swal("NO se envio el pedido..");
        }
    });
});