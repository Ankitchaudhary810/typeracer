import { Server, Socket } from "socket.io";
import { Game } from "./class/game";

export const rooms = new Map<String, Game>();

export function setUpListers(io: Server) {
  io.on("connection", (socket) => {
    console.log("New Connection -> ", socket.id);

    socket.on("join-game", (roomId: string, name: string) => {
      if (!roomId) {
        return socket.emit("error", "invalid room Id");
      }

      if (!name) {
        return socket.emit("error", "provide name");
      }

      socket.join(roomId);
      if (rooms.has(roomId)) {
        const game = rooms.get(roomId);
        if (!game) return socket.emit("error", "Game not found");
        game.joinPlayer(socket.id, name, socket);
      } else {
        const game = new Game(roomId, io, socket.id);
        rooms.set(roomId, game);
        game.joinPlayer(socket.id, name, socket);
      }
    });
  });
}
