
import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const DrawingTools = ({ map, onDrawnFeaturesChange }) => {
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (map) {
      const drawInstance = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          point: true,
          line_string: true,
          polygon: true,
          trash: true,
        },
      });
      map.addControl(drawInstance);

      setDraw(drawInstance);

      return () => {
        map.removeControl(drawInstance);
      };
    }
  }, [map]);

  useEffect(() => {
    if (draw) {
      draw.on("draw.create", updateFeatures);
      draw.on("draw.delete", updateFeatures);
      draw.on("draw.update", updateFeatures);
    }

    return () => {
      if (draw) {
        draw.off("draw.create", updateFeatures);
        draw.off("draw.delete", updateFeatures);
        draw.off("draw.update", updateFeatures);
      }
    };
  }, [draw]);

  const updateFeatures = () => {
    const drawnFeatures = draw.getAll();
    onDrawnFeaturesChange(drawnFeatures);
  };

  return null;
};

export default DrawingTools;
