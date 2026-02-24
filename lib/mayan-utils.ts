export const TONES = [
  { name: "Unity", action: "Initiate", meaning: "The creative spark of a new beginning." },
  { name: "Duality", action: "Balance", meaning: "Stability through contrast and choice." },
  { name: "Action", action: "Activate", meaning: "Rhythm and artistic movement." },
  { name: "Structure", action: "Define", meaning: "Foundation and the four directions." },
  { name: "Radiance", action: "Command", meaning: "Leadership and gathering resources." },
  { name: "Rhythm", action: "Flow", meaning: "Organic movement and equality." },
  { name: "Reflection", action: "Inspire", meaning: "Spiritual attunement and alignment." },
  { name: "Justice", action: "Harmonize", meaning: "Integrity and ethics." },
  { name: "Patience", action: "Expand", meaning: "Vision and perseverance." },
  { name: "Manifestation", action: "Produce", meaning: "Perfect creation in reality." },
  { name: "Resolution", action: "Change", meaning: "Release and letting go." },
  { name: "Understanding", action: "Cooperate", meaning: "Community and crystallization." },
  { name: "Ascension", action: "Transcend", meaning: "The leap to higher consciousness." }
];

export const SIGNS = [
  "Imix", "Ik", "Akbal", "Kan", "Chicchan", "Cimi", "Manik", "Lamat", "Muluc", "Oc", 
  "Chuen", "Eb", "Ben", "Ix", "Men", "Cib", "Caban", "Etznab", "Cauac", "Ahau"
];

export function getTzolkinDate(dateString: string) {
  const date = new Date(dateString);
  const refDate = new Date("2012-12-21");
  const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));

  let toneIndex = (diffDays + 4) % 13;
  if (toneIndex <= 0) toneIndex += 13;

  let signIndex = (diffDays + 19) % 20;
  if (signIndex < 0) signIndex += 20;

  return {
    tone: toneIndex,
    toneData: TONES[toneIndex - 1],
    sign: SIGNS[signIndex]
  };
}
