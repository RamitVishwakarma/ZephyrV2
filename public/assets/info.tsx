import React from 'react'

const Info = ({ width = 15, height = 16, }: { width?: number; height?: number;  }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 16" fill="none">
      <g clipPath="url(#clip0_61_5678)">
        <path d="M7.5 14.1763C10.9518 14.1763 13.75 11.378 13.75 7.92627C13.75 4.47449 10.9518 1.67627 7.5 1.67627C4.04822 1.67627 1.25 4.47449 1.25 7.92627C1.25 11.378 4.04822 14.1763 7.5 14.1763Z" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 5.42627V7.92627" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 10.4263H7.50667" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_61_5678">
          <rect width="15" height="15" fill="white" transform="translate(0 0.42627)"/>
        </clipPath>
      </defs>
    </svg>
  )
}

export default Info
