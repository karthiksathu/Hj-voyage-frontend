import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  price: string;
}

const PopularDestinations = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Slower loading animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const destinations: Destination[] = [
    {
      id: 1,
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
      price: "$299",
    },
    {
      id: 2,
      name: "New York",
      country: "United States",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: "$350",
    },
    {
      id: 3,
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: "$650",
    },
    {
      id: 4,
      name: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      price: "$420",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-[#002444] mb-4">Popular Destinations</h2>
            <p className="text-[#024b74]">
              Discover our most sought-after flight destinations. Explore new places and create unforgettable memories.
            </p>
          </div>
          <Button variant="link" asChild className="flex items-center mt-4 md:mt-0 text-[#0372aa]">
            <Link to="/destinations">
              View All Destinations <ChevronRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Card
              key={destination.id}
              className={`overflow-hidden hover-lift transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 300}ms`, borderColor: "#0372aa" }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-medium">From {destination.price}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium text-[#024b74]">{destination.name}</h3>
                <p className="text-[#0372aa]">{destination.country}</p>
                <Button variant="link" className="p-0 mt-2 text-[#0372aa]" asChild>
                  <Link to={`/flights?destination=${destination.name}`}>
                    Find Flights <ChevronRight size={14} className="ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
