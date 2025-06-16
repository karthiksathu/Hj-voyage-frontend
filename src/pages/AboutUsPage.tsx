import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AboutUsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsLoaded(true);
          }, 300);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "Luxury Flights",
      description:
        "Access first-class and business-class fares with exclusive pricing from world-renowned airlines.",
    },
    {
      title: "Handpicked Hotels & Villas",
      description:
        "Stay at the most exquisite properties worldwide – boutique hotels, chalets, and private villas.",
    },
    {
      title: "Tailored Experiences",
      description:
        "Wellness retreats, honeymoon escapes, family adventures – each itinerary custom crafted.",
    },
    {
      title: "Private Transfers & Tours",
      description:
        "Travel in style with chauffeur-driven transfers and immersive, locally-led tours.",
    },
    {
      title: "Loyalty Rewards",
      description:
        "Earn rewards with every booking and enjoy personalized perks and upgrades.",
    },
    {
      title: "Expert Travel Advisors",
      description:
        "Get support from passionate professionals who handle every detail with care.",
    },
  ];

  const benefits = [
    "Explore over 1 million+ premium hotels worldwide.",
    "Unlock exclusive flight deals and first-class perks.",
    "Earn loyalty rewards with every booking.",
    "Get expert support from dedicated travel advisors.",
    "Enjoy fully personalized travel planning services.",
  ];

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="py-20 bg-[#ffffff] dark:bg-[#002444]" // White / Rhapsody in Blue
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#002444] dark:text-[#ffffff] mb-4">
              HJ <span style={{ color: "#0372aa" }}>Voyages</span> — Where Luxury Journeys Begin
            </h2>
            <p className="text-[#024b74] dark:text-[#ffffff] leading-relaxed">
              Since our inception, HJ Voyages has redefined the art of travel for those seeking elegance,
              exclusivity, and effortless sophistication. We specialize in crafting unforgettable journeys —
              curated flights, five-star stays, bespoke packages, and immersive experiences tailored to your desires.
            </p>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-4xl font-semibold text-[#002444] dark:text-[#ffffff]">
              What We Offer:
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`border border-[#024b74] dark:border-[#0372aa] overflow-hidden hover-lift dark:bg-[#002444] transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: "rgba(3, 114, 170, 0.1)", // Reef Escape 10%
                        }}
                      >
                        <Check className="h-5 w-5 text-[#0372aa]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-[#002444] dark:text-[#ffffff]">
                        {feature.title}
                      </h3>
                      <p className="text-[#024b74] dark:text-[#ffffff]">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto my-16">
            <h2 className="text-4xl font-semibold mb-4" style={{ color: "#0372aa" }}>
              Why Choose HJ Voyages?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((point, index) => (
              <Card
                key={index}
                className={`border border-[#024b74] dark:border-[#0372aa] overflow-hidden hover-lift dark:bg-[#002444] transition-all duration-700 ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <div
                        className="p-2 rounded-full"
                        style={{
                          backgroundColor: "rgba(3, 114, 170, 0.1)", // Reef Escape 10%
                        }}
                      >
                        <Check className="h-5 w-5 text-[#0372aa]" />
                      </div>
                    </div>
                    <p className="text-[#024b74] dark:text-[#ffffff]">{point}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center max-w-2xl mx-auto mt-16">
            <p className="text-lg font-semibold text-[#002444] dark:text-[#ffffff] mb-2">
              Whether it’s a spontaneous weekend away or a meticulously planned dream honeymoon, we handle every detail so you can simply enjoy the journey.
            </p>
            <p className="text-lg font-bold text-[#024b74]">
              Life is short. The world is wide. Travel it beautifully with HJ Voyages.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
