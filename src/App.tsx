import { useState, useEffect } from "react";
import Classify from "./components/Classify";
import Navbar from "./components/Navbar";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs-backend-webgl";

const App = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [loadingModel, setLoadingModel] = useState(false);
  useEffect(() => {
    const getModel = async () => {
      try {
        setLoadingModel(true);
        const imageClassification = await mobilenet.load();
        setModel(imageClassification);
        setLoadingModel(false);
      } catch (error: unknown) {
        if (error instanceof Error) console.log(error.message);
        setLoadingModel(false);
      }
    };
    getModel();
  }, [setModel]);

  return (
    <>
      <Navbar />
      <div className="container p-4 grid place-items-center h-[80vh]">
        <Classify model={model} loadingModel={loadingModel} />
      </div>
    </>
  );
};

export default App;
