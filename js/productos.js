//--------------- CLASES ------------------------------------------------------------------------------
class producto{
    constructor(id, nombre, precio, descripcion, cantidad, img, precioSemi, sintacc, vegetariano, vegano, alcohol){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.precioSemi = precioSemi;
        this.img = img;
        this.sintacc = sintacc;
        this.vegetariano = vegetariano;
        this.vegano = vegano;
        this.alcohol = alcohol;
    }
}

//---------- ARRAY DE PRODUCTOS -----------------------------------------------------------------------
const productos = [];

//---------- Creacion de primeros productos -----------------------------------------------------------
const producto01 = new producto(1, "Papas Fritas" , 500, "Medio kilo de papas cortadas en baston con cascara", 0, "../img/img-papasFritas.jpg");
const producto02 = new producto(2, "Papas Fritas c/Cheddar y panceta", 700, "Papas cortadas en baston con cascara, con queso cheddar y panceta", 0, "../img/img-papasFritasConCyP.jpg");
const producto03 = new producto(3, "Rabas" , 2000, "Abundante porcion de aros de calamar fritos con alioli y limon", 0, "../img/img-rabas.jpg");
const producto04 = new producto(4, "Hamburguesa" , 900, "Medallon de carne de 180gr con queso dambo", 0, "../img/img-hamburguesa.jpg");
const producto05 = new producto(5, "Hamburguesa Completa" , 1200, "Medallon de carne de 180gr con queso dambo, panceta, tomate, pepinillos y huevo", 0, "../img/img-hamburguesaCompleta.jpg");
const producto06 = new producto(6, "Tacos" , 1000, "2 tacos de carne con verduras salteadas en masa original de tacos", 0, "../img/img-tacos.jpg");
const producto07 = new producto(7, "Empanadas" , 150, "Empanada frita de la casa: Carne cortada a cuchillo, cebolla, morron, aceitunas, huevo y condimentos", 0, "../img/img-empanada.jpg");
const producto08 = new producto(8, "Pancho" , 600, "Pancho de 35cm con salchicha alemana y pan de pancho casero", 0, "../img/img-pancho.jpg");
const producto09 = new producto(9, "Agua" , 250, "Botella de agua sin gas de 600cc", 0, "../img/img-agua.jpg");
const producto10 = new producto(10, "Cerveza" , 450, "Porron de cerveza IPA de la casa (500cc)", 0, "../img/img-cerveza.jpg");
const producto11 = new producto(11, "Gaseosa" , 350, "Gaseosa Cola de 500cc", 0, "../img/img-gaseosa.jpg");

//---------- Carga de primeros productos -------------------------------------------------------------
productos.push(producto01,producto02,producto03,producto04,producto05,producto06,producto07,producto08,producto09,producto10);
productos.push(producto11);