import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import { WelcomePanel } from "../../components/WelcomePanel";
import { AuthBackground } from "../../components/AuthBackground";

export const Signup2 = () => {
  const navigate = useNavigate();

  // Load organization license number that Signup1 saved
  const [organizationLicense, setOrganizationLicense] = useState("");

  useEffect(() => {
    const savedLicense = localStorage.getItem("organizationLicense");
    if (!savedLicense) {
      alert("Please complete Step 1 first.");
      navigate("/signup-1");
    } else {
      setOrganizationLicense(savedLicense);
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    createPassword: "",
    confirmPassword: "",
    phoneNumber: "",
    position: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = async () => {
    if (formData.createPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://motherlink-backend-1atz.onrender.com/api/admins/create",
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          position: formData.position,
          password: formData.createPassword,
          organization: {
          licenseNumber: organizationLicense,
          }// 🔥 use the license number
        }
      );
      const token = response.data.accessToken;
      localStorage.setItem("authToken", token);
      localStorage.setItem("name", formData.fullName);


      console.log("Admin created:", response.data);

      navigate("/signup-3");
    } catch (error) {
      console.error("Error creating admin:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch mx-auto">
        {/* Left - Signup Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#000000] text-2xl mb-6">
            Signup to Mother Link!
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <Checkbox checked={true} />
            <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
              Contact & Administrator details
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Full name
              </label>
              <Input
                type="text"
                placeholder="e.g. Jane Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Phone number
              </label>
              <Input
                type="tel"
                placeholder="+250 7XX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Email address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Position / Role
              </label>
              <Input
                type="text"
                placeholder="e.g. Hospital admin"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Create password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.createPassword}
                onChange={(e) => handleInputChange("createPassword", e.target.value)}
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] text-sm mb-2">
                Confirm password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="h-[38px] rounded-[3px] border border-[#0000004c]"
              />
            </div>
          </div>

          <Button
            onClick={handleProceed}
            className="w-full bg-[#001240] text-white hover:bg-[#001240]/90 h-[45px] rounded-lg mb-4 font-medium"
          >
            Proceed
          </Button>
        </div>

        {/* Right - Welcome Panel */}
        <div className="hidden lg:flex items-stretch">
          <WelcomePanel className="h-full" />
        </div>
      </div>
    </AuthBackground>
  );
};
