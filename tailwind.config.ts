import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
      colors: {
        himmel: "#121c2e",
        sand: "#bca689",
        lyng: "#4f111c",
        solfald: "#f8d7c1",
        hav: "#0000ff",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
