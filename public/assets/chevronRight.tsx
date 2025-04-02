import React from 'react';

const ChevronRight = ({ width = 25, height = 25 }: { width?: number; height?: number }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25" fill="none">
      <path d="M12.7848 5.90625L19.6914 12.8129L12.7848 19.7195" stroke="#BDC1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.87816 12.813L19.6914 12.813" stroke="#BDC1C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ChevronRight;
