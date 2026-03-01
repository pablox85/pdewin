import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe8ff",
          500: "#2563eb",
          700: "#1d4ed8",
          900: "#132a5e",
        },
      },
      boxShadow: {
        card: "0 12px 30px rgba(17, 24, 39, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
