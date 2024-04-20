import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
export const WhiteBoard = () => {
  const { editor, onReady } = useFabricJSEditor();
  useEffect(() => {
    console.log("🚀🔥");
    if (editor) {
      editor.canvas.freeDrawingBrush.color = "white";
      editor.canvas.freeDrawingBrush.width = 4;
      editor.canvas.isDrawingMode = true;
    }
  }, [editor]);
  return (
    <div className="space-y-4">
      <div className="h-[400px] w-[900px] border border-dotted bg-gray-200 dark:bg-background">
        <FabricJSCanvas onReady={onReady} className="mb-0 size-full" />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            editor?.canvas.clear();
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            if (editor) {
              editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode;
            }
          }}
        >
          Toggle Drawing
        </Button>
        <Input
          type="color"
          className="w-16"
          onChange={(e) => {
            if (editor) {
              editor.canvas.freeDrawingBrush.color = e.target.value;
            }
          }}
        />
        <Slider
          className="w-[400px]"
          max={100}
          step={1}
          onValueChange={(e) => {
            if (editor) {
              editor.canvas.freeDrawingBrush.width = e[0];
            }
          }}
        />
        <Button
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
          To svg
        </Button>
      </div>
    </div>
  );
};
