import React from 'react';

import Header from './header';
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[100dvh] overflow-hidden bg-[#1C1C1C]">
      <div className="bg-[url('/texture.png')] bg-repeat">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
