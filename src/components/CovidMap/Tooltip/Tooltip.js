import React from "react";
import { Popup } from "react-map-gl";
import './Tooltip.css';

function Tooltip(props) {
  const details = props.details;
  const fields = props.fields;
  const handleCloseTooltip = () => {
    props.handleCloseTooltip();
  };

  const regex = /\B(?=(\d{3})+(?!\d))/g;

  return (
    <Popup
      tipSize={0}
      longitude={details.coordinates.longitude}
      latitude={details.coordinates.latitude}
      closeButton={true}
      onClose={handleCloseTooltip}
    >
      <div className="map-tooltip">
        <div className="map-tooltip-field">
          <div
            className="map-tooltip-flag"
            style={{ backgroundImage: `url(${details.flag})` }}
          />
          <div className="map-tooltip-header">{details.name}</div>
        </div>

        <div className="margin" />

        {fields.map((field, index) => (
          <div className="map-tooltip-field" key={index}>
            <div className="map-tooltip-label">{field}:</div>
            <div className="map-tooltip-value">
              {details[field].toString().replace(regex, ",")}
            </div>
          </div>
        ))}
      </div>
    </Popup>
  );
}

export default Tooltip;
