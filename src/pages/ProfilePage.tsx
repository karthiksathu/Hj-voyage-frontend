import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { MainNav } from "@/components/main-nav";
import  Footer  from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/language/LanguageProvider";
import { cn } from "@/lib/utils";
 
const Profile = () => {
  const { translations, isRtl } = useLanguage();
 
  return (
    <ThemeProvider defaultTheme="system" storageKey="voyagescapes-theme">
      <div className={cn("min-h-screen flex flex-col", isRtl ? "direction-rtl" : "")}>
        <MainNav />
        <main className="flex-1 pt-20 pb-10">
          <div className="container mx-auto max-w-5xl p-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Sidebar */}
              <div className="md:w-1/3">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <h2 className="text-xl font-bold">John Doe</h2>
                      <p className="text-muted-foreground">john.doe@example.com</p>
                      <div className="w-full mt-6">
                        <Button className="w-full">Edit Profile</Button>
                      </div>
                      <div className="w-full mt-4">
                        <Button variant="outline" className="w-full">Manage Bookings</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
             
              {/* Profile Content */}
              <div className="md:w-2/3">
                <Tabs defaultValue="overview">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                 
                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground mb-1">Full Name</h3>
                          <p>John Doe</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground mb-1">Email Address</h3>
                          <p>john.doe@example.com</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground mb-1">Phone Number</h3>
                          <p>+1 (555) 123-4567</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground mb-1">Loyalty Points</h3>
                          <p>1,245</p>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-muted-foreground mb-1">Member Since</h3>
                          <p>January 2023</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                 
                  <TabsContent value="bookings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[1, 2, 3].map((booking) => (
                            <div key={booking} className="flex justify-between items-center border-b pb-4">
                              <div>
                                <h4 className="font-medium">New York to London</h4>
                                <p className="text-sm text-muted-foreground">Jun 12, 2023 · Flight #AB123</p>
                              </div>
                              <Button variant="outline" size="sm">View Details</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                 
                  <TabsContent value="settings">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-2">Email Notifications</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Booking Confirmations</span>
                            <div className="ml-auto">
                              <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Password</h3>
                          <Button variant="outline">Change Password</Button>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Delete Account</h3>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
 
export default Profile