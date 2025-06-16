import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
// import { Navbar } from "./Navbar";
import { Plane, Eye, EyeOff } from "lucide-react";
// import { Footer } from "./Footer";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpVerifiedMessage, setOtpVerifiedMessage] = useState(""); // New
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otpVerified = location.state?.otpVerified;

  useEffect(() => {
    if (otpVerified) {
      setOtpVerifiedMessage("OTP verified successfully. Please reset your password.");
      setTimeout(() => setOtpVerifiedMessage(""), 4000);
    }
  }, [otpVerified]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/v1/aerovoyage/reset-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: password,
          confirmpassword: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Password updated successfully.");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrorMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
      console.error("Reset password error:", error);
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

      <div className="flex-grow flex items-center justify-center px-4 py-12 bg-[#ffffff]">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Plane className="h-12 w-12 text-[#0372aa] mb-2" />
            <h1 className="text-2xl font-bold text-[#002444]">Welcome to AeroVoyage</h1>
            <p className="text-sm text-[#024b74]">Sign in to access your account</p>
          </div>

          <div className="bg-[#ffffff] border border-[#024b74] rounded-lg shadow-sm p-6">
            <form
              onSubmit={handleSubmit}
              className="bg-[#ffffff] p-6 rounded shadow w-full max-w-sm space-y-4"
            >
              <h2 className="text-xl font-semibold text-[#002444]">Reset Password</h2>

              {otpVerifiedMessage && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm">
                  {otpVerifiedMessage}
                </div>
              )}

              {errorMessage && (
                <Button type="submit" className="w-full bg-red-100 text-red-700">
                  {errorMessage}
                </Button>
              )}

              {successMessage && (
                <Button type="submit" className="w-full bg-green-100 text-green-700">
                  {successMessage}
                </Button>
              )}

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 border-[#0372aa] text-[#002444]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-[#ffffff] hover:text-[#024b74]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#024b74]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#024b74]" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-10 border-[#0372aa] text-[#002444]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-[#ffffff] hover:text-[#024b74]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-[#024b74]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#024b74]" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0372aa] text-white hover:bg-[#024b74]"
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
