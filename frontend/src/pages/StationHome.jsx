import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Fuel,
  Gauge,
  Calendar,
  Info,
  MapPin,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  LineChart,
  Phone,
  Mail,
  UserCircle,
  XCircle,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
    },
  }),
};

const StationHome = () => {
  const [profileData, setProfileData] = useState({
    firstname: '',
    username: '',
    telno: '',
    nic: '',
    licenseNumber: '',
    imageData: '',
    imageType: '',
    imageName: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/account/${userId}`);
      setPreviewUrl(`data:${response.data.userAccountDto.imageType};base64,${response.data.userAccountDto.imageData}`);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [profileData]);

  const [station, setStation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const stationId = localStorage.getItem("stationId");
      try {
        const response = await axios.get(`http://localhost:8080/api/station/stations/${stationId}`);
        if (response.data?.stationDto) {
          setStation(response.data.stationDto);
          setError(null);
        } else {
          setError("Station data not found.");
        }
      } catch (err) {
        console.error("Error fetching station data:", err);
        setError("Failed to fetch station data.");
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#f97316", "#60a5fa"];

  const fuelData = station && station.fuel
    ? [
      { name: "Petrol", value: station.fuel.availablePetrolQuantity || 0 },
      { name: "Diesel", value: station.fuel.availableDieselQuantity || 0 },
    ]
    : [];

  const totalCapacity = fuelData.reduce((acc, curr) => acc + curr.value, 0);

  const fuelTrends = [
    { date: "Apr 15", petrol: 120, diesel: 90 },
    { date: "Apr 16", petrol: 140, diesel: 110 },
    { date: "Apr 17", petrol: 130, diesel: 100 },
    { date: "Apr 18", petrol: 150, diesel: 95 },
    { date: "Apr 19", petrol: 110, diesel: 80 },
  ];

  const stationOwner = {
    name: station?.dealerName || "N/A",
    email: station?.email || "N/A",
    phone: station?.phone || "N/A",
    profileImg: "https://i.pravatar.cc/150?img=52",
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950 text-white space-y-6 pl-40 pt-24">
      {error ? (
        <motion.div
          className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <XCircle size={48} className="text-red-500" />
          <h2 className="text-2xl font-bold">Oops! {error}</h2>
          <p className="text-gray-400">Please check the station ID or try again later.</p>
        </motion.div>
      ) : station ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <motion.div
            className="col-span-2 space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0.2}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FadeCard delay={0.3}>
                <CapacityCard
                  title="Petrol Capacity"
                  value={station.fuel?.availablePetrolQuantity ?? 0}
                  icon={<Fuel className="text-orange-400" size={32} />}
                  color="text-orange-400"
                />
              </FadeCard>
              <FadeCard delay={0.4}>
                <CapacityCard
                  title="Diesel Capacity"
                  value={station.fuel?.availableDieselQuantity ?? 0}
                  icon={<Fuel className="text-blue-400" size={32} />}
                  color="text-blue-400"
                />
              </FadeCard>
              <FadeCard delay={0.5}>
                <CapacityCard
                  title="Total Capacity"
                  value={totalCapacity}
                  icon={<Gauge className="text-green-400" size={32} />}
                  color="text-green-400"
                />
              </FadeCard>
            </div>

            <FadeCard delay={0.6}>
              <ChartCard title="Fuel Distribution" icon={<Gauge size={20} />}>
                {fuelData.length ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={fuelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {fuelData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <NoDataMessage />
                )}
              </ChartCard>
            </FadeCard>

            <FadeCard delay={0.7}>
              <ChartCard
                title="Fuel Usage Trends (Last 5 Days)"
                icon={<LineChart size={20} />}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={fuelTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="petrol" fill="#f97316" name="Petrol" />
                    <Bar dataKey="diesel" fill="#60a5fa" name="Diesel" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </FadeCard>
          </motion.div>

          {/* RIGHT SECTION */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            custom={0.8}
          >
            <FadeCard delay={0.9}>
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 space-y-4">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} /> Station Details
                </h3>
                <DetailItem icon={<Calendar size={20} className="text-yellow-400" />} label="Last Pumped" value={station?.lastFuelPumpedDate || "N/A"} />
                <DetailItem icon={<Info size={20} className="text-cyan-400" />} label="StationId" value={station?.stationId || "N/A"} />
                <DetailItem icon={<MapPin size={20} className="text-cyan-400" />} label="Location" value={station?.stationAddress || "N/A"} />
                <DetailItem icon={<Info size={20} className="text-cyan-400" />} label="License" value={station?.licenseNumber || "N/A"} />
                <DetailItem
                  icon={
                    station?.status === "Operational" ? (
                      <CheckCircle size={20} className="text-emerald-400" />
                    ) : (
                      <AlertCircle size={20} className="text-red-400" />
                    )
                  }
                  label="Status"
                  value={station?.status || "N/A"}
                />
              </div>
            </FadeCard>

            <FadeCard delay={1}>
              <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <UserCircle size={20} /> Station Owner
                </h3>
                <div className="flex flex-col items-center text-center space-y-4">
                  <Link to="/stationOwner/profile">
                    <img
                      src={previewUrl || 'https://via.placeholder.com/150'}
                      alt="Profile"
                      className="w-[200px] h-[200px] rounded-full border-2 border-yellow-400 object-cover shadow-md cursor-pointer"
                    />
                  </Link>
                  <h4 className="text-xl font-bold text-white">{stationOwner.name}</h4>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={18} /> {station?.mobile || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={18} /> {station?.email || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={18} /> License: {station?.licenseNumber || "N/A"}
                  </div>
                </div>
              </div>
            </FadeCard>
          </motion.div>
        </div>
      ) : (
        <motion.div
          className="text-center text-gray-300"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Loading station data...
        </motion.div>
      )}
    </div>
  );
};

export default StationHome;

// ✅ Reusable Components

const CapacityCard = ({ title, value, icon, color }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-md font-semibold">{title}</h2>
        <p className={`text-2xl ${color} font-bold`}>{value} L</p>
      </div>
      {icon}
    </div>
  </div>
);

const ChartCard = ({ title, icon, children }) => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700">
    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    {icon}
    <p>
      <span className="text-gray-400">{label}:</span> {value}
    </p>
  </div>
);

const NoDataMessage = () => (
  <div className="h-[250px] flex flex-col justify-center items-center text-gray-400">
    <XCircle size={40} className="text-red-500 mb-2" />
    <p className="text-lg font-medium">No Fuel Data Available</p>
  </div>
);

const FadeCard = ({ children, delay }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    custom={delay}
  >
    {children}
  </motion.div>
);
