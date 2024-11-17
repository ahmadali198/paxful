import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    recoveryCode: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic password strength validation
  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, recoveryCode, password, confirmPassword } = formData;

    // Check if the recovery code is provided
    if (!recoveryCode) {
      toast.error("Please enter your recovery code.");
      return;
    }

    // Check if the password is provided
    if (!password) {
      toast.error("Please enter a new password.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if password is strong
    if (!isPasswordStrong(password)) {
      toast.error("Password must be at least 8 characters long and contain both letters and numbers");
      return;
    }

    try {
      const response = await fetch("/api/updatepassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, recoveryCode }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password updated successfully!");
        
        // Reset form data
        setFormData({
          email: "",
          recoveryCode: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(data.error || "Failed to update password.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // Add event listener for the button click
  useEffect(() => {
    const updateButton = document.getElementById("updateButton");
    if (updateButton) {
      updateButton.addEventListener("click", function() {
        // Redirect to login page after button click
        window.location.href = "/login"; // Adjust the URL if needed
      });
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (updateButton) {
        updateButton.removeEventListener("click", function() {
          window.location.href = "/login";
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Update Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="recoveryCode"
            placeholder="Enter recovery code"
            className="w-full p-3 border rounded-lg"
            value={formData.recoveryCode}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            className="w-full p-3 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm new password"
            className="w-full p-3 border rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            id="updateButton"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;