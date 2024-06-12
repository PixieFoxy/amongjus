import React from "react";

export type Merit = {
  id: number;
  icon: string;
  title: string;
  desc: string;
};

/* Need to have this to enable dynamic value of tailwind classes
 * Icons to use:
 * icon-[icon-park-outline--pure-natural] icon-[carbon--sustainability] icon-[bx--donate-heart] icon-[streamline--target] icon-[arcticons--iconrequest] icon-[file-icons--jsx-atom]
 */

const MeritCard = ({ merit }: { merit: Merit }) => {

  let bg: string;
  switch (merit.id % 3) {
    case 2:
      bg = 'bg-feldgrau bg-opacity-80';
      break;
    case 1:
      bg = 'bg-battleship-gray';
      break;
    case 0:
    default:
      bg = 'bg-ash-gray';
      break;
  }

  return (
    <div className={`flex-col flex-wrap justify-start rounded-[64px] border-2 border-[#AAAAAA] p-8 space-y-[32px] w-[320px] h-[480px] ${bg}`}>
      <div className="text-center">
        <span className={`${merit.icon} text-black w-32 h-32`}></span>
      </div>
      <div className="text-center font-work-sans font-bold">
        {merit.title} <br />
      </div>
      <div className="text-center font-work-sans">{merit.desc}</div>
    </div>
  );
};

export default MeritCard;
