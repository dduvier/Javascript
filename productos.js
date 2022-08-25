//--------------- CLASES ----------------------------------------------------------------
class producto{
    constructor(id, nombre, precio, cantidad, precioSemi, descripcion, sintacc, vegetariano, vegano, alcohol){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.precioSemi = precioSemi;
        this.descripcion = descripcion;
        this.sintacc = sintacc;
        this.vegetariano = vegetariano;
        this.vegano = vegano;
        this.alcohol = alcohol;
    }
}

//---------- ARRAY DE PRODUCTOS ---------------------------------------------------------
const productos = [];

//---------- Creacion y carga de primeros productos -------------------------------------
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