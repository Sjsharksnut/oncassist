// LinkRenderer.js
import React from "react";

export const LinkRenderer = (props) => {
  const handleClick = () => {
    window.open(props.value, "_blank"); // Open the URL in a new tab
  };

  return (
    <div
      style={{
        cursor: "pointer",
        color: "blue",
        textDecoration: "underline"
      }}
      onClick={handleClick}
    >
      {props.value}
    </div>
  );
};
