//--------------- CLASES ------------------------------------------------------------------------------
class usuario{
    constructor(id, mesa, password){
        this.id = id;
        this.mesa = mesa;
        this.password = password;
    }
}

//---------- ARRAY DE USUARIOS ------------------------------------------------------------------------
const usuarios = [];

//---------- Creacion de primeros usuarios ------------------------------------------------------------
const usuario01 = new usuario(1, "Mesa adentro 1" , "PassI1");
const usuario02 = new usuario(2, "Mesa adentro 2" , "PassI2");
const usuario03 = new usuario(3, "Mesa adentro 3" , "PassI3");
const usuario04 = new usuario(4, "Mesa adentro 4" , "PassI4");
const usuario05 = new usuario(5, "Mesa afuera 1" , "PassO1");
const usuario06 = new usuario(6, "Mesa afuera 2" , "PassO2");
const usuario07 = new usuario(7, "Mesa afuera 3" , "PassO3");

//---------- Carga de primeros usuarios ---------------------------------------------------------------
usuarios.push(usuario01,usuario02,usuario03,usuario04);