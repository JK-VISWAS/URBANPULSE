import React from 'react';

const LandingPage = ({ onEnter }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* 1. THE VIDEO LAYER */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-[0.4]"
      >
        <source src={`${import.meta.env.BASE_URL}assets/hero.mp4`} type="video/mp4" />
      </video>

      {/* 2. THE INTERACTIVE LAYER */}
      <div className="relative z-10 text-center animate-slide-up px-4">
        <h1 className="text-4xl md:text-8xl font-black italic uppercase text-white tracking-tighter mb-8 drop-shadow-2xl">
          URBAN<span className="text-indigo-500">PULSE</span>
        </h1>

        <button
          onClick={onEnter}
          className="bg-indigo-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-[32px] text-lg md:text-xl font-bold uppercase tracking-widest
                     hover:bg-indigo-500 hover:scale-105 transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)]"
        >
          ENTER PLATFORM
        </button>
      </div>
    </div>
  );
};

export default LandingPage;