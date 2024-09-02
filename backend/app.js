/**
 * @author Syed Faruque
 * created: July 4 2024
**/

//~~~~~~~~~~ this is the main backend for the game. When any event occurs, like a move, this notifies both the user and opponent of it. ~~~~~~~//

//library imports
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// server setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {cors: {origin: "http://192.168.1.176:5173", methods: ["GET", "POST"]}});

// Game management
const games = new Map();
const waitingPlayers = []; // Queue of players waiting to be matched

const getShuffledArray = () => {
    let positions = 
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
         11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
         21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
         31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
         41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];

    for (let i = 0; i < positions.length; i++) {
        const random = Math.floor(Math.random() * 52);
        const j = positions[random];
        positions[random] = positions[i];
        positions[i] = j;
    }

    return positions;
}

const startGame = (player1, player2) => {
    const gameId = player1.id + "_" + player2.id;
    const shuffledArray = getShuffledArray();

    games.set(gameId, {
        players: [player1.id, player2.id],
        shuffled_array: shuffledArray,
        deckShuffled: true,
        players_joined_new_round: 0
    });

    player1.gameId = gameId;
    player2.gameId = gameId;

    io.to(player1.id).emit("ready", { player: 1 });
    io.to(player2.id).emit("ready", { player: 2 });
};

io.on("connection", (socket) => {

    waitingPlayers.push(socket);

    if (waitingPlayers.length >= 2) {
        const player1 = waitingPlayers.shift();
        const player2 = waitingPlayers.shift();
        startGame(player1, player2);
    }

    const getOpponentId = () => {
        const game = games.get(socket.gameId);
        return game.players.find(id => id !== socket.id);
    }

    socket.on("new-round", () => {
        const game = games.get(socket.gameId);
        game.players_joined_new_round++;
        if (game.deckShuffled && game.players_joined_new_round == 1) {
            game.deckShuffled = false;
        }
        if (game.players_joined_new_round == 2) {
            game.players_joined_new_round = 0;
        }
    });

    socket.on("shuffle-deck", () => {
        const game = games.get(socket.gameId);
        if (game) {
            if (!game.deckShuffled) {
                game.shuffled_array = getShuffledArray();
                game.deckShuffled = true;
            }
            socket.emit("shuffle-deck", { shuffled: game.shuffled_array });
        }
    });

    socket.on("pass-first-pick", () => {
        socket.emit("pass-first-pick", { self: true });
        const opponentId = getOpponentId();
        if (opponentId) {
            io.to(opponentId).emit("pass-first-pick", { self: false });
        }
    });

    socket.on("discard-from-hand", (data) => {
        socket.emit("discard-from-hand", { self: true, index: data.index });
        const opponentId = getOpponentId();
        if (opponentId) {
            io.to(opponentId).emit("discard-from-hand", { self: false, index: data.index });
        }
    });

    socket.on("draw-from-deck", () => {
        socket.emit("draw-from-deck", { self: true });
        const opponentId = getOpponentId();
        if (opponentId) {
            io.to(opponentId).emit("draw-from-deck", { self: false });
        }
    });

    socket.on("draw-from-pile", () => {
        socket.emit("draw-from-pile", { self: true });
        const opponentId = getOpponentId();
        if (opponentId) {
            io.to(opponentId).emit("draw-from-pile", { self: false });
        }
    });

    socket.on("knock", (data) => {
        socket.emit("knock", { self: true, index_max_value_card: data.index_max_value_card });
        const opponentId = getOpponentId();
        if (opponentId) {
            io.to(opponentId).emit("knock", { self: false, index_max_value_card: data.index_max_value_card });
        }
    });

    socket.on("disconnect", () => {
        const index = waitingPlayers.indexOf(socket);
        if (index !== -1) {
            waitingPlayers.splice(index, 1);
        }

        const game = games.get(socket.gameId);
        if (game) {
            game.players = game.players.filter(id => id !== socket.id);
            if (game.players.length === 0) {
                games.delete(socket.gameId);
            } 
            else {
                const opponentId = getOpponentId();
                if (opponentId) {
                    io.to(opponentId).emit("opponent-disconnect");
                }
            }
        }
    });
})

const PORT = process.env.PORT || 3003;
server.listen(PORT,"192.168.1.176", () => {
    console.log(`Server is running on port ${PORT}`);
});
