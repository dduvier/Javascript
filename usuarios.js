//--------------- CLASES ----------------------------------------------------------------
class usuario{
    constructor(id, nombre, apellido, edad, password){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.password = password;
    }
}

//---------- ARRAY DE PRODUCTOS ---------------------------------------------------------
const usuarios = [];

//---------- Creacion y carga de primeros productos -------------------------------------
const usuario01 = new usuario(1, "Dario" , "Duvier" , 29 , "Pass0001");
const usuario02 = new usuario(2, "Admin" , "ADMIN" , 43 , "12345678");
const usuario03 = new usuario(3, "Coder" , "House" , 33 , "20222022");
const usuario04 = new usuario(4, "User" , "Unique" , 60 , "87654321");
usuarios.push(usuario01);
usuarios.push(usuario02);
usuarios.push(usuario03);
usuarios.push(usuario04);