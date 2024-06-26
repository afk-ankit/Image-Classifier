import { setDefaultCanvas } from "@/lib/canvasDefault";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { WhiteBoardNavbar } from "./WhiteBoardNavbar";
import { Button } from "./ui/button";
import { getRouteApi } from "@tanstack/react-router";

const routeApi = getRouteApi("/whiteBoard/$id");

export const WhiteBoard = () => {
  const { id } = routeApi.useParams();
  const [zoom, setZoom] = useState<number>(1);

  const { editor, onReady } = useFabricJSEditor();
  useEffect(() => {
    const sessoinId = localStorage.getItem("sessionId");
    if (sessoinId) {
      socket.emit("rejoin-session", sessoinId);
    }
    const handleDrawn = (data: { data: JSON }) => {
      if (editor) {
        editor.canvas.loadFromJSON(
          data.data,
          editor.canvas.renderAll.bind(editor.canvas),
        );
      }
    };

    const handleFirstLoad = (data: JSON) => {
      if (editor && data) {
        console.log(data);
        editor.canvas.loadFromJSON(
          data,
          editor.canvas.renderAll.bind(editor.canvas),
        );
      }
    };

    if (editor) {
      socket.on("drawing-data", handleFirstLoad);
      editor.canvas.freeDrawingBrush.width = 4;
      editor.canvas.freeDrawingBrush.color = "#000000";
      setDefaultCanvas(editor.canvas, setZoom);

      socket.on("drawing", handleDrawn);

      editor.canvas.on("mouse:up", () => {
        const data = editor.canvas.toJSON();
        socket.emit("drawing", { sessionId: id, data });
      });
    }
    return () => {
      socket.off("drawing", handleDrawn);
      socket.off("drawing-data", handleFirstLoad);
    };
  }, [editor, id]);

  return (
    <div className={cn("size-full")}>
      <div className="relative h-[89dvh] border border-dotted bg-gray-200 bg-secondary dark:bg-background">
        <WhiteBoardNavbar editor={editor} />
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
