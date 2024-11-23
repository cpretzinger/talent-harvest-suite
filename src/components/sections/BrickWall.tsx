import React from "react";

const challenges = [
  "Family relationships become strained",
  "Financial security becomes threatened",
  "Professional confidence erodes",
  "Mental health suffers",
  "Work-life balance disappears",
  "Long-term wealth building is compromised",
  "Agency value and exit options diminish"
];

export const BrickWall = () => {
  return (
    <div className="relative py-4">
      <div className="flex flex-col space-y-3">
        {challenges.map((challenge, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 hover:-translate-y-1 
              ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
          >
            <p 
              className="text-cream text-sm md:text-base py-2 px-4 
                bg-gradient-to-r from-primary/90 to-primary/70 
                rounded-lg shadow-md hover:shadow-lg transition-shadow
                backdrop-blur-sm"
            >
              {challenge}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};