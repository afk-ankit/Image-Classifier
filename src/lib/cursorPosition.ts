import React from "react";
import { socket } from "./socket";

export const emmitPosition = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
) => {
  if (e.currentTarget) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    socket.emit("mouse-move", { x, y });
  }
};
