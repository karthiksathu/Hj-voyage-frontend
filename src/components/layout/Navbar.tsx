import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";

const Navbar = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: t("home"), href: "/" },
    { title: t("manageBookings"), href: "/manage-bookings" },
    { title: t("offers"), href: "/offers" },
    { title: t("support"), href: "/support" },
    { title: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
        >
          <img
            src="/logo.jpg"
            alt="HJ Voyage Logo"
            className="h-10 w-10 rounded-full object-contain shadow-md group-hover:shadow-lg transition-shadow duration-300"
          />
          <span className="font-extrabold text-2xl text-[#002444] tracking-wide">
            HJ <span className="text-[#0372aa]">Voyages</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-[#002444] hover:text-[#0372aa] transition-colors duration-200 text-base font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {/* CTA Buttons & Language */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSelector />
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-[#0372aa] text-[#002444] hover:border-[#002444] transition-all duration-200 bg-white"
          >
            <Link to="/login">
              <User size={16} className="mr-1" /> {t("login")}
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className="bg-[#0372aa] hover:bg-[#024b74] text-white transition-all duration-200"
          >
            <Link to="/register">{t("signup")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white border-t border-[#024b74] animate-fade-in">
          <div className="container py-4 px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-[#002444] hover:text-[#0372aa] py-2 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#024b74]">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-[#0372aa] text-[#002444] hover:border-[#002444] transition-all duration-200 bg-white"
              >
                <Link to="/login">
                  <User size={16} className="mr-1" /> {t("login")}
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-[#0372aa] hover:bg-[#024b74] text-white transition-all duration-200"
              >
                <Link to="/register">{t("signup")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
