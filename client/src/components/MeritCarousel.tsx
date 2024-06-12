import React, { useEffect, useState } from "react";
import meritsJSON from "../assets/merits.json";
import MeritCard from "./MeritCard";
import MeritCarouselButton from "./MeritCarouselButton";

const MeritCarousel = () => {
  const [firstHalf, setFirstHalf] = useState(true);
  const [merits, setMerits] = useState(meritsJSON.slice(0, 3));

  const handleClick = () => {
    setFirstHalf((prev) => !prev)
  }

  useEffect(() => {
    setMerits(firstHalf ? meritsJSON.slice(0, 3) : meritsJSON.slice(3, 6));
  }, [firstHalf])

  return (
    <div className="relative bg-timberwolf/80">
      <div key={firstHalf ? 1 : 2} className="grid grid-cols-3 grid-rows-1 gap-24 p-12 place-items-center w-full animate-fade">
        {merits.map((merit) => (
          <MeritCard key={merit.id} merit={merit} />
        ))}
      </div>
      <div className="flex absolute inset-0 justify-between p-4 items-center">
        <MeritCarouselButton direction="left" onClick={handleClick}/>
        <MeritCarouselButton direction="right" onClick={handleClick}/>
      </div>
    </div>
  );
};

export default MeritCarousel;