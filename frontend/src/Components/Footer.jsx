import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo + Intro */}
        <div>
          <img
            src="src/Assets/Monochrome Ilustration Graffiti Logo new.png"
            alt="Fuel QR Logo"
            className="w-[140px] mb-4"
          />
          <p className="text-sm leading-relaxed">
            Fuel QR is a digital platform in Sri Lanka designed to streamline
            fuel services using QR code technology for efficient fuel distribution and
            real-time tracking.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Services</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* FAQs + Downloads */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400 transition">FAQ</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Support</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
          </ul>

          <div className="mt-5 space-y-2">
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md w-fit text-white text-sm space-x-2">
              <FaGooglePlay /> <span>Get it on Play Store</span>
            </button>
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md w-fit text-white text-sm space-x-2">
              <FaApple /> <span>Download on App Store</span>
            </button>
          </div>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm mb-1">123, Galle Road, Colombo, Sri Lanka</p>
          <p className="text-sm mb-1">Email: support@fuelqr.lk</p>
          <p className="text-sm mb-4">Phone: +94 11 2345678</p>

          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Subscribe
            </button>
          </form>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-sky-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        &copy; 2025 <span className="text-white font-semibold">Fuel QR</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
