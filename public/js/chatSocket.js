const socket = io()


//Renderizo la tabla con los datos de los productos
const renderTable = data => {
    const card = data.map(i=>{
        return (`<tr>
                    <td class="align-middle"><img src=${i.thumbnail} alt=${i.title} width="100"></td>
                    <td>${i.title}</td>
                    <td>${i.price}</td>
                </tr>`)
            });
    document.getElementById("cart").innerHTML = card
}

socket.on("prods", (data) => {
    //console.log(data)
    return renderTable(data)
})



/* const addMsj = e => {
    e.preventDefault()
    const chat = {
        mail: document.getElementById("mail").value,
        mensaje: document.getElementById("mensaje").value  
    }
    
    socket.emit("newMsj", chat)
    return false
}

//escucho el evento de los datos del mensaje 
btn.addEventListener("click", addMsj) */



//renderizo el chat
const renderChat = chat => {
    const date = moment().locale('es').format('dddd, MMMM Do YYYY, h:mm:ss')
    const hora = new Date().toLocaleTimeString()
    const room = chat.map(e=>
        (`<p>${hora.toString('dddd, MMMM ,yyyy')}<strong>-${e.mail}: </strong>${date}<em class="bubble">${e.mensaje}</em></p>`)).join(" ")
    document.getElementById("room").innerHTML = room
    //console.log(room)
}

socket.on('msj', data=>renderChat(data))

