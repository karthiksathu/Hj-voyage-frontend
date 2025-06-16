import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);

  // 10 minute countdown timer
  const [timeLeft, setTimeLeft] = useState(600); // 600 seconds = 10 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/v1/aerovoyage/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP verified successfully!");
        setTimeout(() => {
          navigate("/reset-psw", { state: { email } });
        }, 1000);
      } else {
        setErrorMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) return;

    setResendLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/aerovoyage/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("OTP resent successfully!");
        setResendDisabled(true);
        setTimeout(() => setResendDisabled(false), 30000); // disable for 30s
        setTimeLeft(600); // restart 10-minute timer
      } else {
        setErrorMessage(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      setErrorMessage("Something went wrong while resending OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-bold">OTP Verification</h1>
            <p className="text-muted-foreground">
              OTP has been sent to: <strong>{email}</strong>
            </p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-6">
            <form onSubmit={handleVerify} className="space-y-4">
              {/* Error Message */}
              {errorMessage && (
                <div className="w-full bg-red-100 text-red-700 text-center px-4 py-2 rounded">
                  {errorMessage}
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="w-full bg-green-100 text-green-700 text-center px-4 py-2 rounded">
                  {successMessage}
                </div>
              )}

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                required
              />

              {/* Timer & Resend Link */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <div>Time left: {formatTime(timeLeft)}</div>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendDisabled || resendLoading}
                  className="text-blue-600 hover:underline disabled:opacity-50"
                >
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
