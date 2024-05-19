// components/DrawingTools.js

import React, { useEffect, useCallback } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const DrawingTools = ({ map, onDrawnFeaturesChange }) => {
  useEffect(() => {
    if (!map) return;

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });

    map.addControl(draw);

    const updateFeatures = () => {
      const data = draw.getAll();
      onDrawnFeaturesChange(data);
    };

    map.on("draw.create", updateFeatures);
    map.on("draw.update", updateFeatures);
    map.on("draw.delete", updateFeatures);

    return () => {
      map.off("draw.create", updateFeatures);
      map.off("draw.update", updateFeatures);
      map.off("draw.delete", updateFeatures);
      map.removeControl(draw);
    };
  }, [map, onDrawnFeaturesChange]);

  return null;
};

export default DrawingTools;
