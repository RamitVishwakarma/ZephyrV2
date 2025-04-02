import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <>
      <div className="md:hidden">
        <div className="flex items-center justify-between px-4 pt-4">
          <Link href="https://www.instagram.com/gdgoncampus.jss/" target="_blank">
            <Image src="/images/gdscLogo.png" alt="logo" width={48} height={32} />
          </Link>
          <h1 className="text-base text-[#BDC1C5]">Zephyr</h1>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-2">
            <Link href="https://www.gdscjss.in/" target="_blank">
              <Image src="/images/gdscLogo.png" alt="logo" width={48} height={32} />
            </Link>
            <div className="flex flex-col text-base text-[#BDC1C5]">
              <p className="font-bold">Google Developer Groups OnCampus</p>
              <p className="text-xs">JSS Academy of Technical Education</p>
            </div>
          </div>
          <h1 className="text-base text-[#BDC1C5]">Zephyr</h1>
        </div>
      </div>
    </>
  );
};

export default Header;
