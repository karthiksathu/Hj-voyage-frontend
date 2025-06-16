import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Helper to create a centered toast with dismiss button and styles
  const createToast = (
    title: string,
    description: string,
    variant: "default" | "destructive" = "destructive"
  ) => {
    const toastInstance = toast({
      title,
      description: (
        <div
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: variant === "destructive" ? "#b91c1c" : "#047857",
            position: "relative",
            paddingRight: "2.5rem",
          }}
        >
          {description}
          <button
            aria-label="Dismiss toast"
            onClick={() => toastInstance.dismiss()}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              fontSize: "1.5rem",
              color: variant === "destructive" ? "#b91c1c" : "#047857",
              cursor: "pointer",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
      ),
      variant,
      duration: 15000, // 15 seconds
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "400px",
        width: "90vw",
        padding: "1.25rem 2rem",
        borderRadius: "8px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
        zIndex: 9999,
        textAlign: "center",
        backgroundColor: variant === "destructive" ? "#fee2e2" : "#d1fae5",
      },
    });

    return toastInstance;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      createToast(
        "Missing information",
        "Please fill in all required fields.",
        "destructive"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      createToast(
        "Passwords don't match",
        "Please make sure your passwords match.",
        "destructive"
      );
      return;
    }

    if (!formData.acceptTerms) {
      createToast(
        "Terms & Conditions",
        "Please accept the terms and conditions to continue.",
        "destructive"
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/aerovoyage/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: formData.firstName,
            LastName: formData.lastName,
            DateOfBirth: formData.dateOfBirth,
            email: formData.email,
            password: formData.password,
            confirmpassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        createToast(
          "Registration successful",
          "Your account has been created. Please check your email for verification.",
          "default"
        );

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          dateOfBirth: "",
          acceptTerms: false,
        });
      } else {
        createToast(
          "Registration failed",
          data.message || "Something went wrong.",
          "destructive"
        );
      }
    } catch (error: any) {
      createToast(
        "Network Error",
        error.message || "Unable to connect to server.",
        "destructive"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex flex-col bg-[#ffffff]">
    <Navbar />
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-[#024b74] bg-[#ffffff]">
        <CardHeader className="space-y-1 text-center pb-6">
          <CardTitle className="text-2xl font-bold text-[#002444]">Create an Account</CardTitle>
          <CardDescription className="text-[#024b74]">
            Enter your details to sign up for a SkyVoyage account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4 animate-content-load">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-[#002444]">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    className="pl-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-[#002444]">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    className="pl-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-[#002444]">Date of Birth</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="pl-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#002444]">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#002444]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024b74] hover:text-[#0372aa]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#002444]">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74]" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="pl-10 pr-10 bg-[#ffffff] border border-[#024b74] hover:border-[#0372aa] transition-colors"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#024b74] hover:text-[#0372aa]"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, acceptTerms: checked === true })
                }
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#002444]"
              >
                I accept the{" "}
                <Link to="/terms" className="text-[#0372aa] hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0372aa] hover:bg-[#024b74] text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating your account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-6 pt-0">
          <p className="text-sm text-center text-[#002444]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0372aa] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
    <Footer />
  </div>
);

};

export default RegisterPage;
