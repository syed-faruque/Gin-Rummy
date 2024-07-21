import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import GameTable from "../src/model/GameTable";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [ready, setReady] = useState(false);
  const [player, setPlayer] = useState(null);
  const [opponentDisconnect, setOpponentDisconnect] = useState(false);

  // connection to backend
  useEffect(() => {
    const new_socket = io("http://localhost:3003");
    setSocket(new_socket);
    return () => {
      new_socket.disconnect();
    };
  }, []);

  // receives notice when opponent is ready
  useEffect(() => {
    if (!socket) return;
    socket.on("ready", (data) => {
      setPlayer(data.player);
      setReady(true);
    });

    // receives notice when opponent disconnects
    socket.on("opponent-disconnect", () => {
      setOpponentDisconnect(true);
    });

    return () => {
      socket.off("ready");
      socket.off("opponent-disconnect");
    };
  }, [socket]);

  // renders game when opponent ready, and shows victory if opponent disconnects
  return (
    <div>
      {opponentDisconnect ? (
        <div>Game won, opponent disconnected</div>
      ) : ready && player ? (
        <GameTable socket={socket} player={player} />
      ) : (
        <div>Waiting for game to start...</div>
      )}
    </div>
  );
};

export default App;
