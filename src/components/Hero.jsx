import React from 'react'

const Hero = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Your Identity, Your Right</h1>
            <p className="py-6 text-3xl">
            The next gen social app. Have ownership of ypur identity and make and join groups privately.
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero
