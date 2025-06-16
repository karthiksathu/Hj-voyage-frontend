import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

const Testimonials = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Slower loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frequent Traveler",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      comment:
        "HJ Voyages made booking my international flight so simple. I found a great deal and the whole process was smooth.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Traveler",
      avatar: "https://randomuser.me/api/portraits/men/51.jpg",
      comment:
        "As someone who travels for work weekly, this platform has been a game-changer. Easy to use and reliable.",
      rating: 4,
    },
    {
      id: 3,
      name: "Emily Parker",
      role: "Family Vacation",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      comment:
        "Found amazing deals for our family trip to Europe. The customer service was excellent when we needed to modify our booking.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#002444]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="mb-4 text-[#024b74] dark:text-white">What Our Customers Say</h2>
          <p className="text-[#024b74] dark:text-[#ffffffcc]">
            Discover why travelers choose HJ Voyages for their flight booking needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`border border-[#0372aa] dark:border-[#024b74] dark:bg-[#002444] transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } hover-lift`}
              style={{ transitionDelay: `${index * 500}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-[#0372aa]/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-medium text-[#024b74] dark:text-white">{testimonial.name}</h4>
                    <p className="text-[#0372aa] dark:text-[#ffffffcc] text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-3 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < testimonial.rating
                          ? "text-yellow-400" // kept yellow for star highlight, could be changed if needed
                          : "text-[#0372aa]/50 dark:text-[#024b74]"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[#024b74] dark:text-[#ffffffcc]">{testimonial.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
