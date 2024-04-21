import { socket } from "@/lib/socket";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import throttle from "lodash.throttle";
import {
  Brush,
  Download,
  Minus,
  MousePointer2,
  Plus,
  Redo,
  Settings,
  Trash2,
  Undo,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setDefaultCanvas } from "@/lib/canvasDefault";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "./ui/input";
import { Separator } from "@/components/ui/separator";
import { Object as FiberObject } from "fabric/fabric-impl";
import { cn } from "@/lib/utils";

const history: FiberObject[] = [];

export const WhiteBoard = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [zoom, setZoom] = useState<number>(1);
  const [color, setColor] = useState<string>("#ffffff");
  const [size, setSize] = useState<"sm" | "lg" | "md">("md");
  const emmitPosition = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      socket.emit("mouse-move", { x, y });
    }
  };

  const emmitThrottledPostition = useRef(throttle(emmitPosition, 50));
  const { editor, onReady } = useFabricJSEditor();
  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.altKey) {
        if (isDrawing == true) {
          editor!.canvas.isDrawingMode = false;
        }
      }
    };

    const keyupHandler = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        if (isDrawing == true) {
          console.log("yes I was drawing");
          editor!.canvas.isDrawingMode = true;
        }
      }
    };

    if (editor) {
      window.addEventListener("keydown", keydownHandler);
      window.addEventListener("keyup", keyupHandler);

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
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [editor, isDrawing]);

  return (
    <div className={cn("size-full")}>
      <div className="m-auto mb-4 flex w-fit gap-4 ">
        <ToggleGroup
          type="single"
          className="gap-4"
          value={isDrawing ? "drawing" : "select"}
        >
          <ToggleGroupItem
            value={"select"}
            variant={"outline"}
            onClick={() => {
              setIsDrawing(false);
              if (editor) {
                editor.canvas.isDrawingMode = false;
              }
            }}
          >
            <MousePointer2 className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="drawing"
            variant={"outline"}
            onClick={() => {
              setIsDrawing(true);
              if (editor) {
                editor.canvas.isDrawingMode = true;
              }
            }}
          >
            <Brush className="size-5" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            if (editor && editor.canvas._objects.length > 0) {
              history.push(editor.canvas._objects.pop()!);
              editor.canvas.renderAll();
            }
          }}
        >
          <Undo className="size-5" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            if (history.length > 0 && editor) {
              editor.canvas.add(history.pop()!);
            }
          }}
        >
          <Redo className="size-5" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            if (editor) {
              editor.canvas.clear();
            }
          }}
        >
          <Trash2 className="size-5" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            if (editor) {
              const img = editor.canvas.toSVG();
              const blob = new Blob([img], {
                type: "image/svg+xml;charset=utf-8",
              });
              const imgUrl = URL.createObjectURL(blob);
              const alink = document.createElement("a");
              alink.href = imgUrl;
              alink.download = "whiteboard.svg";
              alink.click();
            }
          }}
        >
          <Download className="size-5" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} variant={"outline"}>
              <Settings className="size-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[1]">
            <div className="mt-2 min-w-[200px] rounded-sm border bg-background p-2 px-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Brush Color
                </span>
                <Input
                  type="color"
                  className="size-7 border-none p-0"
                  value={[color!]}
                  onChange={(e) => {
                    setColor(e.target.value);
                    if (editor) {
                      editor.canvas.freeDrawingBrush.color = e.target.value;
                    }
                  }}
                />
              </div>
              <Separator orientation="horizontal" className="my-1" />
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-muted-foreground">
                  Brush Size
                </span>
                <ToggleGroup type="single" value={size}>
                  <ToggleGroupItem
                    value="sm"
                    className="size-8 self-center rounded-full"
                    onClick={() => {
                      setSize("sm");
                      if (editor) {
                        editor.canvas.freeDrawingBrush.width = 1;
                      }
                    }}
                  >
                    sm
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="md"
                    className="size-8 rounded-full"
                    onClick={() => {
                      setSize("md");
                      if (editor) {
                        editor.canvas.freeDrawingBrush.width = 5;
                      }
                    }}
                  >
                    md
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="lg"
                    className="size-8 rounded-full"
                    onClick={() => {
                      setSize("lg");
                      if (editor) {
                        editor.canvas.freeDrawingBrush.width = 10;
                      }
                    }}
                  >
                    lg
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        className={cn(
          "relative h-[75vh] border border-dotted bg-gray-200 bg-secondary dark:bg-background",
        )}
        onMouseMove={(e) => emmitThrottledPostition.current(e)}
      >
        {/* {cursorPoint && <Cursor point={[cursorPoint.x, cursorPoint.y]} />} */}
        <FabricJSCanvas className="mb-0 size-full" onReady={onReady} />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-sm bg-secondary">
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Plus className="size-5" />
          </Button>
          <span>{(zoom * 100).toFixed(1)}%</span>
          <Button size={"icon"} variant={"ghost"} className="size-8">
            <Minus className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
