import { createServer } from "http";

import { Server } from "socket.io";
import { setUpListers } from "./Listeners";

const PORT = process.env.PORT || 8080;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

setUpListers(io);

httpServer.listen(PORT, () => console.log("Server is running on port ", PORT));
