export interface Sign {
  id: number;
  name: string;
  archetype: string;
  personality: {
    core: string;
    strengths: string[];
    challenges: string[];
    essence: string;
  };
}
