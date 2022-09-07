//---------- Variables Globales --------------------------------------------------------
let primerAcceso = true;
let accesoPermitido = false;
let mesaId;

//---------- Arrays Globales ----------------------------------------------------------
let ordenActual = [];
let ordenHistorico = [];
let ordenActualString;
const productos = [];
const usuarios = [];

//---------- Funciones Globales --------------------------------------------------------
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

//Guarda Mesa y acceso en local storage
function guardarMesaLocalStorage(){
    guardarLocal("Mesa",JSON.stringify(mesaId));
    guardarLocal("Acceso",JSON.stringify(accesoPermitido));
}

//Guarda OrdenActual en local storage
function leerMesaLocalStorage(){
    let mesaGuardada;
    let accesoGuardado;
    mesaGuardada = JSON.parse(localStorage.getItem("Mesa"));
    accesoGuardado = JSON.parse(localStorage.getItem("Acceso"));
    if(accesoGuardado){
        mesaId = mesaGuardada;
        accesoPermitido = true;
        avisoLogin.innerText = "Ingrese mesa y contraseña...";
        window.location = "pages/menu.html";
    }
}

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
}

function guardarOrdenHistoricaLocalStorage(){
    guardarLocal("ordenHistoricaLocalStorage",JSON.stringify(ordenHistorico));
}

function leerOrdenHistoricaLocalStorage(){
    const ordenGuardada = JSON.parse(localStorage.getItem("ordenHistoricaLocalStorage"));
    if(ordenGuardada){
        for(const obj of ordenGuardada){
            const objTemp = new producto;
            objTemp.id = obj.id;
            objTemp.nombre = obj.nombre;
            objTemp.precio = obj.precio;
            objTemp.cantidad = obj.cantidad;
            objTemp.precioSemi = obj.precioSemi;
            mostrarCarritoHistorico(objTemp);
        }
    
    }
}

//Funcion para cerrar la mesa
function logOut(){
    mesaId = -1;
    accesoPermitido = false;
    ordenActual.splice(0,ordenActual.length);
    ordenHistorico.splice(0,ordenHistorico.length);
    localStorage.removeItem("Mesa");
    localStorage.removeItem("Acceso");
    localStorage.removeItem("ordenActualLocalStorage");
}