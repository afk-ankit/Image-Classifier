import { useEffect, useRef } from "react";
import { fabric } from "fabric";

export const WhiteBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current);
    fabricCanvas.isDrawingMode = true;
  }, []);
  return (
    <div className="grid size-full place-items-center">
      <canvas ref={canvasRef} height={500} width={500} className="border" />
    </div>
  );
};
