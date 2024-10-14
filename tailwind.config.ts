import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
      },
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes:{
      light: {
          extend: "light", // <- inherit default values from light theme
          colors: {
            background: "#F1F2F4",
            foreground: "#22272B",
            overlay:"#22272B",
            primary: {
              "100": "#F8FCDC",
              "200": "#F1F9BA",
              "300": "#E0ED94",
              "400": "#CBDC75",
              "500": "#AFC54A",
              "600": "#92A936",
              "700": "#778D25",
              "800": "#5C7217",
              "900": "#4A5E0E",
              DEFAULT: "#778D25",
              foreground: "#ffffff",
            },
            secondary:{
              "100": "#FBE6DC",
              "200": "#F8C9BA",
              "300": "#EAA192",
              "400": "#D67971",
              "500": "#bb4647",
              "600": "#A0333D",
              "700": "#862335",
              "800": "#6C162D",
              "900": "#590D28",
              DEFAULT:"#862335",
              foreground:"#fff"
            },
            focus: "#F182F6",
          },
          /* layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          }, */
        },
      
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#22272B",
            foreground: "#F1F2F4",
            overlay:"#22272B",
            primary: {
              "100": "#F8FCDC",
              "200": "#F1F9BA",
              "300": "#E0ED94",
              "400": "#CBDC75",
              "500": "#AFC54A",
              "600": "#92A936",
              "700": "#778D25",
              "800": "#5C7217",
              "900": "#4A5E0E",
              DEFAULT: "#CBDC75",
              foreground: "#ffffff",
            },
            secondary:{
              "100": "#FBE6DC",
              "200": "#F8C9BA",
              "300": "#EAA192",
              "400": "#D67971",
              "500": "#bb4647",
              "600": "#A0333D",
              "700": "#862335",
              "800": "#6C162D",
              "900": "#590D28",
              DEFAULT:"#D67971",
              foreground:"#fff"
            },
            focus: "#F182F6",
          }
        },
    }
  })]
};
export default config;
