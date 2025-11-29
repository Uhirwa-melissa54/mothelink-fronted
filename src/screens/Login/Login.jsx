import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import { WelcomePanel } from "../../components/WelcomePanel";
import { AuthBackground } from "../../components/AuthBackground";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://motherlink-backend-1atz.onrender.com/api/admins/login", {
        email: formData.email,
        password: formData.password,
        fullname: formData.role,
      });

      // Save token or user data if returned
      localStorage.setItem("authToken", response.data.token);

      // Update authentication state
      await checkAuthStatus();

      // Redirect
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please check credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-stretch mx-auto">
        <div className="hidden lg:flex items-stretch">
          <WelcomePanel className="h-full" />
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col space-y-6">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#001240] text-2xl mb-6">
            Login to Mother Link!
          </h1>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="space-y-4 mb-6">
            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-[45px] rounded-lg border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="h-[45px] rounded-lg border border-[#0000004c] [font-family:'Poppins',Helvetica]"
              />
            </div>

            <div>
              <label className="block [font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Role
              </label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger className="h-[45px] rounded-lg border border-[#0000004c]">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="chw">CHW</SelectItem>
                  <SelectItem value="hospital">Hospital Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  handleInputChange("rememberMe", checked)
                }
              />
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
                Remember Me
              </label>
            </div>
            <button className="[font-family:'Poppins',Helvetica] font-normal text-[#001240] text-sm hover:underline">
              Forgot password
            </button>
          </div>

          <div className="flex gap-3 mb-6">
            <Button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-[#001240] text-white hover:bg-[#001240]/90 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
              onClick={() => navigate("/signup-1")}
              variant="outline"
              className="flex-1 border border-[#001240] text-[#001240] hover:bg-gray-50 h-[45px] rounded-lg [font-family:'Poppins',Helvetica] font-medium"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};
