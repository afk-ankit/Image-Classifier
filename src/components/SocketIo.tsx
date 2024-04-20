import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";

export const SocketIo = () => {
  const [cursorPoint, setCursorPoint] = useState<{
    x: number;
    y: number;
  } | null>(null);
  useEffect(() => {
    socket.on("mouse movement", (data) => {
      setCursorPoint(data);
      console.log(data);
    });
    socket.on("user disconnected", (data) => {
      setCursorPoint(data);
    });
  }, []);

  const emmitPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      socket.emit("mouse-move", { x, y });
    }
  };
  const emmitThrottledPostition = useRef(throttle(emmitPosition, 50));
  return (
    <div
      className="relative size-full border border-dotted"
      onMouseMove={(e) => {
        emmitThrottledPostition.current(e);
      }}
    >
      {cursorPoint && <Cursor point={[cursorPoint.x, cursorPoint.y]} />}
    </div>
  );
};
