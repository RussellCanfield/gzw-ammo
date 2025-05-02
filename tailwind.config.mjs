export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(var(--color-primary) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary) / <alpha-value>)",
				accent: "rgb(var(--color-accent) / <alpha-value>)",
				text: "rgb(var(--color-text) / <alpha-value>)",
				muted: "rgb(var(--color-muted) / <alpha-value>)",
				btn: "--color-btn",
				"btn-active": "--color-btn-active",
			},
		},
	},
};
