import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#002444] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo & About */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/logo.jpg"
                alt="Hj Voyage Logo"
                className="h-10 w-10 rounded-full object-contain shadow-md group-hover:shadow-lg transition-shadow duration-300"
              />
              <span className="font-extrabold text-2xl text-white tracking-wide">
                HJ <span className="text-[#0372aa]">Voyages</span>
              </span>
            </Link>

            <p className="text-gray-300 mb-6 max-w-xs leading-relaxed">
              Your trusted partner for the best flight deals. Explore the world with confidence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#0372aa] transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-[#0372aa] transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-[#0372aa] transition duration-300">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              {["Home", "Flights", "Offers", "Manage Bookings", "About Us"].map((item, i) => (
                <li key={i}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : item === "About Us"
                        ? "/about"
                        : `/${item.toLowerCase().replace(/ & /g, "-").replace(/\s/g, "-")}`
                    }
                    className="hover:text-[#ffffff] hover:underline transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/faq" className="hover:text-[#ffffff] hover:underline transition">FAQ</Link>
              </li>
              <li>
                <Link to="/contact-support" className="hover:text-[#ffffff] hover:underline transition">Contact Support</Link>
              </li>
              <li>
                <Link to="/terms-&-conditions" className="hover:text-[#ffffff] hover:underline transition">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#ffffff] hover:underline transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#0372aa] mr-2">📍</span>
                Shop 4, AI Masraf Bidg, 51 Baniyas Rd, AI Rigga, Deira, Dubai, UAE 46733.
              </li>
              <li className="flex items-start">
                <span className="text-[#0372aa] mr-2">📱</span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-start">
                <span className="text-[#0372aa] mr-2">✉️</span>
                support@HJvoyages.com
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-[#024b74]">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} <span className="font-medium">HJ Voyages</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
