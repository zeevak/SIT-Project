import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../animation/direction";

const TermsAndConditions = () => {
  return (
    <div className="h-screen bg-slate-800 relative">
      <div className="mt-14 absolute left-96">
        <div className=" px-6 py-12  max-w-3xl mx-auto ">
          <motion.h1
            variants={SlideUp(0.2)}
            initial="hidden"
            whileInView={"visible"}
            className="text-4xl font-bold text-orange-500"
          >
            Terms And <span className="text-blue-500">Conditions</span>
          </motion.h1>

          <div className="terms-content mt-8 text-gray-300">
            <section className="mt-8">
              <h2 className="text-xl font-semibold text-white">Introduction</h2>
              <p className="mt-4">
                Welcome to our Fuel Management System! These Terms and
                Conditions govern your use of the website and mobile application
                developed by us using React, Spring Boot, MySQL, and React
                Native. By accessing or using our platform, you agree to comply
                with and be bound by the following terms.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-white">
                User Responsibilities
              </h2>
              <p className="mt-4">
                As a registered user, you agree to provide accurate, up-to-date
                information, including vehicle and station details, and adhere
                to the system's policies. This includes the registration of
                vehicles, fuel stations, and the management of fuel records.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-white">Contact Us</h2>
              <p className="mt-4">
                If you have any questions about these Terms and Conditions,
                please contact us at [Jenu@company.com].
              </p>
            </section>

            <section className="mt-8 text-center">
              <button
                onClick={() => alert("Thank you for accepting our terms!")}
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-8 hover:bg-blue-700 transition duration-300"
              >
                Accept Terms and Conditions
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
