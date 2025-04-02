import React from 'react';

const UserWithStar = ({ width, height }: { width: number; height: number }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M13.6211 2.6496C12.7925 2.38933 11.9106 2.24902 10.9961 2.24902C6.1636 2.24902 2.24609 6.16653 2.24609 10.999C2.24609 15.8315 6.1636 19.749 10.9961 19.749C15.8285 19.749 19.7461 15.8315 19.7461 10.999C19.7461 10.0845 19.6057 9.20268 19.3455 8.37402"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.625 9.25098C13.625 10.7008 12.4498 11.876 11 11.876C9.55021 11.876 8.375 10.7008 8.375 9.25098C8.375 7.80123 9.55021 6.62598 11 6.62598C12.4498 6.62598 13.625 7.80123 13.625 9.25098Z"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.31641 17.5635L5.80676 16.7054C6.58569 15.3423 8.03532 14.501 9.60536 14.501H12.4025C13.9725 14.501 15.4221 15.3423 16.201 16.7054L16.6914 17.5635"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1059 2.26782C17.111 2.24276 17.1469 2.24276 17.1519 2.26782C17.4179 3.56859 18.4343 4.58513 19.7351 4.85099C19.7602 4.85612 19.7602 4.89193 19.7351 4.89705C18.4343 5.16291 17.4179 6.17945 17.1519 7.48023C17.1469 7.50529 17.111 7.50529 17.1059 7.48023C16.84 6.17945 15.8235 5.16291 14.5227 4.89705C14.4976 4.89193 14.4976 4.85612 14.5227 4.85099C15.8235 4.58513 16.84 3.56859 17.1059 2.26782Z"
        stroke="white"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UserWithStar;
