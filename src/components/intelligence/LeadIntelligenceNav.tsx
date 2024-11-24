import { Link, useLocation } from "react-router-dom";
import { Database, Shield, ShoppingCart, Lock } from "lucide-react";

const LeadIntelligenceNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Lead IQ", path: "/intelligence/lead-iq", icon: Database },
    { name: "Compliance", path: "/intelligence/compliance", icon: Shield },
    { name: "Buy Leads", path: "/intelligence/buy", icon: ShoppingCart },
    { name: "Lead Secrets 2.0", path: "/intelligence/secrets", icon: Lock },
  ];

  return (
    <nav className="bg-primary/95 backdrop-blur-sm border-b border-cream/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-8 py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-cream/10 ${
                  isActive ? "bg-cream/10 text-cream" : "text-cream/70 hover:text-cream"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default LeadIntelligenceNav;