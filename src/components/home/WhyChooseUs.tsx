import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const WhyChooseUs = () => {
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
      title: "Explore Premium Hotels",
      description: "Explore over 1 million+ premium hotels worldwide.",
    },
    {
      title: "Exclusive Flight Deals",
      description: "Unlock exclusive flight deals and first-class perks.",
    },
    {
      title: "Loyalty Rewards",
      description: "Earn loyalty rewards with every booking.",
    },
    {
      title: "Expert Travel Support",
      description: "Get expert support from dedicated travel advisors.",
    },
    {
      title: "Personalized Planning",
      description: "Enjoy fully personalized travel planning services.",
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-[#002444]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#024b74] dark:text-white mb-4">
            HJ{" "}
            <span style={{ color: "#0372aa" }}>
              Voyages
            </span>{" "}
            — Where Luxury Journeys Begin
          </h2>
          <p className="text-[#024b74] dark:text-[#ffffffcc] mb-10">
            Since our inception, HJ{" "}
            <span style={{ color: "#0372aa" }}>
              Voyages
            </span>{" "}
            has redefined the art of travel for those seeking elegance,
            exclusivity, and effortless sophistication. We specialize in
            crafting unforgettable journeys — curated flights, five-star stays,
            bespoke packages, and immersive experiences tailored to your
            desires.
          </p>
          <h2 className="mb-4 text-[#024b74] dark:text-white">
            Why Choose HJ Voyages?
          </h2>
          <p className="text-[#024b74] dark:text-[#ffffffcc]">
            We provide an exceptional travel experience with premium features
            designed for your comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`border border-[#0372aa] dark:border-[#024b74] overflow-hidden hover-lift dark:bg-[#002444] transition-all duration-700 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-[#0372aa]/10 dark:bg-[#024b74]/20 p-2 rounded-full">
                      <Check className="h-5 w-5 text-[#0372aa]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white text-[#024b74]">
                      {feature.title}
                    </h3>
                    <p className="text-[#024b74] dark:text-[#ffffffcc]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
