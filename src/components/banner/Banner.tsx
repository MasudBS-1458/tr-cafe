import React from 'react';

const Banner: React.FC = () => {
  const handleOrderNow = () => {
    // Add your order now logic here
    console.log('Order Now clicked');
  };

  const handleDownloadApp = () => {
    // Add your download app logic here
    console.log('Download App clicked');
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-30 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='food-pattern' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'><circle cx='10' cy='10' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100' height='100' fill='url(%23food-pattern)'/></svg>")`
        }}
      />

      {/* Floating Elements */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-[20%] left-[-5%] text-2xl opacity-10 animate-[floatAround_15s_linear_infinite]">
          🚚
        </div>
        <div className="absolute top-[60%] right-[-5%] text-xl opacity-10 animate-[floatAround_15s_linear_infinite] [animation-delay:7.5s]">
          🏍️
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content Section */}
        <div className="text-white text-center lg:text-left animate-[slideInLeft_1s_ease-out]">
          {/* Badge */}
          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-[fadeInUp_1s_ease-out_0.2s_both]">
            ⚡ Fast Delivery in 30 Minutes
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent animate-[fadeInUp_1s_ease-out_0.4s_both]">
            Delicious Food<br />
            Delivered <em className="not-italic">Fast</em>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl mb-8 opacity-95 leading-relaxed animate-[fadeInUp_1s_ease-out_0.6s_both]">
            Satisfy your cravings with our extensive menu of restaurant favorites.
            Fresh ingredients, hot meals, and lightning-fast delivery right to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-[fadeInUp_1s_ease-out_0.8s_both]">
            <button
              onClick={handleOrderNow}
              className="flex items-center justify-center gap-2 bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🍽️ Order Now
            </button>
            <button
              onClick={handleDownloadApp}
              className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full text-lg font-semibold border-2 border-white/30 backdrop-blur-md hover:bg-white/20 hover:border-white/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              📱 Download App
            </button>
          </div>
        </div>

        {/* Visual Section */}
        <div className="relative animate-[slideInRight_1s_ease-out]">
          <div className="relative h-96 flex items-center justify-center">
            {/* Floating Food Items */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite]">
              🍕
            </div>
            <div className="absolute top-[30%] right-0 w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite] [animation-delay:0.5s]">
              🍔
            </div>
            <div className="absolute bottom-[30%] right-[10%] w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite] [animation-delay:1s]">
              🍜
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite] [animation-delay:1.5s]">
              🌮
            </div>
            <div className="absolute top-[30%] left-0 w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite] [animation-delay:2s]">
              🍣
            </div>
            <div className="absolute bottom-[30%] left-[10%] w-24 h-24 lg:w-30 lg:h-30 rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center text-3xl lg:text-4xl animate-[float_3s_ease-in-out_infinite] [animation-delay:2.5s]">
              🥗
            </div>

            {/* Center Plate */}
            <div className="w-40 h-40 lg:w-50 lg:h-50 bg-white/25 backdrop-blur-3xl border-3 border-white/30 rounded-full flex items-center justify-center text-5xl lg:text-6xl z-10 animate-[pulse_2s_ease-in-out_infinite]">
              🍽️
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col lg:flex-row gap-6 lg:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 lg:p-8 animate-[fadeInUp_1s_ease-out_1s_both]">
        <div className="text-center text-white">
          <span className="block text-2xl lg:text-3xl font-extrabold">50K+</span>
          <span className="text-sm opacity-80">Happy Customers</span>
        </div>
        <div className="text-center text-white">
          <span className="block text-2xl lg:text-3xl font-extrabold">1000+</span>
          <span className="text-sm opacity-80">Restaurant Partners</span>
        </div>
        <div className="text-center text-white">
          <span className="block text-2xl lg:text-3xl font-extrabold">30min</span>
          <span className="text-sm opacity-80">Average Delivery</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes floatAround {
          0% {
            transform: translateX(-100px) rotate(0deg);
          }
          100% {
            transform: translateX(calc(100vw + 100px)) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Banner;