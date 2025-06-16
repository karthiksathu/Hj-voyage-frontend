import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import { useToast } from "@/components/ui/use-toast";

interface UserDetails {
  id: number;
  LastName: string;
  email: string;
}

interface BookingData {
  booking_id: number;
  user_id: number;
  booking_reference: string;
  booking_status: string;
  flightNumber: string;
  from_city: string;
  to_city: string;
  travel_date: string;
  travellers: number;
  travel_class: string;
  total_price: number;
  Aerovoyagelogin: UserDetails;
}

const ManageBookingsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [bookingReference, setBookingReference] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [searchMethod, setSearchMethod] = useState("reference");
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingsList, setBookingsList] = useState<BookingData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setBookingData(null);
    setBookingsList([]);
    
    try {
      const baseUrl = "http://localhost:8000/api/v1/aerovoyage/bookings/search";
      let url;
      
      if (searchMethod === "reference") {
        if (!bookingReference || !lastName) {
          throw new Error("Both booking reference and last name are required");
        }
        url = `${baseUrl}?booking_reference=${encodeURIComponent(bookingReference)}&name=${encodeURIComponent(lastName)}`;
      } else {
        if (!email) {
          throw new Error("Email address is required");
        }
        url = `${baseUrl}-by-email?email=${encodeURIComponent(email)}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        let errorMessage = "Failed to fetch booking";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (searchMethod === "reference") {
        // Single booking response
        if (!data) {
          throw new Error("No booking data received");
        }
        setBookingData(data);
      } else {
        // Array of bookings response
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        if (data.length === 0) {
          throw new Error("No bookings found for this email");
        }
        setBookingsList(data);
      }
      
      toast({
        title: "Booking Found",
        description: searchMethod === "reference" 
          ? "Your booking details have been retrieved successfully."
          : `${data.length} bookings found for this email.`,
      });
    } catch (err) {
      console.error("Search error:", err);
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderBookingDetails = (booking: BookingData) => (
    <div key={booking.booking_id} className="mt-6 p-4 border rounded-lg dark:border-gray-700 mb-4">
      <h3 className="font-semibold mb-4 dark:text-white">Booking Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Booking Reference</p>
          <p className="dark:text-white font-medium">{booking.booking_reference}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Flight Number</p>
          <p className="dark:text-white font-medium">{booking.flightNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Route</p>
          <p className="dark:text-white font-medium">
            {booking.from_city} → {booking.to_city}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Travel Date</p>
          <p className="dark:text-white font-medium">
            {new Date(booking.travel_date).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Passenger</p>
          <p className="dark:text-white font-medium">
            {booking.Aerovoyagelogin?.LastName || 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Class</p>
          <p className="dark:text-white font-medium">{booking.travel_class}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Passengers</p>
          <p className="dark:text-white font-medium">{booking.travellers}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Price</p>
          <p className="dark:text-white font-medium">
            ${booking.total_price?.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-navy dark:text-white mb-4">Manage Your Bookings</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Access your flight details, make changes to your reservation, check in online, or cancel your booking.
              </p>
            </div>
            
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Find Your Booking</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Enter your booking details to retrieve your reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="reference" 
                  onValueChange={setSearchMethod} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="reference">Booking Reference</TabsTrigger>
                    <TabsTrigger value="email">Email Address</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reference" className="space-y-4">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <label htmlFor="reference" className="text-sm font-medium dark:text-gray-200">
                            Booking Reference
                          </label>
                          <Input 
                            id="reference"
                            value={bookingReference}
                            onChange={(e) => setBookingReference(e.target.value)}
                            placeholder="e.g. FGHT76" 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-200">
                            Last Name
                          </label>
                          <Input 
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name as shown on ID" 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          "Searching..."
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Search Booking
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="email" className="space-y-4">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email used during booking" 
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          "Searching..."
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" />
                            Search Booking
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Display single booking data if found by reference */}
                {bookingData && renderBookingDetails(bookingData)}

                {/* Display list of bookings if found by email */}
                {bookingsList.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-4 dark:text-white">
                      Your Bookings ({bookingsList.length})
                    </h3>
                    {bookingsList.map(booking => renderBookingDetails(booking))}
                  </div>
                )}

                {/* Display error if any */}
                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-700 dark:text-red-100">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <FileText className="h-10 w-10 text-accent mr-4" />
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Check-in Online</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Check in for your flight 24-48 hours before departure to secure your seat.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 dark:border-gray-600 dark:text-white"
                    disabled={!bookingData && bookingsList.length === 0}
                  >
                    Go to Online Check-in
                  </Button>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="h-10 w-10 text-accent mr-4" />
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Flight Status</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Check the current status of any flight to see if it's on time.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 dark:border-gray-600 dark:text-white"
                    disabled={!bookingData && bookingsList.length === 0}
                  >
                    Check Flight Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageBookingsPage;