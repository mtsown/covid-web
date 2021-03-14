import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import Tooltip from "../Tooltip/Tooltip";
import './Map.css';

const TOKEN =
  "pk.eyJ1Ijoiam9udGF5eXciLCJhIjoiY2s4aXcwbnA0MGFqYjNscDZicm9haXA3cCJ9.rI3D6Y4ZETQnYukX9RCOow";

function Map(props) {
  const [mapData, setMapData] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [viewport, setViewport] = useState({
    width: "80%",
    height: "100%",
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  useEffect(() => {
    prepareData();
  }, [props]);

  const prepareData = () => {
    const { colors, data, query } = props;

    const newMapData = data.filter(f => f[query] > 0);
    const counts = newMapData.map(e => e[query]);
    const maxCount = Math.max(...counts);
    const minCount = Math.min(...counts);
    const diff = maxCount - minCount;
    const div = diff * 0.2;
    const div2 = diff * 0.8;

    for (const d of newMapData) {
      if (d[query] >= div2) {
        d.size = 55;
      } else if (d[query] < div2 && d[query] >= div) {
        d.size = 35;
      } else {
        d.size = 15;
      }

      switch (query) {
        case "confirmed":
          d.color = colors[0];
          break;
        case "deaths":
          d.color = colors[1];
          break;
        case "recovered":
          d.color = colors[2];
          break;
        default:
          d.color = colors[0];
      }
    }

    setMapData(newMapData);
  };

  const handleCloseTooltip = () => {
    setTooltip(null)
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={(newViewport) => setViewport(newViewport)}
    >
      {mapData.map((country, index) => {
        const longitude = Number(country.coordinates.longitude);
        const latitude = Number(country.coordinates.latitude);

        return (
          <Marker key={index} longitude={longitude} latitude={latitude}>
            <div
              className="map-marker"
              style={{
                backgroundColor: country.color,
                height: country.size,
                width: country.size
              }}
              onClick={() => setTooltip(country)}
            />
          </Marker>
        );
      })}

      {tooltip && (
        <Tooltip
          details={tooltip}
          fields={props.fields}
          handleCloseTooltip={handleCloseTooltip}
        />
      )}

      <div className="map-nav">
        <NavigationControl
          onViewportChange={(newViewport) => setViewport(newViewport)}
        />
      </div>
    </ReactMapGL>
  );
}

export default Map;
