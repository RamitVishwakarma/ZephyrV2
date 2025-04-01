import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-4 pt-4">
      <Link href="https://www.instagram.com/gdgoncampus.jss/" target="_blank">
        <Image src="/images/gdscLogo.png" alt="logo" width={50} height={50} />
      </Link>
      <h1 className="text-base text-[#BDC1C5]">Zephyr</h1>
    </div>
  );
};

export default Header;
