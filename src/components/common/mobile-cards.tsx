import React from 'react';

const MobileCards = ({
  cardTitle,
  Icon,
  onClick,
}: {
  cardTitle: string;
  Icon: React.ComponentType;
  onClick: () => void;
}) => {
  return (
    // Change cards width when u change the w in here
    <div
      onClick={onClick}
      className="relative flex min-w-[88vw] flex-shrink-1 flex-col rounded-[8px] border border-[#454545] bg-[url('/textureCard.png')] bg-repeat p-5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[8px] before:bg-gradient-to-r before:from-[rgba(255,255,255,0.10)] before:to-[rgba(153,153,153,0.10)]"
    >
      <div className="relative flex size-9 items-center justify-center rounded-full bg-[url('/IconBg.svg')]">
        <Icon />
      </div>
      <p className="relative max-w-[256px] pt-5 text-xl leading-[140%] font-normal text-wrap text-white">
        {cardTitle}
      </p>
    </div>
  );
};

export default MobileCards;
