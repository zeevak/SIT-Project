import React from "react";

import {
  FaGasPump,
  FaChartLine,
  FaBell,
  FaTools,
  FaCheckCircle,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft } from "../animation/direction";
import { SlideRight } from "../animation/direction";
import { SlideUp } from "../animation/direction";


const About = () => {
  const features = [
    {
      icon: <FaGasPump className="text-green-400 text-3xl" />,
      title: "Automated Fuel Tracking",
      desc: "Monitor fuel usage in real time with automated reporting.",
    },
    {
      icon: <FaChartLine className="text-blue-400 text-3xl" />,
      title: "Nationwide Integration",
      desc: "Seamlessly connect with fuel stations across the country.",
    },
    {
      icon: <FaTools className="text-purple-400 text-3xl" />,
      title: "User-Friendly Dashboard",
      desc: "Access insights through a clean and intuitive interface.",
    },
    {
      icon: <FaBell className="text-red-400 text-3xl" />,
      title: "Custom Alerts",
      desc: "Receive notifications for low fuel levels and anomalies.",
    },
    {
      icon: <FaGasPump className="text-orange-400 text-3xl" />,
      title: "Efficient Allocation",
      desc: "Optimize fuel distribution to prevent wastage and ensure availability.",
    },
    {
      icon: <FaCheckCircle className="text-yellow-400 text-3xl" />,
      title: "Secure Transactions",
      desc: "Ensure safe and verified fuel transactions with robust security.",
    },
  ];
  return (
    <div className="p-10 bg-gray-900 text-white">
      <div className="my-28 px-10">
        <motion.h1
        
                          variants={SlideUp(0.1)}
                          initial="hidden"
                          whileInView={"visible"}
        className="text-4xl font-bold text-orange-500 text-center">
          About <span className="text-blue-500">Us</span>
        </motion.h1>
        <motion.p
           
           variants={SlideUp(0.2)}
           initial="hidden"
           whileInView={"visible"}
        className="mt-2 text-gray-400 text-center">
          Providing efficient fuel management solutions.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10 mt-24 ">
          <motion.img
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView={"visible"}
            src="../src/Assets/photo-1697575806262-c3553b142b54.avif"
            alt="Fuel Management"
            className="rounded-lg shadow-lg"
          />
          <motion.p
            variants={SlideLeft(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="text-base text-neutral-400"
          >
            Our fuel management system is designed to optimize fuel consumption,
            track fuel usage efficiently, and provide real-time monitoring of
            fuel stations. By leveraging cutting-edge technology, we ensure that
            fuel distribution is streamlined and cost-effective. Our system
            enables businesses and fleet operators to gain complete visibility
            into fuel transactions, preventing fuel theft and unauthorized
            usage. With automated reporting and analytics, users can make
            data-driven decisions to enhance operational efficiency and reduce
            fuel wastage. By integrating IoT-based sensors and cloud computing,
            we offer seamless tracking of fuel levels, refueling activities, and
            consumption patterns. Our platform ensures compliance with
            regulatory standards and helps businesses achieve sustainability
            goals by minimizing carbon footprints. With a user-friendly
            interface and robust security features, our fuel management system
            simplifies fuel inventory management, allowing station owners to
            manage stock levels and forecast demand accurately. Whether for
            commercial fleets, fuel stations, or industrial applications, our
            solution empowers users to optimize their fuel resources while
            maintaining cost control.
          </motion.p>
        </div>

        <motion.h2
          
          variants={SlideUp(0.1)}
          initial="hidden"
          whileInView={"visible"}
        className="text-3xl font-semibold mb-4 text-orange-500 mt-28">
          Why Choose <span className="text-blue-500">Us?</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
          <motion.p
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="text-base text-neutral-400"
          >
            Our system provides real-time data on fuel levels, transactions, and
            station performance. This allows businesses and consumers to make
            data-driven decisions, reduce waste, and enhance overall operational
            efficiency. By continuously monitoring fuel consumption patterns,
            our system helps identify irregularities and inefficiencies,
            ensuring that every drop of fuel is accounted for. Automated alerts
            notify station managers and fleet operators about low fuel levels,
            potential leaks, or unusual fuel consumption, allowing for immediate
            action and minimizing losses. With integrated analytics and
            reporting tools, businesses can generate detailed insights into fuel
            usage trends over time. This enables proactive decision-making, cost
            control, and accurate forecasting to meet demand fluctuations
            without overstocking or running out of fuel. Our platform also
            enhances transparency in fuel transactions, providing secure and
            verifiable digital records for audits and compliance. By reducing
            manual tracking errors and eliminating fraudulent activities, we
            help organizations maintain accountability and streamline their
            operations. Additionally, our system is designed with scalability in
            mind, making it suitable for fuel stations of all sizes, from small
            local vendors to large-scale fuel distribution networks. Whether you
            are managing a single fuel station or a nationwide fleet, our
            solution ensures efficiency, accuracy, and long-term savings.
          </motion.p>
          <motion.img
            variants={SlideLeft(0.1)}
            initial="hidden"
            whileInView={"visible"}
            src="../src/Assets/fuel4.jpg.avif"
            alt="Fuel Station"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Features Section with Grid */}
        <div className="mb-16 my-44 ">
          <h2 className="text-3xl font-semibold mb-14 text-center text-orange-500">
            🚀 Key <span className="text-blue-500">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                 
              variants={SlideLeft(0.1*index)}
              initial="hidden"
              whileInView={"visible"}

                key={index}
                className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-neutral-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default About;
