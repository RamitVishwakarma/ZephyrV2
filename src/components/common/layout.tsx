import React from 'react';
import Header from './header';
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-[#1C1C1C]">
      <div className="bg-custom-pattern z-10 size-full bg-repeat">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
