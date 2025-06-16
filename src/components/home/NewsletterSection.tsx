import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("You've been subscribed to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#0372aa] to-[#002444] text-[#ffffff]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center appear-animated">
          <h2 className="mb-4">Get Travel Deals & Updates</h2>
          <p className="text-lg mb-8 text-white/90">
            Subscribe to our newsletter and be the first to receive exclusive flight deals, travel tips, and destination guides.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-[#0372aa] text-[#ffffff] placeholder:text-white/70 focus:border-[#0372aa]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0372aa] hover:bg-[#024b74] transition-colors"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-sm mt-4 text-white/80">
            By subscribing, you agree to our privacy policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
