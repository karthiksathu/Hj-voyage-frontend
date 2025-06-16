import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularDestinations from "@/components/home/PopularDestinations";
import Testimonials from "@/components/home/Testimonials";
import SpecialOffers from "@/components/home/SpecialOffers";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // References to sections
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Function to check if element is in viewport
  const useIntersectionObserver = (refs: React.RefObject<HTMLElement>[]) => {
    useEffect(() => {
      const observers: IntersectionObserver[] = [];

      refs.forEach((ref) => {
        if (ref.current) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("animate-content-load");
                  entry.target.classList.add("opacity-100");
                  entry.target.classList.remove("opacity-0");
                  // Once animated, no need to observe anymore
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "0px",
              threshold: 0.15, // Increased threshold for more visible entry
            }
          );

          observer.observe(ref.current);
          observers.push(observer);
        }
      });

      // Cleanup
      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    }, [refs]);
  };

  // Apply the observer
  useIntersectionObserver([
    whyChooseUsRef,
    destinationsRef,
    offersRef,
    testimonialsRef,
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#002444]">
      <Navbar />
      <main className="flex-1">
        <Hero />

        <div
          ref={destinationsRef}
          className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out bg-[#f5faff]"
        >
          <PopularDestinations />
        </div>

        <div
          ref={whyChooseUsRef}
          className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out bg-[#e6f4fa]"
        >
          <WhyChooseUs />
        </div>

        <div
          ref={offersRef}
          className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out bg-[#0372aa]"
          id="offers"
        >
          <SpecialOffers />
        </div>

        <div
          ref={testimonialsRef}
          className="opacity-0 transform translate-y-8 transition-all duration-1000 ease-out bg-[#024b74]"
        >
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
