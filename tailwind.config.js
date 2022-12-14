/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./os/web/web.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		theme: {
			screens: {
				sm: "380px",
				md: "420px",
				lg: "680px",
			},
		},
	},
	plugins: [],
};
