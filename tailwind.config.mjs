/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "banner-scale": "scale-x-150 ease-in-out 0.5s fixed ",
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#fe3c47",
          "primary-focus": "#00e56a",
          "primary-content": "#fafafa",

          secondary: "#ff007a",
          "secondary-focus": "#e6006f",
          "secondary-content": "#161616",

          accent: "#f5f5f5",
          "accent-focus": "#ebebeb",
          "accent-content": "#161616",

          neutral: "#f5f5f5",
          "neutral-focus": "#ebebeb",
          "neutral-content": "#737373",

          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e6e6e6",
          "base-content": "#0a0a0a",

          info: "#d16363",
          success: "#468c63",
          warning: "#a0c994",
          error: "#d93636",
        },
        dark: {
          primary: "#fe3c47",
          "primary-focus": "#e5e5e5",
          "primary-content": "#161616",

          secondary: "#262626",
          "secondary-focus": "#202020",
          "secondary-content": "#fafafa",

          accent: "#262626",
          "accent-focus": "#202020",
          "accent-content": "#fafafa",

          neutral: "#262626",
          "neutral-focus": "#202020",
          "neutral-content": "#a3a3a3",

          "base-100": "#0a0a0a",
          "base-200": "#1a1a1a",
          "base-300": "#262626",
          "base-content": "#fafafa",

          info: "#385cc7",
          success: "#2a736e",
          warning: "#8b8df0",
          error: "#9f1a1a",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
