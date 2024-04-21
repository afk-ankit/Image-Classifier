import { setDefaultCanvas } from "@/lib/canvasDefault";
import { emmitPosition } from "@/lib/cursorPosition";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import throttle from "lodash.throttle";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WhiteBoardNavbar } from "./WhiteBoardNavbar";
import { Button } from "./ui/button";

export const WhiteBoard = () => {
  const [zoom, setZoom] = useState<number>(1);
  const emmitThrottledPostition = useRef(throttle(emmitPosition, 50));
  const { editor, onReady } = useFabricJSEditor();
  useEffect(() => {
    if (editor) {
      editor.canvas.freeDrawingBrush.width = 4;
      editor.canvas.freeDrawingBrush.color = "white";

      socket.on("user drawn", (data) => {
        editor.canvas.loadFromJSON(
          data,
          editor.canvas.renderAll.bind(editor.canvas),
        );
      });

      editor.canvas.on("mouse:up", () => {
        socket.emit("drawing", editor.canvas.toJSON());
      });
      setDefaultCanvas(editor.canvas, setZoom);
    }
    return () => {};
  }, [editor]);

  return (
    <div className={cn("size-full")}>
      <div
        className="relative h-[89vh] border border-dotted bg-gray-200 bg-secondary dark:bg-background"
        onMouseMove={(e) => emmitThrottledPostition.current(e)}
      >
        <WhiteBoardNavbar editor={editor} />
        {/* {cursorPoint && <Cursor point={[cursorPoint.x, cursorPoint.y]} />} */}
        <FabricJSCanvas className="mb-0 size-full" onReady={onReady} />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-sm border bg-background">
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Plus className="size-5" />
          </Button>
          <span>{(zoom * 100).toFixed(1)}%</span>
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Minus className="size-5" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-1/2 flex translate-x-[-50%] flex-col text-center">
          <span className="text-sm text-muted-foreground">
            ctrl + scroll to zoom
          </span>
          <span className="text-sm text-muted-foreground">
            alt + click and drag to pan
          </span>
        </div>
      </div>
    </div>
  );
};
