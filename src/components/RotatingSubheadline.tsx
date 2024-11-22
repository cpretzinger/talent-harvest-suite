import { useState, useEffect } from "react";

const painPoints = [
  "One Bad Hire Costs Even More Than Their Annual Base",
  "80% of Sales Team Turnover Happens in the First 90 Days",
  "The Average Cost of a Bad Sales Hire is $250,000",
  "It Takes 6+ Months to Replace an Underperforming Sales Rep",
  "Poor Hiring Decisions Account for 40% of Sales Team Failures"
];

const RotatingSubheadline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % painPoints.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing text
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p
      className={`text-xl md:text-2xl text-gray-600 mb-12 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      Fun Fact: {painPoints[currentIndex]}
    </p>
  );
};

export default RotatingSubheadline;