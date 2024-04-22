import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { MobileNet } from "@tensorflow-models/mobilenet";
import { Separator } from "./ui/separator";
import axios from "axios";

export default function Classify({
  model,
  loadingModel,
}: {
  model: MobileNet | null;
  loadingModel: boolean;
}) {
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [tempUrl, setTempUrl] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [prediction, setPrediction] = useState<
    {
      className: string;
      probability: number;
    }[]
  >([]);
  return (
    <section className="grid h-[80dvh] w-full place-items-center px-2 sm:container">
      <div className="m-auto w-full space-y-4 md:w-[750px]">
        <Input
          accept="image/*"
          type="file"
          className="dark:file:text-foreground"
          placeholder="Choose an image"
          disabled={!!imageURL}
          onChange={(e) => {
            if (e.target.files && e.target.files?.length > 0) {
              const url = URL.createObjectURL(e.target.files[0]);
              setFileURL(url);
              setPrediction([]);
            } else {
              setFileURL(null);
              setPrediction([]);
            }
          }}
        />
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">OR</span>
          <Separator className="flex-1" />
        </div>
        <div className="flex gap-2">
          <Input
            disabled={!!fileURL}
            type="text"
            placeholder="Paste the image URL"
            className="placeholder:text-foreground"
            onChange={(e) => {
              if (e.target.value == "") {
                setImageURL(e.target.value);
                setPrediction([]);
              }
              setTempUrl(e.target.value);
            }}
          />
          <Button
            variant={"secondary"}
            disabled={!tempUrl || !!fileURL}
            onClick={() => {
              const getValidURl = async (url: string) => {
                try {
                  await axios.get(url);
                  setImageURL(url);
                } catch (error) {
                  if (error instanceof Error) {
                    console.log(error.message);
                  }
                }
              };
              if (tempUrl) {
                getValidURl(tempUrl);
              } else {
                setImageURL("");
              }
            }}
          >
            Get Image
          </Button>
        </div>
        {(fileURL || imageURL) && (
          <div className="flex flex-col items-center gap-4 rounded-sm border p-4 md:flex-row">
            <div className="m-auto size-52 self-stretch md:min-h-60 md:w-64">
              <img
                crossOrigin="anonymous"
                src={fileURL! || imageURL!}
                alt="image"
                className="size-full rounded-sm object-cover"
                ref={imageRef}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 self-stretch">
              {prediction.length > 0 &&
                prediction.map((item, key) => (
                  <div
                    key={key}
                    className={cn(
                      "rounded-sm bg-secondary p-2 px-4",
                      key == 0 && "border-2  border-green-400",
                    )}
                  >
                    <h1 className="text-md font-bold capitalize">
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
          disabled={loadingModel || (!fileURL && !imageURL)}
        >
          {!loadingModel ? "Classify" : "Loading Model"}
        </Button>
      </div>
    </section>
  );
}
