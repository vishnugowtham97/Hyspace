// components/Map.js

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [draw, setDraw] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidmlzaG51Z293dGhhbTk3IiwiYSI6ImNsd2EydmllNjA3ZTUya3BhNm1pZGp2ZTQifQ.LDs2OImw3rV6022FOZeRkQ";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-122.4194, 37.7749],
      zoom: 10,
    });

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

    mapRef.current = map;

    map.on("click", handleMapClick);

    return () => {
      map.remove();
    };
  }, []);

  const handleMapClick = (e) => {
    const newMarker = new mapboxgl.Marker()
      .setLngLat(e.lngLat)
      .addTo(mapRef.current);
    setMarkers([...markers, newMarker]);
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "140%", height: "500px" }} />
      <div>
        <h3>Point Marker Management</h3>
        <ul>
          {markers.map((marker, index) => (
            <li key={index}>
              Marker {index + 1}: {JSON.stringify(marker.getLngLat())}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
