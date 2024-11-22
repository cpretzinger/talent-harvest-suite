import { useEffect, useRef } from "react";
import Navigation from "../components/Navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

const Index = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-down text-balance">
              Create Something
              <span className="text-gradient"> Beautiful</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 animate-fade-up delay-200 text-balance">
              Discover the perfect blend of design and functionality
            </p>
            <button className="glass-morphism px-8 py-4 rounded-full font-medium hover-lift inline-flex items-center gap-2 animate-fade-up delay-300">
              Get Started <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl font-bold mb-6 animate-on-scroll text-balance">
              Crafted with Precision
            </h2>
            <p className="text-xl text-gray-600 animate-on-scroll text-balance">
              Every detail matters in creating the perfect experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Intuitive Design",
                description: "Clean and simple interfaces that just work",
              },
              {
                title: "Premium Quality",
                description: "Built with attention to every detail",
              },
              {
                title: "Future Ready",
                description: "Prepared for tomorrow's challenges",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-morphism p-8 rounded-2xl hover-lift animate-on-scroll"
              >
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-morphism rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 animate-on-scroll text-balance">
                Let's Create Together
              </h2>
              <p className="text-xl text-gray-600 animate-on-scroll text-balance">
                Ready to start your next project?
              </p>
            </div>
            <button className="w-full glass-morphism px-8 py-4 rounded-full font-medium hover-lift inline-flex items-center justify-center gap-2">
              Get in Touch <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;