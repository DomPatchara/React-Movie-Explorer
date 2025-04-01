import React from "react";
import Search from '../components/Search'

const Hero = () => {
  return (
    <header>
      <img src="/hero.png" alt="Hero-banner" className="lg:mt-10" />
      <h1>
        Explore <span className="text-gradient"> Movies & Shows </span> You'll
        enjoy Without the Fuss
      </h1>
      <Search />
    </header>
  );
};

export default Hero;
