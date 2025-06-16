import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useLanguage } from "@/components/language/LanguageProvider";

const OffersPage = () => {
  const { t } = useLanguage();
  const [activeOffers, setActiveOffers] = useState<any[]>([]);
  const [expiredOffers, setExpiredOffers] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/aerovoyage/All/offers");
      const result = await response.json();

      // Fix: Access 'data' instead of 'offers'
      const offers = Array.isArray(result) ? result : result.data;

      if (!Array.isArray(offers)) {
        throw new Error("Invalid data format: expected an array of offers");
      }

      const currentDate = new Date();

      const active = offers.filter((offer: any) =>
        offer.is_active && new Date(offer.expiry) >= currentDate
      );
      const expired = offers.filter((offer: any) =>
        !offer.is_active || new Date(offer.expiry) < currentDate
      );

      const formatOffer = (offer: any, isExpired = false) => ({
        id: offer.offer_id,
        title: offer.title,
        description: offer.description,
        discount: offer.discount,
        expiry: isExpired
          ? `Expired on ${new Date(offer.expiry).toLocaleDateString()}`
          : `Valid until ${new Date(offer.expiry).toLocaleDateString()}`,
        badge: isExpired ? "Expired" : "Limited Time",
        code: offer.code,
      });

      setActiveOffers(active.map((o: any) => formatOffer(o, false)));
      setExpiredOffers(expired.map((o: any) => formatOffer(o, true)));
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
  };

  fetchOffers();
}, []);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="mb-4">Special Offers & Promotions</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take advantage of our exclusive deals and save on your next flight booking. Browse our current and past offers below.
            </p>
          </div>

          <Tabs defaultValue="active" className="mb-12">
            <TabsList className="w-full max-w-md mx-auto">
              <TabsTrigger value="active" className="flex-1">Active Offers</TabsTrigger>
              <TabsTrigger value="expired" className="flex-1">Past Offers</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeOffers.map((offer, index) => (
                  <Card
                    key={offer.id}
                    className={`border border-gray-200 dark:border-gray-700 overflow-hidden hover-lift transition-all duration-500 dark:bg-gray-800 ${
                      isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{offer.title}</CardTitle>
                        <Badge variant="secondary" className="bg-sky-light text-sky dark:bg-sky/20">
                          {offer.badge}
                        </Badge>
                      </div>
                      <CardDescription>{offer.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 text-center">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Use code:</span>
                        <span className="font-mono text-lg font-bold dark:text-white">{offer.code}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-accent font-bold text-xl">{offer.discount}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{offer.expiry}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="expired" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expiredOffers.map((offer, index) => (
                  <Card
                    key={offer.id}
                    className={`border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 dark:bg-gray-800 opacity-70 ${
                      isLoaded ? "opacity-70 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{offer.title}</CardTitle>
                        <Badge variant="outline" className="bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {offer.badge}
                        </Badge>
                      </div>
                      <CardDescription>{offer.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg mb-4 text-center">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Code:</span>
                        <span className="font-mono text-lg font-bold dark:text-white line-through">{offer.code}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 font-bold text-xl line-through">{offer.discount}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{offer.expiry}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-12">
            <h3 className="mb-4">How to use promo codes</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Find a promo code that matches your travel plans</li>
              <li>Copy the code from the offer card</li>
              <li>Enter the promo code during checkout when booking your flight</li>
              <li>The discount will be automatically applied to your total</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
