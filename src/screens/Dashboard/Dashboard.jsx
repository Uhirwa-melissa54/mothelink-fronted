import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BellIcon,
  SearchIcon,
  UsersIcon,
  CheckCircleIcon,
  BarChart3Icon,
  Clock,
  TrendingUp,
  AlertTriangleIcon,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Card, CardContent } from "../../components/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table";

export const Dashboard = () => {
  const [totalMother, setTotalMothers] = useState(0);
  const [totalChildren, setTotaChildren] = useState(0);
  const [timeRange, setTimeRange] = useState("all-time");
  const [activityRange, setActivityRange] = useState("all-activity");
  const [selectedMetric, setSelectedMetric] = useState("emergencies");

  useEffect(() => {
    const fetchTotalMothers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/mobile/healthworkers/totalMothers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setTotalMothers(response.data.totalAmbulance);
      } catch (error) {
        console.error("Error fetching total mothers:", error);
        setTotalMothers("Error");
      }
    };

    fetchTotalMothers();
  }, []);
 useEffect(() => {
    const fetchTotalChildren = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admins/mothers/children",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
            },
          }
        );
        setTotalChildren(response.data.totalAmbulance);
      } catch (error) {
        console.error("Error fetching total mothers:", error);
        setTotalChildren("Error");
      }
    };

    fetchTotalChildren();
  }, []);



  console.log(totalMother, totalChildren);



  const statsData = [
    { title: "Total mothers", value: totalMother, change: "+45 this week", icon: UsersIcon },
    { title: "Active pregnancies", value: totalChildren, change: "+45 this week", icon: TrendingUp },
    { title: "Total children", value: totalMother, change: "+45 this week", icon: UsersIcon },
    { title: "ANC Appointments", value: totalMother, change: "Next 7 days", icon: BarChart3Icon },
  ];

  const emergencyChartData = [
    { name: "Mukamira", Emergencies: 18 },
    { name: "Shyira", Emergencies: 14 },
    { name: "Rambura", Emergencies: 7 },
    { name: "Bigogwe", Emergencies: 10 },
    { name: "Other", Emergencies: 8 },
  ];

  const ancChartData = [
    { name: "Mukamira", ANC: 23 },
    { name: "Shyira", ANC: 20 },
    { name: "Rambura", ANC: 16 },
    { name: "Bigogwe", ANC: 20 },
    { name: "Other", ANC: 7 },
  ];

  const recentEmergencies = [
    { id: 1, name: "Mukamana Jane", location: "Gasabo", issue: "Headache", status: "Resolved" },
    { id: 2, name: "Mukamana Jane", location: "Gasabo", issue: "Headache", status: "Resolved" },
    { id: 3, name: "Mukamana Jane", location: "Gasabo", issue: "Headache", status: "Resolved" },
  ];

  const recentActivity = [
    { id: 1, title: "New CHW Registration", description: "Jean Claude was registered in Nurse Department", timestamp: "5 min ago", icon: "user" },
    { id: 2, title: "ANC Appointment completed", description: "Today's antenatal appointments are completed", timestamp: "5 min ago", icon: "check" },
  ];

  const emergencyAlerts = [
    { id: 1, name: "UWASE Claudine", idNum: "ID: UW8832", location: "Location: Nyabisindu", chw: "CHW: Kamono Jane", time: "5 min ago" },
    { id: 2, name: "UWASE Claudine", idNum: "ID: UW8832", location: "Location: Nyabisindu", chw: "CHW: Kamono Jane", time: "6 min ago" },
  ];

  const chartConfig = selectedMetric === "emergencies"
    ? { data: emergencyChartData, dataKey: "Emergencies", barColor: "#0066FF" }
    : { data: ancChartData, dataKey: "ANC", barColor: "#0066FF" };

  return (
    <div className="flex-1 flex flex-col">
      <header className="h-[76px] border-b flex items-center justify-between px-8 bg-white">
        <div className="flex items-center gap-4 flex-1 max-w-[522px]">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="search anything..." className="pl-10 font-normal text-[#000000a6] text-xs h-[38px] rounded-[3px]" />
          </div>
          <Button className="h-[38px] bg-[#001240] rounded-[0px_5px_5px_0px]">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <BellIcon className="w-5 h-5" />
        </Button>
      </header>

      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-6">
          <h1 className="font-semibold text-lg mb-1">Dashboard</h1>
          <p className="font-normal text-xs text-[#000000a6]">View all analytics and manage the system</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {statsData.map((stat, idx) => (
            <Card key={idx} className="rounded-[5px] shadow-[1px_1px_6px_#10193466]">
              <CardContent className="p-4">
                <div className="font-semibold text-sm mb-3">{stat.title}</div>
                <div className="font-semibold text-xl mb-1.5">{stat.value}</div>
                <div className="font-normal text-[12px]">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-4 mb-4">
          {/* Reports & Analytics */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Reports & Analytics</h3>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All time</SelectItem>
                    <SelectItem value="last-week">Last week</SelectItem>
                    <SelectItem value="last-month">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setSelectedMetric("emergencies")}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition ${selectedMetric === "emergencies" ? "bg-[#09111e] text-white" : "text-[#000000] border border-[#0000004c]"}`}
                >
                  Emergencies
                </button>
                <button
                  onClick={() => setSelectedMetric("anc")}
                  className={`px-3 py-1.5 rounded-full font-semibold text-xs transition ${selectedMetric === "anc" ? "bg-[#09111e] text-white" : "text-[#000000] border border-[#0000004c]"}`}
                >
                  ANC Trends
                </button>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartConfig.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#000000a6" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#000000a6" }} />
                  <Bar dataKey={chartConfig.dataKey} fill={chartConfig.barColor} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-[3px] border-[0.5px] border-[#0000004c] shadow-[1px_6px_6px_#00000040]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Recent activity</h3>
                <Select value={activityRange} onValueChange={setActivityRange}>
                  <SelectTrigger className="w-[120px] h-[32px] rounded-[3px] border border-[#0000004c]">
                    <SelectValue placeholder="All activity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-activity">All activity</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="pb-4 border-b last:border-b-0">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        {activity.icon === "user" ? <UsersIcon className="w-4 h-4 text-gray-600" /> : <CheckCircleIcon className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">{activity.title}</div>
                        <div className="font-normal text-xs text-[#000000a6]">{activity.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="font-normal text-xs text-[#000000a6]">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
