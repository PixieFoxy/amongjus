import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="text-center flex flex-col justify-center items-center p-8 gap-6">
      <span className="icon-[fa6-solid--triangle-exclamation] w-24 h-24 text-yellow-500"></span>
      <h1 className="text-6xl font-bungee-shade">404 Not Found</h1>
      <h3 className="text-2xl font-overlock">Actually, you found a non-existent page. There's nothing you can do here.</h3>
      <Link to="/" className="text-2xl text-ash-gray-400 font-roboto-mono bg-battleship-gray hover:bg-feldgrau hover:font-bold rounded-lg mt-8 p-4">YEET ME BACK!</Link>
    </section>
  );
};

export default NotFound;
