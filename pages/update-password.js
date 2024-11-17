// pages/forgot-password.js
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "", recoveryCode: "", newPassword: "" });
  const [step, setStep] = useState(1); // Track the current step
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Step 1: Send Recovery Code
  const handleSendRecoveryCode = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      const response = await fetch("/api/sendrecoverycode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Recovery code sent successfully.");
        toast.success("Recovery code sent successfully! Check your inbox.");
        setStep(2); // Move to verification step
      } else {
        setError(data.error || "Failed to send recovery code.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  // Step 2: Verify Recovery Code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, recoveryCode: formData.recoveryCode }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Code verified. You can now reset your password.");
        setStep(3); // Move to reset password step
      } else {
        setError(data.error || "Invalid recovery code.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, newPassword: formData.newPassword }),
      });
      if (response.ok) {
        toast.success("Password reset successfully!");
        router.push("/login"); // Redirect to login
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        {/* Step 1: Request Recovery Code */}
        {step === 1 && (
          <form onSubmit={handleSendRecoveryCode} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Send Recovery Code
            </button>
          </form>
        )}

        {/* Step 2: Verify Recovery Code */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input
              type="text"
              name="recoveryCode"
              placeholder="Enter recovery code"
              className="w-full p-3 border rounded-lg"
              value={formData.recoveryCode}
              onChange={handleChange}
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Verify Code
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              className="w-full p-3 border rounded-lg"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
