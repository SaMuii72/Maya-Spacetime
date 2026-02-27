import { TONES } from "../tones";
import { SIGNS } from "../signs";

export function getTzolkinDate(dateString: string) {
  const date = new Date(dateString);
  const refDate = new Date("2012-12-21");
  const diffDays = Math.floor(
    (date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let toneIndex = (diffDays + 4) % 13;
  if (toneIndex <= 0) toneIndex += 13;

  let signIndex = (diffDays + 19) % 20;
  if (signIndex < 0) signIndex += 20;

  return {
    toneNumber: toneIndex,
    tone: TONES[toneIndex as keyof typeof TONES],
    sign: SIGNS[signIndex]
  };
}
