
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import FlightFilter from "@/components/flights/FlightFilter";
import FlightCard from "@/components/flights/FlightCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import PassengerSelector from "@/components/flights/PassengerSelector";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";
import { generateXMLLog, sendLogToBackend } from "@/utils/logger";

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FlightsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchData = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [cabinClass, setCabinClass] = useState("economy");
  const [passengerCounts, setPassengerCounts] = useState({
      adults: 1,
      children: 0,
      infants: 0,
      seniors: 0
    });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const stripePromise = loadStripe("pk_test_51ROa8GFMWNAIQJhu2f4Xxdm66ncR3BEWJAawaGo6jN7ZNm0mXyBqUXcEVdwlopCQC8xiROqfWv3fBPleb2rrH3QP00lMcXoZHh");


  useEffect(() => {
  window.scrollTo(0, 0);
  const progressInterval = setInterval(() => {
    setLoadingProgress(prev => {
      if (prev >= 100) {
        clearInterval(progressInterval);
        return 100;
      }
      return prev + 5;
    });
  }, 100);

  const fetchFlights = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/v1/aerovoyage/flights/flights");
    const data = await res.json();

    // Transform backend data to frontend-friendly format
    const mappedFlights = data.map((flight: any) => ({
      id: flight.flightNumber || flight.id,
      airline: {
        name: flight.airline,
        logo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8kk7RHgdFGqXe-rrZwXwaMJ5hbOoEeT_vQ&usqp=CAU", // default logo
      },
      departureTime: new Date(flight.departureTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      departureAirport: flight.departureAirport,
      departureCode: flight.departureAirport?.slice(0, 3).toUpperCase() || "XXX",
      arrivalTime: new Date(flight.arrivalTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      arrivalAirport: flight.arrivalAirport,
      arrivalCode: flight.arrivalAirport?.slice(0, 3).toUpperCase() || "XXX",
      duration: flight.duration || "2h 30m",
      stops: 0,
      stopDetails: [],
      price: `$${flight.price}`,
      discount: "-10%", // default discount
      departDate: new Date(flight.departureTime).toISOString().split('T')[0],
    }));

    setFlights(mappedFlights);
    setFilteredFlights(mappedFlights);
    setIsLoading(false);
    setLoadingProgress(100);
  } catch (error) {
    console.error("Error fetching flights:", error);
    toast.error("Failed to load flights.");
    setIsLoading(false);
  }
};


  fetchFlights();

  return () => clearInterval(progressInterval);
}, []);


  const handleSearch = (searchData: any) => {
    console.log(searchData);
  setIsLoading(true);
  setLoadingProgress(0);

  const xmlLog = generateXMLLog({
  event: "flight_search",
  origin: searchData.origin,
  destination: searchData.destination,
  departDate: searchData.departDate,
  returnDate: searchData.returnDate,
  userId: localStorage.getItem("userId") || undefined,
});
sendLogToBackend(xmlLog);


  if (!searchData.origin || !searchData.destination) {
    toast.error("Please select both origin and destination.");
    setIsLoading(false);
    return;
  }

  // Simulate loading progress
  const progressInterval = setInterval(() => {
    setLoadingProgress((prev) => {
      if (prev >= 100) {
        clearInterval(progressInterval);
        return 100;
      }
      return prev + 8;
    });
  }, 100);

  // Filter existing flights (client-side)
  const filtered = flights.filter(
    (flight) =>
      flight.departureAirport.toLowerCase().includes(searchData.origin.toLowerCase()) &&
      flight.arrivalAirport.toLowerCase().includes(searchData.destination.toLowerCase())
  );

  // Update filteredFlights state
  setFilteredFlights(filtered);
  setIsLoading(false);
};


  const handleFilter = (filterData: any) => {
    // Apply filters to the flights
    console.log("Applying filters:", filterData);
    
    // Simulate filtering - in a real app, this would be more complex
    let filtered = [...flights];
    
    // Filter by price range
    filtered = filtered.filter(flight => {
      const price = parseInt(flight.price.replace('$', ''));
      return price >= filterData.priceRange[0] && price <= filterData.priceRange[1];
    });
    
    // Filter by airlines if any are selected
    if (filterData.airlines.length > 0) {
      filtered = filtered.filter(flight => {
        const airlineId = flight.airline.name.toLowerCase().replace(' ', '');
        return filterData.airlines.includes(airlineId);
      });
    }
    
    // Filter by stops if any are selected
    if (filterData.stops.length > 0) {
      filtered = filtered.filter(flight => {
        if (filterData.stops.includes('nonstop') && flight.stops === 0) return true;
        if (filterData.stops.includes('1stop') && flight.stops === 1) return true;
        if (filterData.stops.includes('2stops') && flight.stops >= 2) return true;
        return false;
      });
    }
    
    setFilteredFlights(filtered);
  };

  const handleFlightSelect = (flightId: string) => {
    console.log(`Selected flight: ${flightId}`);
    toast.success("Flight selected! Proceeding to booking details.");
    setSelectedFlightId(flightId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFlightId(null);
  };

  useEffect(() => {
    if (!selectedFlightId) return;
  
    const selectedFlight = flights.find(f => f.id === selectedFlightId);
    if (!selectedFlight) return;
  
    const numericPrice = parseFloat(selectedFlight.price.replace('$', ''));
  
    const total =
      passengerCounts.adults * numericPrice +
      passengerCounts.children * numericPrice +
      passengerCounts.infants * numericPrice +
      passengerCounts.seniors * numericPrice;
  
    setTotalPrice(total);
  }, [passengerCounts, selectedFlightId, flights]);

  const total_passengers = passengerCounts.adults + passengerCounts.children + passengerCounts.infants + passengerCounts.seniors;

 const handleConfirmBooking = async () => {
  const user_id = localStorage.getItem("userId"); 

  

  if (!user_id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
  const selectedFlight = flights.find(f => f.id === selectedFlightId);
  try {
    console.log("Confirm booking clicked");
    const response = await fetch("http://localhost:8000/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id : parseInt(user_id),
        from_city: selectedFlight.departureAirport,
        to_city: selectedFlight.arrivalAirport,
        travel_date: selectedFlight.departDate,
        departure_time: selectedFlight.departureTime,
        arrival_time: selectedFlight.arrivalTime,
        travel_class : cabinClass,
        travellers: total_passengers,
        total_price: totalPrice,
        flightId: selectedFlightId,
      }),
    });
    const xmlLog = generateXMLLog({
  event: "confirm_booking",
  origin: selectedFlight.departureAirport,
  destination: selectedFlight.arrivalAirport,
  departDate: selectedFlight.departDate,
  userId: user_id,
  passengers: passengerCounts,
  cabinClass,
});
sendLogToBackend(xmlLog);


    const data = await response.json();
    console.log("Stripe URL:", data.url);

    if (data.url) {
      
      window.location.assign(data.url);
    } else {
      throw new Error("No URL returned from server.");
    }
  } catch (error) {
    toast.error("Payment failed. Please try again.");
    console.error("Payment error:", error);
  }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=AeI1SXxkSJwsr0Hv0gAGDGZxjSW0AjGRLQJl_11ZPzy4UlRERU_JlpKVTDh0EqqHuzn6AiL0vYSdvBQe";//client id
    script.async = true;
    document.body.appendChild(script);
  }, []);

useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    console.log("Razorpay script loaded");
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);




  const handlePayWithPayPal = async () => {
    const user_id = localStorage.getItem("userId"); 
    const customerEmail = localStorage.getItem("email");
    const selectedFlight = flights.find(f => f.id === selectedFlightId);

    if (!user_id) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

  try {
    const response = await fetch("http://localhost:8000/api/paypal/create-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id : parseInt(user_id),
        from_city: selectedFlight.departureAirport,
        to_city: selectedFlight.arrivalAirport,
        travel_date: selectedFlight.departDate,
        departure_time: selectedFlight.departureTime,
        arrival_time: selectedFlight.arrivalTime,
        travel_class : cabinClass,
        travellers: total_passengers,
        total_price: totalPrice,
        flightId: selectedFlightId,
        customerEmail: customerEmail
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error("No PayPal URL received");
    }
  } catch (error) {
    console.error("PayPal error:", error);
    toast.error("Payment failed. Try again.");
  }
};


const handlePayWithRazorpay = async () => {
  const response = await fetch("http://localhost:8000/api/payments/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: totalPrice,
      receipt: `rcpt_${Date.now()}`,
    }),
  });

  const { order } = await response.json();

  const options: any = {
    key: "rzp_test_gz3AZ22eMPwfQi",
    amount: order.amount,
    currency: order.currency,
    name: "Aerovoyage",
    description: "Flight Booking",
    order_id: order.id,
    handler: (resp: any) => {
      navigate("/flights?payment=success");
    },
    prefill: {
      email: localStorage.getItem("email") || "",
    },
    theme: {
      color: "#3399cc",
    },
    method: {
      upi: true,
      netbanking: true,
      card: true,
      wallet: true,
      paylater: true,
    },
    webview_intent: true, // Ensures UPI apps open correctly on mobile
    config: {
      display: {
        blocks: {
          upi: {
            name: "UPI Apps",
            instruments: [
              { method: "upi", apps: ["gpay", "phonepe", "paytm", "bhim", "amazonpay"] },
            ],
          },
        },
        sequence: ["block.upi", "method.card", "method.netbanking"],
        preferences: {
          show_default_blocks: true,
        },
      },
    },
  };

  if (typeof window !== "undefined" && (window as any).Razorpay) {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } else {
    console.error("Razorpay SDK not loaded");
  }
};




