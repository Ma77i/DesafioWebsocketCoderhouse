const express = require('express');
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')


const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "public")))



const Contenedor = require(path.join(__dirname, "/model/contenedor.js"));
const products = new Contenedor(path.join(__dirname, "/database/data.json"))

const Chat = require(path.join(__dirname, "/model/chat.js"));
const chats = new Chat(path.join(__dirname, "/database/chat.json"))




const homeRouter = require('./routes/home')
app.use("/", homeRouter)



//---------SOCKET
io.on('connection', async (socket) => {
    console.log((`an user connected ${socket.id}`))


    
    const list = await products.getAll()
    socket.emit("prods", list)


    const listChat = await chats.getAll()
    io.sockets.emit("msj", listChat)


    socket.on("newMsj", data=>{
        chats.push(data)
        //console.log(data)
        io.sockets.emit("msjs", chat)
    })
}) 





//-------- HANDLEBARS

//engine
const { engine } = require('express-handlebars')

app.engine("handlebars", engine({
    layoutsDir: path.join(__dirname, "views/layout"),
    defaultLayout: 'index'
}))
app.set("view engine", "handlebars")
















server.listen(8080, () => console.log(`Server running on http://localhost:8080`))
server.on('err', (err) => console.log(`Error: ${err}`))