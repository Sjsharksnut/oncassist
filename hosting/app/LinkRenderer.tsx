// LinkRenderer.tsx

import React from "react";

const LinkRenderer: React.FC<{ value: string }> = (props) => {
  // Check if the value is a valid URL
  const isValidURL = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  // Render the full text or a link based on the value
  const renderContent = (value: string) => {
    if (isValidURL(value)) {
      // Render a link if the value is a valid URL
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      );
    } else {
      // Render the full text if it's not a URL
      return <span>{value}</span>;
    }
  };

  return (
    <div>
      {renderContent(props.value)}
    </div>
  );
};

export default LinkRenderer;
