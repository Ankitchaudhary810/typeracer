import { Server, Socket } from "socket.io";

export class Game {
  gameStatus: "not-started" | "in-progress" | "Finished";
  gameId: string;
  players: {
    id: string;
    score: number;
    name: string;
  }[];
  io: Server;
  gameHost: string;
  paragraph: string;

  constructor(id: string, io: Server, host: string) {
    this.gameId = id;
    this.players = [];
    this.io = io;
    this.gameHost = host;
    this.gameStatus = "not-started";
    this.paragraph = "";
  }

  setUpListeners(socket: Socket) {
    socket.on("start-game", async () => {
      if (this.gameStatus === "in-progress")
        return socket.emit("error", "This game is already Started");

      if (this.gameHost !== socket.id)
        return socket.emit(
          "error",
          "Your are not the host of the game. Only the host can start the game"
        );

      for (const player of this.players) {
        player.score = 0;
      }
      this.io.to(this.gameId).emit("players", this.players);
    });
  }

  joinPlayer(id: string, name: string, socket: Socket) {
    if (this.gameStatus === "in-progress")
      return socket.emit(
        "error",
        "game has already started , please wait for it to end before joining"
      );

    this.players.push({ id, name, score: 0 });

    // tell the while server a new player is joined
    this.io.to(this.gameId).emit("player-joined", {
      id,
      name,
      score: 0,
    });

    socket.emit("player", this.players);
    socket.emit("new-host", this.gameHost);
    this.setUpListeners(socket);
  }
}
