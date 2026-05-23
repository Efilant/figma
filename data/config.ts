export const FIGMA_DEMO_URL =
  "https://www.figma.com/design/42MvSobHoAnh9C6u7aVH9D/Figma-Sunum---Canl%C4%B1-Demo";

export const PRESENTATION_DURATION_SEC = 15 * 60;

export type Chapter = {
  id: number;
  label: string;
  slides: number[];
  color: string;
};

export const CHAPTERS: Chapter[] = [
  { id: 1, label: "Giriş", slides: [1, 2, 3, 4], color: "#a259ff" },
  { id: 2, label: "Auto Layout", slides: [5, 6], color: "#1abcfe" },
  { id: 3, label: "Components", slides: [7, 8], color: "#f24e1e" },
  { id: 4, label: "Prototype", slides: [9, 10], color: "#0acf83" },
  { id: 5, label: "Dev Mode", slides: [11, 12, 13], color: "#1abcfe" },
];
