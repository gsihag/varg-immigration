
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Psychology-Based Color Palette
        trust: {
          blue: "rgb(37, 99, 235)",
          deep: "rgb(29, 78, 216)",
        },
        action: {
          orange: "rgb(234, 88, 12)",
          warm: "rgb(251, 146, 60)",
        },
        success: {
          green: "rgb(34, 197, 94)",
        },
        energy: {
          pink: "rgb(236, 72, 153)",
        },
        confidence: {
          purple: "rgb(147, 51, 234)",
        },
        warmth: {
          coral: "rgb(251, 113, 133)",
        },
        excitement: {
          red: "rgb(239, 68, 68)",
        },
        calm: {
          teal: "rgb(20, 184, 166)",
        },
        // Legacy Australia colors for compatibility
        australia: {
          blue: "rgb(37, 99, 235)",
          darkBlue: "rgb(29, 78, 216)",
          gold: "rgb(251, 146, 60)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(234, 88, 12, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(234, 88, 12, 0.6)",
          },
        },
        "attention-grab": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "attention-grab": "attention-grab 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-trust': 'linear-gradient(135deg, rgb(37, 99, 235), rgb(29, 78, 216))',
        'gradient-action': 'linear-gradient(135deg, rgb(234, 88, 12), rgb(251, 146, 60))',
        'gradient-energy': 'linear-gradient(135deg, rgb(236, 72, 153), rgb(147, 51, 234))',
        'gradient-success': 'linear-gradient(135deg, rgb(34, 197, 94), rgb(20, 184, 166))',
        'gradient-warm': 'linear-gradient(135deg, rgb(251, 113, 133), rgb(251, 146, 60))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
