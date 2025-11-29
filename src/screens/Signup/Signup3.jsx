import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
import { toast } from "react-toastify";

export const Signup3 = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    dhis2Code: "",
    ambulanceDispatch: "",
    emergencyPhone: "",
    phoneNumber: "",
    numberOfAmbulances: "",
  });

  // ✅ Get licenseNumber from localStorage
  const [licenseNumber, setLicenseNumber] = useState("");

  useEffect(() => {
   const storedLicense = localStorage.getItem("organizationLicense");
    if (storedLicense) setLicenseNumber(storedLicense);
    else {
      toast.error("Organization license number not found. Complete Signup1 first.");
      navigate("/signup-1");
    }
  }, [navigate]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = async () => {
    try {
      const res = await axios.post("https://motherlink-backend-1atz.onrender.com/api/ambulances/create", {
        dhis2FacilityCode: formData.dhis2Code,
        dispatchLink: formData.ambulanceDispatch,
        numberOfAmbulances: formData.numberOfAmbulances,
        phoneNumber: formData.phoneNumber,
        isAvailable: true, // optional: set default availability
        emergencyPhoneNumber: formData.emergencyPhone,
        organization: {
          licenseNumber: licenseNumber, // ✅ send as object
        },
      });

      console.log("Ambulance created:", res.data);
      toast.success("Signup completed successfully! Welcome to Mother Link!");
      
      // Trigger auth check to update authentication state
      console.log("Checking auth status...");
      await checkAuthStatus();
      console.log("Auth status checked, navigating to dashboard...");
      
      // Navigate to dashboard
      navigate("/", { replace: true });
    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);
      toast.error("Failed to create ambulance");
    }
  };

  return (
    <AuthBackground>
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 mx-auto w-full max-w-[520px] flex flex-col">
          <h1 className="[font-family:'Poppins',Helvetica] font-bold text-[#000000] text-2xl mb-6">
            Setup Ambulance Integration
          </h1>

          <div className="flex items-center gap-2 mb-6">
            <Checkbox checked={true} />
            <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm">
              Ambulance details
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                DHIS2 Facility Code
              </label>
              <Input
                type="text"
                placeholder="e.g. NYB-001"
                value={formData.dhis2Code}
                onChange={(e) => handleInputChange("dhis2Code", e.target.value)}
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Phone number
              </label>
              <Input
                type="tel"
                placeholder="+250 7XXXXXXXXX"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Ambulance dispatch link
              </label>
              <Input
                type="text"
                placeholder="Dispatch link or ID"
                value={formData.ambulanceDispatch}
                onChange={(e) => handleInputChange("ambulanceDispatch", e.target.value)}
              />
            </div>

            <div>
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Number of ambulances
              </label>
              <Select
                value={formData.numberOfAmbulances}
                onValueChange={(value) => handleInputChange("numberOfAmbulances", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4+">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <label className="[font-family:'Poppins',Helvetica] font-normal text-[#000000] text-sm mb-2">
                Emergency phone number
              </label>
              <Input
                type="tel"
                placeholder="+250 788123456"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleProceed} className="w-full bg-[#001240] text-white">
            Submit
          </Button>
        </div>

        <div className="hidden lg:flex items-stretch">
          <WelcomePanel className="h-full" />
        </div>
      </div>
    </AuthBackground>
  );
};
