import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Object as FiberObject } from "fabric/fabric-impl";
import { FabricJSEditor } from "fabricjs-react";
import {
  Brush,
  Download,
  MousePointer2,
  Redo,
  Settings,
  Share,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { getRouteApi } from "@tanstack/react-router";
import { useToast } from "./ui/use-toast";
import { socket } from "@/lib/socket";
const history: FiberObject[] = [];

const routeApi = getRouteApi("/whiteBoard/$id");

export const WhiteBoardNavbar = ({
  editor,
}: {
  editor: FabricJSEditor | undefined;
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<"sm" | "lg" | "md">("md");
  const id = routeApi.useParams();
  const searchParams = routeApi.useSearch();
  const { toast } = useToast();

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
    }
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    };
  }, [editor, isDrawing]);

  return (
    <div className="absolute left-1/2 top-4 z-[2] m-auto mb-4 flex w-fit translate-x-[-50%] gap-2 rounded-full border bg-background p-2 px-5 shadow-sm">
      <ToggleGroup
        type="single"
        className="gap-2"
        value={isDrawing ? "drawing" : "select"}
      >
        <ToggleGroupItem
          value={"select"}
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
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          if (editor) {
            editor.addText("Inser Here");
            editor.canvas.isDrawingMode = false;
            setIsDrawing(false);
          }
        }}
      >
        <Type className="size-5" />
      </Button>
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => {
          if (editor && editor.canvas._objects.length > 0) {
            history.push(editor.canvas._objects.pop()!);
            editor.canvas.renderAll();
            const data = editor.canvas.toJSON();
            socket.emit("drawing", { sessionId: id.id, data });
          }
        }}
      >
        <Undo className="size-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (history.length > 0 && editor) {
            editor.canvas.add(history.pop()!);
            const data = editor.canvas.toJSON();
            socket.emit("drawing", { sessionId: id.id, data });
          }
        }}
      >
        <Redo className="size-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
        onClick={() => {
          if (editor) {
            editor.canvas.clear();
            const data = editor.canvas.toJSON();
            socket.emit("drawing", { sessionId: id.id, data });
          }
        }}
      >
        <Trash2 className="size-5" />
      </Button>
      <Button
        size={"icon"}
        variant={"ghost"}
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
          <Button size={"icon"} variant={"ghost"}>
            <Settings className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-[2]">
          {/* <div className="mt-2 min-w-[200px] rounded-sm border bg-background p-2 px-3 shadow-md"> */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Brush Color</span>
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
            <span className="text-sm text-muted-foreground">Brush Size</span>
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
        </PopoverContent>
      </Popover>
      {searchParams.user && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            navigator.clipboard
              .writeText(id.id)
              .then(() => {
                toast({ description: "Session ID copied to clipboard" });
              })
              .catch((err) => {
                console.error("Could not copy text: ", err);
              });
          }}
        >
          <Share className="size-5" />
        </Button>
      )}
    </div>
  );
};
