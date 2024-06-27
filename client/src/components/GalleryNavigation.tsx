import { Link } from "react-router-dom";

const GalleryNavigation = () => {

  return (
    <div className="flex justify-between min-w-full h-[30rem] text-center font-overpass font-bold text-5xl text-white tracking-[0.15em] space-x-0 overflow-hidden">
      <Link
        to="/menu"
        className="flex justify-center items-center bg-concoction-background bg-cover bg-center w-1/2 transition-[width] ease-in-out duration-700 hover:w-full"
      >
        <div className="w-full text-nowrap">our concoctions.</div>
      </Link>

      <Link
        to="/merch"
        className="flex justify-center items-center bg-paraphernalia-background bg-cover bg-center w-1/2 transition-[width] ease-in-out duration-700 hover:w-full"
      >
        <div className="w-full text-nowrap">our paraphernalia.</div>
      </Link>
    </div>
  );
};

export default GalleryNavigation;
