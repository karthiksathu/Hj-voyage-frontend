import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      {/* Dark transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative container mx-auto px-4 grid md:grid-cols-2 items-center gap-12 z-10">
        {/* Left: Content */}
        <div className="space-y-6 text-white text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Explore the World with <br />
            <span className="text-[#024b74]">HJ</span>
            <span className="text-[#0372aa]"> Voyages</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            From seamless bookings to unforgettable destinations, we make travel effortless and exciting.
          </p>
          <Link to="/flights">
            <Button className="bg-[#0372aa] hover:bg-[#024b74] text-white font-bold text-xl px-8 py-4 mt-8 md:mt-12 transition-colors duration-200">
              Book a Flight
            </Button>
          </Link>
        </div>

        {/* Right: Swiper Carousel */}
        <div className="rounded-xl overflow-hidden shadow-2xl h-[500px] md:h-[500px]">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {[
              "/images/slide1.png",
              "/images/slide2.png",
              "/images/slide3.jpg",
              "/images/slide4.jpg",
              "/images/slide5.jpg",
            ].map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#002444]/30"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Hero;
