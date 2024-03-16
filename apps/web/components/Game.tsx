"use client";

import { GameProps, GameStatus, Player } from "@/types/types";
import { Socket } from "socket.io-client";
import React, { useState } from "react";

const Game = ({ gameId, name }: GameProps) => {
  const [ioInstance, setIoInstance] = useState<Socket>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [paragraph, setParagraph] = useState<string>("");
  const [host, setHost] = useState<string>("");
  const [inputParagraph, setInputParagraph] = useState<string>("");

  return <div>Game</div>;
};

export default Game;
