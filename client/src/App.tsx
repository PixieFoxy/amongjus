import React from "react";
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MeritCarousel from "./components/MeritCarousel";
import GalleryNavigation from "./components/GalleryNavigation";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <MeritCarousel />
      <GalleryNavigation />
      <Footer />
    </>
  );
};

export default App;
