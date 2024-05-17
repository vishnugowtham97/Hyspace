import * as turf from "@turf/turf";

export const measureDistance = (coordinates) => {
  const from = turf.point(coordinates[0]);
  const to = turf.point(coordinates[1]);
  const options = { units: "kilometers" };
  const distance = turf.distance(from, to, options);
  return distance;
};
