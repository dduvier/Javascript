//---------- Creacion de NODOS ------------------------------------------------------------------------
const btnLogin = document.getElementById("btnLogin");
const selectMesa = document.getElementById("selectMesa");
const passwordIngresado = document.getElementById("passwordIngresado");
const avisoLogin = document.getElementById("avisoLogin");

//---------- FUNCIONES --------------------------------------------------------------------------------

//Funcion que verifica mesa y contraseña para realizar el Login
function loginMesa( valueMesa , valuePassword ){
    if(usuarios.some( (index) => index.id == valueMesa)){
        let existeUsuario;
        existeUsuario = usuarios.find( (index) => index.id == valueMesa);
        if( valuePassword == existeUsuario.password ){
            accesoPermitido = true;
            mesaId = existeUsuario.id;
            console.log("Acceso Permitido");
            avisoLogin.innerText = "Ingrese mesa y contraseña...";
            guardarMesaLocalStorage();
            window.location = "pages/menu.html";
        }
        else{
            console.log("Acceso Denegado");
            avisoLogin.innerText = "Contraseña Incorrecta! \nIngrese nuevamente la contraseña...";
        }
    }
    else{
        console.log("Acceso Denegado");
        avisoLogin.innerText = "Mesa Incorrecta! \nIngrese nuevamente la mesa y contraseña...";
    }
}

btnLogin.addEventListener("click", ()=> {
    loginMesa( selectMesa.value , passwordIngresado.value );
} );

leerMesaLocalStorage();