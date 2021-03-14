import React from "react";
import './Legend.css';

function Legend(props) {
  const handleSelectLegend = (label) => {
    props.handleSelectLegend(label);
  };

  return (
    <div className="legend">
      {props.fields.map((field, index) => (
        <div
          className="legend-field"
          key={index}
          onClick={() => handleSelectLegend(field)}
        >
          <div
            className={`legend-icon ${props.query === field ? "legend-icon-active" : ""
              }`}
            style={{
              backgroundColor: props.colors[index]
            }}
          />
          <div
            className={`legend-label ${props.query === field ? "legend-label-active" : ""
              }`}
          >
            {field}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Legend;
