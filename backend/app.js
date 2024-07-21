//library imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// server setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "http://localhost:5173", methods: ["GET", "POST"]}});

// variables
let num_users = 0;
let player1_socket_id;
let player2_socket_id;

const getShuffledArray = () => {
    let positions = 
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];

    for (i = 0; i < positions.length; i++) {
        const random = Math.floor(Math.random() * 52);
        const j = positions[random];
        const q = positions[i];
        positions[random] = q;
        positions[i] = j;
    }

    return positions;
}

let shuffled_array = getShuffledArray();

io.on("connection", (socket) => {
    num_users++;
    if (num_users == 1) {
        player1_socket_id = socket.id;
        socket.player = 1;
    }
    if (num_users == 2) {
        player2_socket_id = socket.id;
        socket.player = 2;
        io.to(player1_socket_id).emit("ready", {player: 1});
        io.to(player2_socket_id).emit("ready", {player: 2});
    }

    socket.on("shuffle-deck", () => {
        if (shuffled_array.length == 0) {
            shuffled_array = getShuffledArray();
        }
        socket.emit("shuffle-deck", {shuffled: shuffled_array});
    })

    socket.on("pass-first-pick", () => {
        if (socket.player == 1) {
            io.to(player1_socket_id).emit("pass-first-pick", {self: true});
            io.to(player2_socket_id).emit("pass-first-pick", {self: false});
        }
        else {
            io.to(player1_socket_id).emit("pass-first-pick", {self: false});
            io.to(player2_socket_id).emit("pass-first-pick", {self: true});
        }
    })

    socket.on("discard-from-hand", (data) => {
        if (socket.player == 1) {
            io.to(player1_socket_id).emit("discard-from-hand", {self: true, index: data.index});
            io.to(player2_socket_id).emit("discard-from-hand", {self: false, index: data.index});
        }
        else {
            io.to(player1_socket_id).emit("discard-from-hand", {self: false, index: data.index});
            io.to(player2_socket_id).emit("discard-from-hand", {self: true, index: data.index});
        }
    })

    socket.on("draw-from-deck", () => {
        if (socket.player == 1) {
            io.to(player1_socket_id).emit("draw-from-deck", {self: true});
            io.to(player2_socket_id).emit("draw-from-deck", {self: false});
        }
        else {
            io.to(player1_socket_id).emit("draw-from-deck", {self: false});
            io.to(player2_socket_id).emit("draw-from-deck", {self: true});
        }
    })

    socket.on("draw-from-pile", () => {
        if (socket.player == 1) {
            io.to(player1_socket_id).emit("draw-from-pile", {self: true});
            io.to(player2_socket_id).emit("draw-from-pile", {self: false});
        }
        else {
            io.to(player1_socket_id).emit("draw-from-pile", {self: false});
            io.to(player2_socket_id).emit("draw-from-pile", {self: true});
        }
    })

    socket.on("disconnect", () => {
        num_users=0;
        shuffled_array = [];
        if (socket.player == 1){
            io.to(player2_socket_id).emit("opponent-disconnect");
        }
        else {
            io.to(player1_socket_id).emit("opponent-disconnect");
        }
    });

})

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});