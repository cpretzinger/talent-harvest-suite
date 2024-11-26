export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const INSURANCE_FACTS = [
  "The first insurance company in the US was founded in Charleston, SC in 1735",
  "Lloyd's of London started as a coffee house where merchants gathered to discuss shipping insurance",
  "Benjamin Franklin helped establish America's first insurance company in 1752",
  "The average cost of cyber insurance increased by 74% in 2021",
  "The insurance industry employs over 2.8 million people in the United States",
  "The first auto insurance policy was written in 1897",
  "Insurance companies process over $1.2 trillion in claims annually",
  "The term 'underwriter' originated from Lloyd's of London maritime insurance practice"
];

export const getRandomFact = () => {
  const randomIndex = Math.floor(Math.random() * INSURANCE_FACTS.length);
  return INSURANCE_FACTS[randomIndex];
};