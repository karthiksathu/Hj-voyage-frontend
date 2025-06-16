import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Plane } from "lucide-react";
// import { Navbar } from "./Navbar";
// import { Footer } from "./Footer";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/aerovoyage/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "OTP sent successfully!");
        setTimeout(() => {
          navigate("/verifyotp", { state: { email, otpSent: true } });
        }, 1000);
      } else {
        setErrorMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff]">
      {/* <Navbar /> */}

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Plane className="h-12 w-12 text-[#0372aa] mb-2" />
            <h1 className="text-2xl font-bold text-[#002444]">Welcome to AeroVoyage</h1>
            <p className="text-[#024b74]">Sign in to access your account</p>
          </div>

          <div className="bg-[#ffffff] border border-[#024b74] rounded-lg shadow-sm p-6">
            <form
              onSubmit={handleSubmit}
              className="bg-[#ffffff] p-6 rounded shadow w-full max-w-sm space-y-4"
            >
              <h2 className="text-xl font-semibold text-[#002444]">Forgot Password</h2>

              {errorMessage && (
                <div className="w-full bg-red-100 text-red-700 text-center px-4 py-2 rounded">
                  {errorMessage}
                </div>
              )}

              {successMessage && (
                <div className="w-full bg-green-100 text-green-700 text-center px-4 py-2 rounded">
                  {successMessage}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#024b74]" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 border border-[#0372aa] text-[#002444]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0372aa] hover:bg-[#024b74] text-white"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
