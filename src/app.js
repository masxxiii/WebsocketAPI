//Modules
const express = require('express');
const app = express();
const { Server } = require("socket.io");
const Todo = require('../src/controllers/ToDo');

//The middleware for parsing and configuring
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.port || 3000;

let httpServer = app.listen(PORT, () => { console.log("Server is running on port " + PORT +".") });
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A user has connected.');

    socket.on('input', (itemNew) => {
        new Todo().addItem(itemNew);
    });

    socket.on('read', async () => {
        let data = await new Todo().getItems();
        console.log(data);
    });

    socket.on('update', (itemId,itemNew) => {
        new Todo().updateItem(itemId,itemNew);
    });

    socket.on('delete', (itemId) => {
        new Todo().deleteItem(itemId);
    });

    socket.on('disconnect', () => {
        console.log('A user has disconnected.');
    });
});
