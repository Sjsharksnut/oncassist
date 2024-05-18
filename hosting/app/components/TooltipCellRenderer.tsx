// TooltipCellRenderer.tsx
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Imports default styles

const TooltipCellRenderer = ({ value }) => {
  return (
    <Tippy content={value}>
      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </div>
    </Tippy>
  );
};

export default TooltipCellRenderer;


