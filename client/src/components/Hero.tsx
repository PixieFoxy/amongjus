import React, { useEffect, useState } from "react";
const heroHeadings = [
  "LOSE YOUR WEIGHT?",
  "DETOXIFY YOUR BODY?",
  "NOURISH YOUR SKIN?",
  "UNLEASH YOUR POTENTIAL?"
];

const Hero = () => {
  const [headingIndex, setHeadingIndex] = useState(0);

  // Change the hero heading every 3 seconds and loops
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex(index => index + 1 < heroHeadings.length ? index + 1 : 0);
    }, 3000);
    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <section
        id="hero-section"
        className="bg-hero-background bg-center bg-cover bg-no-repeat w-full h-fit min-h-[80vh]"
      >
        <div
          id="hero-heading"
          className="bg-gradient-to-l from-white to-ash-gray w-fit inline-block font-bungee-shade text-6xl tracking-[0.15em] p-4 m-12 animate-slam"
        >
          { heroHeadings[headingIndex] }
        </div>
        <div
          id="hero-subheading"
          className="font-amita font-bold text-[2rem] leading-loose text-white mx-16 mb-28"
        >
          We will guide you to satisfy your craving for the ultimate{" "}
          <span>YOU</span>&mdash;
          <br />
          no matter the weather, the season, the recession&mdash;
          <br />
          your journey starts with üs and a bottle of our <span>JÜS.</span>
        </div>
        <div className="hero-buttons flex flex-nowrap h-fit w-fit gap-24 m-12 mb-0 pb-16">
          <button
            id="learn-more-button"
            className="grow-1 w-2/5 font-roboto-mono font-bold text-[#fcc21b] text tracking-[0.1em] text-3xl
          bg-gradient-learn-more"
          >
            LEARN MORE
          </button>
          <button
            id="action-button"
            className="grow-2 w-3/5 font-bungee tracking-[0.1em] text-4xl bg-gradient-action-button"
          >
            MINUM JÜS AJA COK
          </button>
        </div>
      </section>
    </>
  );
};

export default Hero;
