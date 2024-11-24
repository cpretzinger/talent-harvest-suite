import { useState, useEffect } from "react";
import { Menu, X, Shield, Database, Target, Globe, Network } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A1F2C]/90 backdrop-blur-md shadow-lg py-4" : "bg-[#1A1F2C]/70 py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover-lift">
            <Shield className="h-6 w-6 text-[#9b87f5]" />
            <span className="text-2xl font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
              Elite Intel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Intelligence", path: "/intelligence", icon: Database },
              { name: "Leads", path: "/leads", icon: Target },
              { name: "Resources", path: "/resources", icon: Globe },
              { name: "Network", path: "#network", icon: Network }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent hover:opacity-80 transition-opacity hover-lift"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <button
            className="md:hidden text-[#9b87f5]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#1A1F2C]/95 backdrop-blur-md mt-2 py-4">
            <div className="flex flex-col items-center space-y-4">
              {[
                { name: "Intelligence", path: "/intelligence", icon: Database },
                { name: "Leads", path: "/leads", icon: Target },
                { name: "Resources", path: "/resources", icon: Globe },
                { name: "Network", path: "#network", icon: Network }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent hover:opacity-80 transition-opacity hover-lift"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;