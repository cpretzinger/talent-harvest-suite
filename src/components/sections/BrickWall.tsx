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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {challenges.map((challenge, index) => (
        <div
          key={index}
          className="bg-primary/90 p-4 rounded-sm border-2 border-secondary/20 transform hover:-translate-y-1 transition-transform duration-300"
          style={{
            marginLeft: index % 2 === 0 ? '0' : '1rem',
          }}
        >
          <p className="text-cream text-sm md:text-base">{challenge}</p>
        </div>
      ))}
    </div>
  );
};