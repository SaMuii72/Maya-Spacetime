import { TONES } from "../tones";
import { SIGNS } from "../signs";
import { Sign } from "@/types/mayan";
import { getInteractionSnippet } from "./interactions";

export function generateMayanNarrative(
  toneNumber: number,
  sign: Sign
) {
  const tone = TONES[toneNumber as keyof typeof TONES];

  const interaction = getInteractionSnippet(tone.name, sign.archetype, toneNumber);

  return {
  intro: `Your Mayan astrology reveals that you were born on Tone ${toneNumber} ${sign.name},
a unique combination that shapes your spiritual essence and life path.`,

  tone: `The Galactic Tone ${toneNumber}, known as ${tone.name},
represents the principle of ${tone.action.toLowerCase()}.
This tone influences how you move through life,
expressing qualities such as ${tone.personality.core.toLowerCase()}.
At its highest expression, this tone offers ${tone.personality.strength.toLowerCase()},
while its shadow may appear as ${tone.personality.shadow.toLowerCase()}.`,

  sign: `Your Day Sign, ${sign.name} (${sign.archetype}),
carries the energy of ${sign.personality.essence.toLowerCase()}.
This sign grants you the strengths of ${sign.personality.strengths.join(", ").toLowerCase()},
yet also challenges you through ${sign.personality.challenges.join(", ").toLowerCase()}.`,

  interaction,

  lifeTheme: `Together, this combination defines a life theme centered on
${tone.personality.lifeTheme.toLowerCase()}.`,

  closing: `The ancient Maya believed that understanding your Tzolk'in birth signature
helps you align with your true purpose and navigate life's cycles
with greater awareness, balance, and wisdom.`
  };
}
