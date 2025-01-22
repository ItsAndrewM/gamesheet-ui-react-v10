import type { Config } from "tailwindcss";
import tailwindForms from "@tailwindcss/forms";
export default {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./.storybook/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "hsl(var(--primary))",
					50: "hsl(var(--primary-50))",
					100: "hsl(var(--primary-100))",
					200: "hsl(var(--primary-200))",
					300: "hsl(var(--primary-300))",
					400: "hsl(var(--primary-400))",
					500: "hsl(var(--primary-500))",
					600: "hsl(var(--primary-600))",
					700: "hsl(var(--primary-700))",
					800: "hsl(var(--primary-800))",
					900: "hsl(var(--primary-900))",
					950: "hsl(var(--primary-950))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					50: "hsl(var(--secondary-50))",
					100: "hsl(var(--secondary-100))",
					200: "hsl(var(--secondary-200))",
					300: "hsl(var(--secondary-300))",
					400: "hsl(var(--secondary-400))",
					500: "hsl(var(--secondary-500))",
					600: "hsl(var(--secondary-600))",
					700: "hsl(var(--secondary-700))",
					800: "hsl(var(--secondary-800))",
					900: "hsl(var(--secondary-900))",
					950: "hsl(var(--secondary-950))",
				},
				tertiary: {
					DEFAULT: "hsl(var(--tertiary))",
					50: "hsl(var(--tertiary-50))",
					100: "hsl(var(--tertiary-100))",
					200: "hsl(var(--tertiary-200))",
					300: "hsl(var(--tertiary-300))",
					400: "hsl(var(--tertiary-400))",
					500: "hsl(var(--tertiary-500))",
					600: "hsl(var(--tertiary-600))",
					700: "hsl(var(--tertiary-700))",
					800: "hsl(var(--tertiary-800))",
					900: "hsl(var(--tertiary-900))",
					950: "hsl(var(--tertiary-950))",
				},
				ash: {
					DEFAULT: "hsl(var(--ash))",
					50: "hsl(var(--ash-50))",
					100: "hsl(var(--ash-100))",
					200: "hsl(var(--ash-200))",
					300: "hsl(var(--ash-300))",
					400: "hsl(var(--ash-400))",
					500: "hsl(var(--ash-500))",
					600: "hsl(var(--ash-600))",
					700: "hsl(var(--ash-700))",
					800: "hsl(var(--ash-800))",
					900: "hsl(var(--ash-900))",
					950: "hsl(var(--ash-950))",
				},
				liveBlue: {
					DEFAULT: "hsl(var(--live-blue))",
					50: "hsl(var(--live-blue-50))",
					100: "hsl(var(--live-blue-100))",
					200: "hsl(var(--live-blue-200))",
					300: "hsl(var(--live-blue-300))",
					400: "hsl(var(--live-blue-400))",
					500: "hsl(var(--live-blue-500))",
					600: "hsl(var(--live-blue-600))",
					700: "hsl(var(--live-blue-700))",
					800: "hsl(var(--live-blue-800))",
					900: "hsl(var(--live-blue-900))",
					950: "hsl(var(--live-blue-950))",
				},
				success: {
					DEFAULT: "hsl(var(--success))",
					50: "hsl(var(--success-50))",
					100: "hsl(var(--success-100))",
					200: "hsl(var(--success-200))",
					300: "hsl(var(--success-300))",
					400: "hsl(var(--success-400))",
					500: "hsl(var(--success-500))",
					600: "hsl(var(--success-600))",
					700: "hsl(var(--success-700))",
					800: "hsl(var(--success-800))",
					900: "hsl(var(--success-900))",
					950: "hsl(var(--success-950))",
				},
				danger: {
					DEFAULT: "hsl(var(--danger))",
					50: "hsl(var(--danger-50))",
					100: "hsl(var(--danger-100))",
					200: "hsl(var(--danger-200))",
					300: "hsl(var(--danger-300))",
					400: "hsl(var(--danger-400))",
					500: "hsl(var(--danger-500))",
					600: "hsl(var(--danger-600))",
					700: "hsl(var(--danger-700))",
					800: "hsl(var(--danger-800))",
					900: "hsl(var(--danger-900))",
					950: "hsl(var(--danger-950))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					50: "hsl(var(--accent-50))",
					100: "hsl(var(--accent-100))",
					200: "hsl(var(--accent-200))",
					300: "hsl(var(--accent-300))",
					400: "hsl(var(--accent-400))",
					500: "hsl(var(--accent-500))",
					600: "hsl(var(--accent-600))",
					700: "hsl(var(--accent-700))",
					800: "hsl(var(--accent-800))",
					900: "hsl(var(--accent-900))",
					950: "hsl(var(--accent-950))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			spacing: {
				"gap-sm": "var(--gap-sm)",
				"gap-md": "var(--gap-md)",
				"gap-lg": "var(--gap-lg)",
				"gap-xl": "var(--gap-xl)",
			},
			screens: {
				xs: "0px",
				sm: "576px",
				md: "768px",
				lg: "992px",
				xl: "1200px",
			},
		},
	},
	plugins: [tailwindForms],
	purge: false,
} satisfies Config;
