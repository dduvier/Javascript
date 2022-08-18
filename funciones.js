class producto{
    constructor(id, nombre, precio, descripcion, sintacc, vegetariano, vegano, alcohol){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.sintacc = sintacc;
        this.vegetariano = vegetariano;
        this.vegano = vegano;
        this.alcohol = alcohol;
    }
}

//---------- ARRAYS ----------
const productos = [];
const ordenActual = [];

//---------- Variables Globales ----------
let acceso = false;

//---------- Creacion y carga de primeros productos ----------
const producto01 = new producto(1, "Papas Fritas" , 500);
const producto02 = new producto(2, "Papas Fritas c/Cheddar y panceta", 700);
const producto03 = new producto(3, "Rabas" , 2000);
const producto04 = new producto(4, "Hamburguesa" , 900);
const producto05 = new producto(5, "Hamburguesa Completa" , 1200);
const producto06 = new producto(6, "Tacos" , 1000);
const producto07 = new producto(7, "Empanadas" , 150);
const producto08 = new producto(8, "Pancho" , 600);
const producto09 = new producto(9, "Agua 600cc" , 250);
const producto10 = new producto(10, "Cerveza 500cc" , 450);
const producto11 = new producto(11, "Gaseosa 600cc" , 350);
productos.push(producto01);
productos.push(producto02);
productos.push(producto03);
productos.push(producto04);
productos.push(producto05);
productos.push(producto06);
productos.push(producto07);
productos.push(producto08);
productos.push(producto09);
productos.push(producto10);
productos.push(producto11);

let btnCargarProductos = document.getElementById("btnCargarProductos");
let btnVerPedido = document.getElementById("btnVerPedido");
let btnBorrarOrden = document.getElementById("btnBorrarOrden");
let btnEnviarPedido = document.getElementById("btnEnviarPedido");


//---------- FUNCIONES ----------
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

btnCargarProductos.onclick = () => {
    let entrada;
    let objetoBuscado;
    while(entrada!="ESC"){
        actualizarDom(); 
        entrada = prompt("Ingrese el indice del producto que desea agregar al pedido:" + "\nPara terminar ingrese ESC" + printMenu());
        if(productos.some((index)=>index.id==entrada)){
            objetoBuscado = productos.find((index)=>index.id==entrada);
            ordenActual.push(objetoBuscado);
            alert("Se agrego 1 x " + objetoBuscado.nombre + " a su pedido!");
        }
        else if(entrada == null){
            entrada = "ESC";
        }
        else if(entrada!="ESC"){
            alert("ERROR - Opcion invalida! \nPara salir ingrese con su teclado: ESC");
        }
    }
    actualizarListaMenu();
}

btnVerPedido.onclick = () => {
    let precioTotal;
    let pedidoMostrar = [];
    precioTotal = ordenActual.reduce((acumulador,precioObjeto)=>acumulador+precioObjeto.precio,0);
    pedidoMostrar = ordenActual.map((objetoOrdenActual)=>(`${objetoOrdenActual.nombre} $${objetoOrdenActual.precio}\n`));
    alert("Pedido:\n" + printOrden() + "\nPrecio Total: $" + precioTotal);
}

btnBorrarOrden.onclick = () => {
    let confirmacion;
    confirmacion = confirm("Desea borrar el pedido?");
    if(confirmacion){
        ordenActual.splice(0, ordenActual.length);
        alert("Su pedido ha sido borrado!");
    }
    else{
        alert("Accion CANCELADA!");
    }
    actualizarDom();
    actualizarListaMenu();
}

btnEnviarPedido.onclick = () => {
    let confirmacion;
    confirmacion = confirm("Desea enviar el pedido?");
    if(confirmacion){
        ordenActual.splice(0, ordenActual.length);
        alert("Su pedido ha sido enviado!");
    }
    else{
        alert("Accion CANCELADA!");
    }
    actualizarDom();
    actualizarListaMenu();
}

function actualizarDom(){
    let precioTotalObj;
    let itemsCarritoObj;
    let precioTotalTemp;
    let itemsCarritoTemp;
    precioTotalTemp = ordenActual.reduce((acumulador,precioObjeto)=>acumulador+precioObjeto.precio,0);
    itemsCarritoTemp = ordenActual.length;
    precioTotalObj = document.getElementById("precioFinal");
    itemsCarritoObj = document.getElementById("itemsCarrito");
    precioTotalObj.innerText = precioTotalTemp;
    itemsCarritoObj.innerText = itemsCarritoTemp;
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

