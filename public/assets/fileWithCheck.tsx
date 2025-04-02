import React from 'react';

const FileWithCheck = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M7.29545 1.5C4.84955 1.5 3.62659 1.5 2.7773 2.09838C2.53396 2.26982 2.31794 2.47314 2.13578 2.70217C1.5 3.5015 1.5 4.65252 1.5 6.95455V8.86365C1.5 11.0861 1.5 12.1972 1.85171 13.0846C2.41711 14.5114 3.61285 15.6368 5.12877 16.1689C6.07172 16.5 7.25236 16.5 9.61365 16.5C10.963 16.5 11.6376 16.5 12.1764 16.3109C13.0427 16.0068 13.7259 15.3637 14.049 14.5484C14.25 14.0413 14.25 13.4063 14.25 12.1364V11.625"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 5.625C11.25 5.625 11.625 5.625 12 6.375C12 6.375 13.1911 4.5 14.25 4.125"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 5.25C16.5 7.32107 14.821 9 12.75 9C10.679 9 9 7.32107 9 5.25C9 3.17893 10.679 1.5 12.75 1.5C14.821 1.5 16.5 3.17893 16.5 5.25Z"
        stroke="white"
        strokeLinecap="round"
      />
      <path
        d="M1.5 9C1.5 10.3807 2.61929 11.5 4 11.5C4.49934 11.5 5.08803 11.4125 5.57353 11.5426C6.00489 11.6581 6.34182 11.9951 6.45741 12.4264C6.5875 12.912 6.5 13.5007 6.5 14C6.5 15.3807 7.61933 16.5 9 16.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FileWithCheck;
