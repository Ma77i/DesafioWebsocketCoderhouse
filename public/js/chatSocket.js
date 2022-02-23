

const socket = io()
const bodyTable = document.getElementById("body-table")
const inputMail = document.getElementById("mail")
const inputMsj = document.getElementById("mensaje")

//Renderizo la tabla con los datos de los productos
const renderTable = data => {
    const row = data.map(i=>{
        return (`<tr>
                    <td class="align-middle"><img src=${i.thumbnail} alt=${i.title} width="100"></td>
                    <td>${i.title}</td>
                    <td>${i.price}</td>
                </tr>`)
            });
    bodyTable.innerHTML = row
}

socket.on("prods", (data) => {
    //console.log(data)
    return renderTable(data)
})



const addMsj = e => {
    e.preventDefault()
    if (!inputMsj) {    
        return
    }
    const chat = {
        mail: inputMail.value,
        date: moment(),
        mensaje: inputMsj.value  
    }
    
    socket.emit("newMsj", chat)
    return false
}

//escucho el evento de los datos del mensaje 
btn.addEventListener("click", addMsj)



//renderizo el chat
const renderChat = chat => {
    const date = moment().locale('es').format('dddd, MMMM Do YYYY, h:mm:ss')
    const room = chat.map(e=>(`<p><strong>-${e.mail}: </strong>${date}<em class="bubble">${e.mensaje}</em></p>`)).join(" ")
    document.getElementById("room").innerHTML = room
    //console.log(room)
}

socket.on('msjs', data=>renderChat(data))

