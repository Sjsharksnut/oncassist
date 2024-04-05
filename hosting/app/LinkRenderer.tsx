// LinkRenderer.tsx

import React from "react";

const LinkRenderer: React.FC<{ value: string }> = (props) => {
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

export default LinkRenderer;
