
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User,
  ChevronRight,
  CreditCard,
  Settings,
  PlusCircle,
  Check,
  X
} from "lucide-react";

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", date: "2025-05-01", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2025-05-03", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", date: "2025-05-05", status: "Inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", date: "2025-05-07", status: "Active" },
  { id: 5, name: "Michael Brown", email: "michael@example.com", date: "2025-05-09", status: "Active" },
];

const mockBookings = [
  { id: "B-1001", user: "John Doe", from: "New York", to: "Paris", date: "2025-06-15", amount: "$450" },
  { id: "B-1002", user: "Jane Smith", from: "London", to: "Tokyo", date: "2025-06-20", amount: "$780" },
  { id: "B-1003", user: "Bob Johnson", from: "Dubai", to: "Singapore", date: "2025-06-25", amount: "$520" },
  { id: "B-1004", user: "Sarah Williams", from: "Sydney", to: "Rome", date: "2025-07-01", amount: "$630" },
];

const AdminPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Form states
  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    discount: "",
    expiry: "",
    code: ""
  });

  const [newDestination, setNewDestination] = useState({
    name: "",
    country: "",
    price: "",
    imageUrl: ""
  });
  
  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Offer Created",
        description: `New offer "${newOffer.title}" has been added successfully.`
      });
      
      setNewOffer({
        title: "",
        description: "",
        discount: "",
        expiry: "",
        code: ""
      });
    }, 1000);
  };
  
  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Destination Added",
        description: `New destination "${newDestination.name}, ${newDestination.country}" has been added successfully.`
      });
      
      setNewDestination({
        name: "",
        country: "",
        price: "",
        imageUrl: ""
      });
    }, 1000);
  };
  
  const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewOffer(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDestination(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-sky/10 dark:bg-navy-dark py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-navy dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage users, bookings, offers, and destinations
          </p>
        </div>
      </div>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Settings size={16} /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User size={16} /> Users
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2">
              <PlusCircle size={16} /> Offers
            </TabsTrigger>
            <TabsTrigger value="destinations" className="flex items-center gap-2">
              <ChevronRight size={16} /> Destinations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <h3 className="text-2xl font-bold mt-1">1,245</h3>
                    </div>
                    <div className="bg-sky/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-sky" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+12% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                      <h3 className="text-2xl font-bold mt-1">873</h3>
                    </div>
                    <div className="bg-accent/10 p-3 rounded-full">
                      <CreditCard className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+5% from last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Offers</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                      <PlusCircle className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-orange-500 flex items-center">
                    <span>3 expiring soon</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Popular Destinations</p>
                      <h3 className="text-2xl font-bold mt-1">24</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <ChevronRight className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>Paris is most booked</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Users</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">Name</th>
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">Date</th>
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.slice(0, 5).map(user => (
                          <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-4">{user.name}</td>
                            <td className="p-4 text-gray-500">{user.date}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {user.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">ID</th>
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">Route</th>
                          <th className="text-left p-4 text-sm text-gray-500 font-medium">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockBookings.slice(0, 5).map(booking => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="p-4">{booking.id}</td>
                            <td className="p-4">{booking.from} → {booking.to}</td>
                            <td className="p-4 font-medium">{booking.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 text-sm text-gray-500 font-medium">Name</th>
                        <th className="text-left p-4 text-sm text-gray-500 font-medium">Email</th>
                        <th className="text-left p-4 text-sm text-gray-500 font-medium">Date</th>
                        <th className="text-left p-4 text-sm text-gray-500 font-medium">Status</th>
                        <th className="text-left p-4 text-sm text-gray-500 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4">{user.name}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4 text-gray-500">{user.date}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="offers" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOfferSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Offer Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="Summer Special" 
                        value={newOffer.title}
                        onChange={handleOfferChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        placeholder="Describe the offer details" 
                        value={newOffer.description}
                        onChange={handleOfferChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discount">Discount Amount</Label>
                        <Input 
                          id="discount" 
                          name="discount" 
                          placeholder="15% OFF" 
                          value={newOffer.discount}
                          onChange={handleOfferChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code">Promo Code</Label>
                        <Input 
                          id="code" 
                          name="code" 
                          placeholder="SUMMER15" 
                          value={newOffer.code}
                          onChange={handleOfferChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        name="expiry" 
                        type="date" 
                        value={newOffer.expiry}
                        onChange={handleOfferChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding Offer..." : "Add Offer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Active Offers</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4 p-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div>
                          <h4 className="font-medium">Summer Special</h4>
                          <p className="text-sm text-gray-500">15% OFF | Code: SUMMER15</p>
                          <p className="text-xs text-gray-400 mt-1">Expires: Aug 31, 2025</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="destinations" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Destination</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDestinationSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">City Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Paris" 
                        value={newDestination.name}
                        onChange={handleDestinationChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        name="country" 
                        placeholder="France" 
                        value={newDestination.country}
                        onChange={handleDestinationChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Starting Price</Label>
                      <Input 
                        id="price" 
                        name="price" 
                        placeholder="$299" 
                        value={newDestination.price}
                        onChange={handleDestinationChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input 
                        id="imageUrl" 
                        name="imageUrl" 
                        placeholder="https://example.com/image.jpg" 
                        value={newDestination.imageUrl}
                        onChange={handleDestinationChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding Destination..." : "Add Destination"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Popular Destinations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-4 p-4">
                    <div className="flex items-center p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1499856871958-5b9357976b82?w=150" 
                          alt="Paris" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Paris</h4>
                        <p className="text-sm text-gray-500">France</p>
                        <p className="text-xs text-accent mt-1">From $299</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=150" 
                          alt="New York" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">New York</h4>
                        <p className="text-sm text-gray-500">United States</p>
                        <p className="text-xs text-accent mt-1">From $350</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                        <img 
                          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=150" 
                          alt="Tokyo" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Tokyo</h4>
                        <p className="text-sm text-gray-500">Japan</p>
                        <p className="text-xs text-accent mt-1">From $650</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
