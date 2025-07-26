"use client";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import colors from "tailwindcss/colors";

const latLon = [-0.17009, 51.648152];

export function Map() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the pin feature
    const pinFeature = new Feature({
      geometry: new Point(fromLonLat(latLon)), // Same coordinates as map center
      name: "Mobile Mechanics & Tyres", // Add data to the feature
      description: "Professional vehicle services",
    });

    // Style the pin
    pinFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1], // Anchor at bottom center of icon
          src:
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${colors.sky[800]}" stroke="${colors.sky[800]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path fill="${colors.sky[600]}" d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3" fill="${colors.sky[600]}"/></svg>
          `),
          scale: 1.5,
        }),
      })
    );

    // Create vector source and layer
    const vectorSource = new VectorSource({
      features: [pinFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new OlMap({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer, // Add the vector layer with the pin
      ],
      view: new View({
        //Coordinate System: WGS 84 / Pseudo-Mercator-EPSG:3857
        center: fromLonLat(latLon), // [longitude, latitude]
        zoom: 18,
      }),
    });
    map.setTarget(ref?.current || undefined);
    // on component unmount remove the map refrences to avoid unexpected behaviour
    return () => {
      map.setTarget(undefined);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className="absolute inset-0 h-full w-full text-blue-900"
      ></div>
    </>
  );
}
