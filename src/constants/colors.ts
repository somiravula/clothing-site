export const COLOR_OPTIONS = [
  { value: "navy", label: "Navy", hex: "#0B1220" },
  { value: "white", label: "White", hex: "#F8FAFC", border: true },
  { value: "red", label: "Red", hex: "#EF4444" },
  { value: "yellow", label: "Yellow", hex: "#FACC15" },
  { value: "mint", label: "Mint", hex: "#A7F3D0" },
  { value: "sky", label: "Sky", hex: "#93C5FD" },
  { value: "purple", label: "Purple", hex: "#8B5CF6" },
  { value: "blue", label: "Blue", hex: "#38BDF8" },
  { value: "orange", label: "Orange", hex: "#FB923C" },
  { value: "aqua", label: "Aqua", hex: "#A5F3FC" },
] as const;

export type ProductColor = (typeof COLOR_OPTIONS)[number]["value"];
