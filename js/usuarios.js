//--------------- CLASES ------------------------------------------------------------------------------
class usuario{
    constructor(id, mesa, password){
        this.id = id;
        this.mesa = mesa;
        this.password = password;
    }
}

//---------- Traigo usuarios desde una mockapi ------------------------------------------------------------
fetch("https://6317ec9eece2736550bd1ea6.mockapi.io/api/v1/usuarios")
    .then( (respuesta) => respuesta.json() )
    .then( (data) => {
        data.forEach( (user) => {
            let userTemp = new usuario(user.id,user.mesa,user.password);
            usuarios.push(userTemp);
        })
    })
