import { useState, useEffect } from "react";
import Classify from "./components/Classify";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";

const ImageClassifierPage = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [loadingModel, setLoadingModel] = useState(false);
  useEffect(() => {
    const getModel = async () => {
      try {
        setLoadingModel(true);
        const imageClassification = await mobilenet.load({
          version: 2,
          alpha: 1,
        });
        setModel(imageClassification);
        setLoadingModel(false);
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
        setLoadingModel(false);
      }
    };
    getModel();
  }, [setModel]);

  return <Classify model={model} loadingModel={loadingModel} />;
};

export default ImageClassifierPage;
