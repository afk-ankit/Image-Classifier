import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { MobileNet } from "@tensorflow-models/mobilenet";

export default function Classify({
  model,
  loadingModel,
}: {
  model: MobileNet | null;
  loadingModel: boolean;
}) {
  const [image, setImageURL] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [prediction, setPrediction] = useState<
    {
      className: string;
      probability: number;
    }[]
  >([]);

  return (
    <>
      <div className="space-y-4 w-full lg:w-[800px] m-auto">
        <Input
          accept="image/*"
          type="file"
          className="dark:file:text-foreground"
          placeholder="Choose an image"
          onChange={(e) => {
            if (e.target.files && e.target.files?.length > 0) {
              const url = URL.createObjectURL(e.target.files[0]);
              setImageURL(url);
              setPrediction([]);
            } else {
              setImageURL(null);
            }
          }}
        />

        {image && (
          <div className="flex max-w-screen-md border rounded-sm p-4 gap-4">
            <img
              src={image}
              alt="image"
              className="size-60 object-cover"
              ref={imageRef}
            />
            <div className="flex flex-col justify-between flex-1 gap-4">
              {prediction.length > 0 &&
                prediction.map((item, key) => (
                  <div
                    key={key}
                    className={cn(
                      "bg-secondary p-2 rounded-sm px-4",
                      key == 0 && "border-green-400  border-2",
                    )}
                  >
                    <h1 className="capitalize text-md font-bold">
                      {item.className}
                    </h1>
                    <h2 className="text-muted-foreground">
                      {(item.probability * 100).toFixed(2)}% Probability
                    </h2>
                  </div>
                ))}
            </div>
          </div>
        )}
        <Button
          className="w-full"
          onClick={async () => {
            try {
              if (imageRef?.current && model) {
                const res = await model?.classify(imageRef.current);
                setPrediction(res);
              }
            } catch (error: unknown) {
              if (error instanceof Error) console.log(error.message);
            }
          }}
          disabled={loadingModel}
        >
          {!loadingModel ? "Classify" : "Loading Model"}
        </Button>
      </div>
    </>
  );
}
