class producto{
    constructor( nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }

}

const producto01 = new producto("Papas Fritas" , 500);
const producto03 = new producto("Papas Fritas c/Cheddar y panceta", 700);
const producto02 = new producto("Rabas" , 2000);
const producto04 = new producto("Hamburguesa" , 900);
const producto05 = new producto("Hamburguesa Completa" , 1200);
const producto06 = new producto("Tacos" , 1000);
const producto07 = new producto("Empanadas" , 150);
const producto08 = new producto("Pancho" , 600);
const producto09 = new producto("Agua 600cc" , 250);
const producto10 = new producto("Cerveza 500cc" , 450);
const producto11 = new producto("Gaseosa 600cc" , 350);


let precioTotal=0;
let pedido="";
let menu;
menu = "\n\nLista de productos: \n\n" +
        "1 - " + producto01.nombre + " --> Precio: $" + producto01.precio + "\n" +
        "2 - " + producto02.nombre + " --> Precio: $" + producto02.precio + "\n" +
        "3 - " + producto03.nombre + " --> Precio: $" + producto03.precio + "\n" +
        "4 - " + producto04.nombre + " --> Precio: $" + producto04.precio + "\n" +
        "5 - " + producto05.nombre + " --> Precio: $" + producto05.precio + "\n" +
        "6 - " + producto06.nombre + " --> Precio: $" + producto06.precio + "\n" +
        "7 - " + producto07.nombre + " --> Precio: $" + producto07.precio + "\n" +
        "8 - " + producto08.nombre + " --> Precio: $" + producto08.precio + "\n" +
        "9 - " + producto09.nombre + " --> Precio: $" + producto09.precio + "\n" +
        "10 - " + producto10.nombre + " --> Precio: $" + producto10.precio + "\n" +
        "11 - " + producto11.nombre + " --> Precio: $" + producto11.precio + "\n\n";


function cargarProductos(){
    let entrada;
    while(entrada!="ESC"){
        entrada = prompt("Ingrese el indice del producto que desea agregar al pedido:" + "\nPara terminar ingrese ESC" + menu);
        switch(entrada){
            case "1":
                precioTotal = precioTotal + producto01.precio;
                pedido = pedido + "\n" + producto01.nombre;
                alert("Se agrego 1 x " + producto01.nombre + " a su pedido!");
                break;
            case "2":
                precioTotal = precioTotal + producto02.precio;
                pedido = pedido + "\n" + producto02.nombre;
                alert("Se agrego 1 x " + producto02.nombre + " a su pedido!");
                break;
            case "3":
                precioTotal = precioTotal + producto03.precio;
                pedido = pedido + "\n" + producto03.nombre;
                alert("Se agrego 1 x " + producto03.nombre + " a su pedido!");
                break;
            case "4":
                precioTotal = precioTotal + producto04.precio;
                pedido = pedido + "\n" + producto04.nombre;
                alert("Se agrego 1 x " + producto04.nombre + " a su pedido!");
                break;
            case "5":
                precioTotal = precioTotal + producto05.precio;
                pedido = pedido + "\n" + producto05.nombre;
                alert("Se agrego 1 x " + producto05.nombre + " a su pedido!");
                break;
            case "6":
                precioTotal = precioTotal + producto06.precio;
                pedido = pedido + "\n" + producto06.nombre;
                alert("Se agrego 1 x " + producto06.nombre + " a su pedido!");
                break;
            case "7":
                precioTotal = precioTotal + producto07.precio;
                pedido = pedido + "\n" + producto07.nombre;
                alert("Se agrego 1 x " + producto07.nombre + " a su pedido!");
                break;
            case "8":
                precioTotal = precioTotal + producto08.precio;
                pedido = pedido + "\n" + producto08.nombre;
                alert("Se agrego 1 x " + producto08.nombre + " a su pedido!");
                break;
            case "9":
                precioTotal = precioTotal + producto09.precio;
                pedido = pedido + "\n" + producto09.nombre;
                alert("Se agrego 1 x " + producto09.nombre + " a su pedido!");
                break;
            case "10":
                precioTotal = precioTotal + producto10.precio;
                pedido = pedido + "\n" + producto10.nombre;
                alert("Se agrego 1 x " + producto10.nombre + " a su pedido!");
                break;
            case "11":
                precioTotal = precioTotal + producto11.precio;
                pedido = pedido + "\n" + producto11.nombre;
                alert("Se agrego 1 x " + producto11.nombre + " a su pedido!");
                break;
            case "ESC":
                break;
            default:
                alert("ERROR - Opcion invalida! \nPara salir ingrese con su teclado las letras ESC");
                break;
        }
    }
}

function verOrden(){
    alert("Precio Total: $" + precioTotal + "\n\nPedido:" + pedido);
}

function borrarOrden(){
    let confirmacion;
    confirmacion = confirm("Desea borrar el pedido?");
    if(confirmacion){
        precioTotal = 0;
        pedido = "";
        alert("Su pedido ha sido borrado!");
    }
    else{
        alert("Accion CANCELADA!");
    }
}

function enviarOrden(){
    let confirmacion;
    confirmacion = confirm("Desea enviar el pedido?");
    if(confirmacion){
        alert("Su pedido ha sido enviado!!" + "\n\nPrecio Final: $" + precioTotal + "\n\nGracias!!");
        precioTotal = 0;
        pedido = "";
    }
    else{
        alert("Accion CANCELADA!");
    }
}
