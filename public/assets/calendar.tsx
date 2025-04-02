import React from 'react';

const Calendar = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M16.25 2.25V4M5.75 2.25V4"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9961 11.875H11.0039M10.9961 15.375H11.0039M14.4921 11.875H14.5M7.5 11.875H7.50785M7.5 15.375H7.50785"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5625 7.5H18.4375"
        stroke="white"
        strokeWidth="1.3125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.6875 11.2128C2.6875 7.4002 2.6875 5.49387 3.78311 4.30944C4.87871 3.125 6.64205 3.125 10.1688 3.125H11.8312C15.3579 3.125 17.1213 3.125 18.2169 4.30944C19.3125 5.49387 19.3125 7.4002 19.3125 11.2128V11.6622C19.3125 15.4748 19.3125 17.3811 18.2169 18.5656C17.1213 19.75 15.3579 19.75 11.8312 19.75H10.1688C6.64205 19.75 4.87871 19.75 3.78311 18.5656C2.6875 17.3811 2.6875 15.4748 2.6875 11.6622V11.2128Z"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Calendar;
