// pages/_app.js

import React, { useState } from "react";
import "../styles/globals.css";
import FileUpload from "./api/FileUpload";
import Map from "./api/Map";
import DrawingTools from "./api/DrawingTools";

function MyApp({ Component, pageProps }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [drawnFeatures, setDrawnFeatures] = useState([]);

  const handleFileChange = (file) => {
    setUploadedFile(file);
    // Logic to render uploaded file on the map
  };

  const handleDrawnFeaturesChange = (features) => {
    setDrawnFeatures(features);
    // Logic to update drawn features on the map
  };

  return (
    <div>
      <h1>Map Application</h1>
      <FileUpload onFileChange={handleFileChange} />
      <Map uploadedFile={uploadedFile} drawnFeatures={drawnFeatures} />
      <DrawingTools onDrawnFeaturesChange={handleDrawnFeaturesChange} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
