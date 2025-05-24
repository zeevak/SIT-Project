import React from "react";
import { SlideLeft } from "../animation/direction";
import { SlideRight } from "../animation/direction";
import { SlideUp } from "../animation/direction";
import { motion } from "framer-motion";




const services = [
  {
    title: "Fuel Management",
    description: "Track fuel allocations, monitor consumption, and manage fuel distribution efficiently.",
    image: "../src/Assets/history3.jpg"
  },
  {
    title: "Fuel Stations",
    description: "View and manage registered fuel stations with real-time fuel availability updates.",
    image: "../src/Assets/photo-1697575806262-c3553b142b54.avif"
  },
  {
    title: "Real-time Monitoring",
    description: "Keep track of fuel levels, pricing, and station activity in real-time.",
    image: "../src/Assets/monitoring.jpg"
  },
  {
    title: "Secure Transactions",
    description: "Ensure secure and seamless transactions for fuel refilling and management.",
    image: "../src/Assets/transaction.jpg"
  }
];

const Service = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 ">
        <div className="my-28">
        <div className="text-center mb-12">
        <motion.h1
            variants={SlideUp(0.2)}
                     initial="hidden"
                     whileInView={"visible"}
        className="text-4xl font-bold text-orange-500">Our <span className="text-blue-500">Service</span></motion.h1>
        <p className="mt-2 text-gray-400">Providing efficient fuel management solutions.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
          variants={SlideLeft(0.1*index)}
          initial="hidden"
          whileInView={"visible"}
          
          key={index} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img src={service.image} alt={service.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-orange-400">{service.title}</h2>
              <p className="text-gray-300 mt-2">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
        </div>
     
    </div>
  );
};

export default Service;
