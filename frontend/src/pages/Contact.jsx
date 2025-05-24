import React, { useState } from "react";
import { motion } from "framer-motion";
import { SlideLeft } from "../animation/direction";
import { SlideRight } from "../animation/direction";
import { SlideUp } from "../animation/direction";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center p-4">
      <div className="mt-44">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="hidden"
          whileInView={"visible"}
          className="text-3xl font-bold mb-8 text-center"
        >
          <span className="text-orange-500">Contact</span>{" "}
          <span className="text-blue-500">Us</span>
        </motion.h1>

        <div className="rounded-2xl p-8 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
             variants={SlideRight(0.2)}
                        initial="hidden"
                        whileInView={"visible"}
          
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-neutral-400 mb-6">
              Have questions or feedback? Fill out the form, and we'll get back
              to you as soon as possible.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-neutral-400 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-slate-500  rounded-lg "
                />
              </div>
              <div>
                <label className="block text-neutral-400 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2  bg-slate-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
              </div>
              <div>
                <label
                  className="block text-neutral-400 mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2  bg-slate-500 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:from-blue-500 hover:to-green-400 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={SlideLeft(0.2)}
                       initial="hidden"
                       whileInView={"visible"}
          
          className="relative flex items-center justify-center">
            <img
              src="src/Assets/fuel4.jpg.avif"
              alt="Fuel Station"
              className="rounded-2xl shadow-lg w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="mt-8 w-full">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">
            Our Main Branch Location
          </h3>
          <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126756.2375517435!2d79.77372749840386!3d6.92707898268173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2595b8b2fb733%3A0x6e7c7f8a998f6f8b!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1615188672931!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
