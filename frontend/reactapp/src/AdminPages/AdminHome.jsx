import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";
import { motion } from "framer-motion";
import { SlideUp } from "../animation/direction";
// import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AdminHome = () => {
  const [registeredStationCount, setRegisteredStationCount] = useState();
  const [totalStations, setTotalStations] = useState();
  const [activeStations, setActiceStation] = useState();
  const [inactiveStation, setInactiveStation] = useState();
  const [petrolCapacity, setPetrolCapacity] = useState();
  const [dieselCapacity, setDieselCapacity] = useState();
  const [registeredVehiclesCount, setRegisteredVehiclesCount] = useState();
  const [petrolPrice, setPetrolPrice] = useState();
  const [dieselPrice, setDieselPrice] = useState();

  const [stationDetails, setStationDetails] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await Admin.getRegisterdStations();
        setRegisteredStationCount(response1.stationDtosList.length);

        const response2 = await Admin.getStations();
        setTotalStations(response2.stationWithStatusDTOList.length);

        const response3 = await Admin.getRegisterdStations();
        const filteredStations = response3.stationDtosList.filter((station) => {
          return (
            station.fuel.availableDieselQuantity > 0 ||
            station.fuel.availablePetrolQuantity > 0
          );
        });

        setActiceStation(filteredStations.length);
        setInactiveStation(registeredStationCount - filteredStations.length);

        const totalPetrolCapacity = response1.stationDtosList.reduce(
          (sum, station) => sum + station.fuel.availablePetrolQuantity,
          0
        );
        setPetrolCapacity(parseFloat(totalPetrolCapacity.toFixed(2)));

        const totalDieselCapacity = response1.stationDtosList.reduce(
          (sum, station) => sum + station.fuel.availableDieselQuantity,
          0
        );
        setDieselCapacity(parseFloat(totalDieselCapacity.toFixed(2)));

        const response4 = await Admin.getRegisterdVehicles();
        setRegisteredVehiclesCount(response4.vehiclesDtoList.length);

        const getPetrolDetails = await Admin.getFuelByName("petrol");

        setPetrolPrice(getPetrolDetails.fuelPriceDtoList[0].price);

        const getDieselDetails = await Admin.getFuelByName("diesel");

        setDieselPrice(getDieselDetails.fuelPriceDtoList[0].price);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [inactiveStation]);
  const cards = [
    {
      title: "Registered Vehicle",
      description: "Add, edit, and view registered vehicles.",
      icon: "🚗",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
      amt: registeredVehiclesCount,
    },
    {
      title: "Registered Stations",
      description: "Track fuel allocations and consumption.",
      icon: "⛽",
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
      amt: registeredStationCount,
    },
    {
      title: "Total Stations",
      description: "Manage admin and user accounts.",
      icon: "👤",
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-700",
      amt: totalStations,
    },
    {
      title: "activeStations",
      description: "Generate and analyze system reports.",
      icon: "📊",
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
      amt: activeStations,
    },
    {
      title: "In Active Stations",
      description: "Send and manage alerts and notifications.",
      icon: "🔔",
      bgColor: "bg-gradient-to-r from-red-500 to-red-700",
      amt: inactiveStation,
    },
    {
      title: "Total Available petrolCapacity",
      description: "Configure system preferences.",
      icon: "🛢️",
      bgColor: "bg-gradient-to-r from-gray-500 to-gray-700",
      amt: `${petrolCapacity}L`,
    },
    {
      title: "Total Available DieselCapacity",
      description: "Access help and support resources.",
      icon: "🛢",
      bgColor: "bg-gradient-to-r from-pink-500 to-pink-700",
      amt: `${dieselCapacity}L`,
    },
    {
      title: "Current Petrol Price",
      description: "Access help and support resources.",
      icon: "💵",
      bgColor: "bg-gradient-to-r from-orange-500 to-orange-700",
      amt: `${petrolPrice}.00/L Rs`,
    },
    {
      title: "Current Diesel Price",
      description: "Access help and support resources.",
      icon: "💴",
      bgColor: "bg-gradient-to-r from-violet-500 to-pink-700",
      amt: `${dieselPrice}.00/L Rs`,
    },
  ];   

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await Admin.getRegisterdStations();

        if (response.statusCode === 200) {
          // Store the station details in state
          setStationDetails(response.stationDtosList);

          // Filter stations with available petrol or diesel greater than 0
          const petrolDieselData = response.stationDtosList
            .filter((station) => 
              station.fuel.availablePetrolQuantity > 0 || 
              station.fuel.availableDieselQuantity > 0
            )
            .map((station) => ({
              stationId: station.stationId,
              availableDieselQuantity: station.fuel.availableDieselQuantity,
              availablePetrolQuantity: station.fuel.availablePetrolQuantity,
            }))
            // Sort by available petrol quantity in descending order
            .sort((b, a) => b.availablePetrolQuantity - a.availablePetrolQuantity);

          setFilteredStations(petrolDieselData);
          console.log("Filtered and Sorted Stations:", petrolDieselData);
        }
      } catch (err) {
        console.error("Error fetching stations:", err.message);
        setError(err.message);
      }
    };

    fetchStations();
  }, []);
    

  const stationIdsArray = filteredStations.map(station => station.stationId);
  console.log("Station IDs:", stationIdsArray);

  const petrolCpacity=filteredStations.map(station => station.availablePetrolQuantity);
  console.log("Petrol Capacity:", petrolCpacity);

  const dieselCpacity=filteredStations.map(station => station.availableDieselQuantity);
  console.log("Diesel Capacity:", dieselCpacity);

  const [chartData, setChartData] = useState({
    
    series: [
      {
        name: "Petrol Capacity",
        data: [20,30,40,50,60,70]
      },
      {
        name: "Diesel Capacity",
        data: [20,30,40,50,60,90]
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        foreColor: "#ffffff",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        foreColor: "black",
      },
      xaxis: {
        type: "category",
        categories: [
          "Station DE001",
          "Station DE002",
          "Station DE003",
          "Station DE004",
          "Station DE005",
          "Station DE006",
          "Station DE007",
        ],
        title: {
          text: "Fuel Station ID",
          style: { color: "#ffffff" },
        },
        labels: {
          style: { colors: "#ffffff" },
        },
      },
      yaxis: {
        title: {
          text: "Liters",
          style: { color: "#ffffff" },
        },
        labels: {
          style: { colors: "#ffffff" },
        },
      },
      tooltip: {
        x: {
          format: "Station ID: ",
        },
      },
      grid: {
        borderColor: "#ffffff",
      },
    },
  });
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            className={`p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ${card.bgColor}`}
          >
            <div className="flex justify-between items-center">
              <div className="text-4xl mb-4">{card.icon}</div>

              <p className="text-2xl ">{card.amt}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-sm">{card.description}</p>
          </div>
        ))}
      </div>
      <div className="p-6 text-white">
        <div id="chart" className="my-32">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={400}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
