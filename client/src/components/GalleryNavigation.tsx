import React, { useState } from "react";

const GalleryNavigation = () => {
    // const[concoctionHover, setConcoctionHover] = useState(false);
    // const[paraHover, setParaHover] = useState(false);

  return (
    <div className="flex justify-between min-w-full h-[30rem] text-center font-overpass font-bold text-5xl text-white tracking-[0.15em] space-x-0 overflow-hidden">
      <div className="flex justify-center items-center bg-concoction-background bg-cover bg-center w-1/2 transition-[width] ease-in-out delay-100 duration-700 hover:w-full">
        <div className="w-full text-nowrap">our concoctions.</div>
      </div>
      <div className="flex justify-center items-center bg-paraphernalia-background bg-cover bg-center w-1/2 transition-[width] ease-in-out delay-100 duration-700 hover:w-full">
        <div className="w-full text-nowrap">our paraphernalia.</div>
      </div>
    </div>
  );
};

export default GalleryNavigation;