const handleProceedToPay = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = (method: 'stripe' | 'paypal' | 'razorpay') => {
  setIsPaymentModalOpen(false);
  if (method === 'stripe') {
    handleConfirmBooking();
  } else if (method === 'paypal') {
    handlePayWithPayPal();
  } else if (method === 'razorpay') {
    handlePayWithRazorpay();
  }
};


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment");

    if (paymentStatus === "success") {
      setPopupMessage("Payment successful! Check your emails for details.");
      setShowPopup(true);
      navigate("/flights", { replace: true }); // removes ?payment=success from URL
    } else if (paymentStatus === "cancel") {
      setPopupMessage("Payment canceled or failed.");
      setShowPopup(true);
      navigate("/flights", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20">
        {/* Search Form */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-navy mb-6">Find Your Flight</h1>
            <FlightSearchForm onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Results section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="md:col-span-1">
              <FlightFilter onApplyFilters={handleFilter} />
            </div>
            
            {/* Flight results */}
            <div className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold">Flight Results</h2>
                <p className="text-gray-500 mb-3">
                  {!isLoading && `${filteredFlights.length} flights found`}
                </p>
                
                {/* Progress bar */}
                {isLoading && (
                  <Progress
                    value={loadingProgress}
                    className="h-1.5 transition-all duration-300"
                  />
                )}
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
                  <p className="text-gray-500">Searching for the best flights...</p>
                  <p className="text-gray-400 text-sm mt-1">This might take a moment</p>
                </div>
              ) : filteredFlights.length > 0 ? (
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      onSelect={handleFlightSelect} 
                    />
                  ))}
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Booking Details for {selectedFlightId}</h2>
                        <form>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="passengers" className="text-gray-700 font-medium">{("Passengers")}</Label>
                              <PassengerSelector 
                                value={passengerCounts} 
                                onChange={setPassengerCounts}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="cabinClass" className="text-gray-700 font-medium">{("CabinClass")}</Label>
                              <Select value={cabinClass} onValueChange={setCabinClass}>
                                <SelectTrigger className="bg-gray-50 border-gray-200 hover:border-gray-300 transition-colors duration-200">
                                  <SelectValue placeholder="Select class" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Economy">Economy</SelectItem>
                                  <SelectItem value="Premium">Premium Economy</SelectItem>
                                  <SelectItem value="Business">Business</SelectItem>
                                  <SelectItem value="First">First Class</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <h6>Total Price: ${totalPrice.toFixed(2)}</h6>
                          </div>
                          <button 
                            type="button"
                            className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded m-4" 
                            onClick={handleProceedToPay}
                          >
                            Proceed to Pay
                          </button>
                          <button
                            type="button"
                            onClick={closeModal}
                            className="ml-2 text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                  {isPaymentModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
                        <div className="space-y-4">
                          <div 
                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => handlePaymentMethodSelect('stripe')}
                          >
                            <div className="w-16 h-10 bg-white flex items-center justify-center mr-4">
                              <img 
                                src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" 
                                alt="Stripe" 
                                className="h-6"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">Credit/Debit Card</h3>
                              <p className="text-sm text-gray-500">Pay with Visa, Mastercard, etc.</p>
                              </div>
                          </div>
                          
                          <div 
                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center"
                            onClick={() => handlePaymentMethodSelect('paypal')}
                          >
                            <div className="w-16 h-10 bg-white flex items-center justify-center mr-4">
                              <img 
                                src="https://cdn.worldvectorlogo.com/logos/paypal-3.svg" 
                                alt="PayPal" 
                                className="h-6"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">PayPal</h3>
                              <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                            </div>
                          </div>
                        </div>
                        <div 
  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center"
  onClick={handlePayWithRazorpay}
>
  <div onClick={handlePayWithRazorpay} className="border rounded-lg p-4 hover:bg-gray-50 flex items-center cursor-pointer">
  <div className="w-16 h-10 flex items-center justify-center mr-4">
   <img
  src="/images/razorpay.png"
  alt="Razorpay"
  className="h-16 "
/>
  </div>
    <h3 className="font-medium">Razorpay</h3>
    <p className="text-sm text-gray-500">Pay via any UPI App</p>
</div>

</div>

                        <button
                          type="button"
                          onClick={() => setIsPaymentModalOpen(false)}
                          className="mt-4 text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No flights found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                  <Button onClick={() => setFilteredFlights(flights)}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <p className="text-lg font-medium">{popupMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-accent-600 text-white rounded hover:bg-blue-700"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default FlightsPage;
