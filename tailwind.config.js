/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            "bg-primary": "#FAF5FF",
            black: "#000000",
            "border-dark": "#CCCCCC",
            "border-light": "#DDDDDD",
            "brand-dark": "#44337A",
            "brand-darkest": "#322659",
            "brand-light": "#9F7AEA",
            "brand-lightest": "#B794F4",
            "brand-secondary": "#C1469C",
            brand: "#6B46C1",
            footer: "#F8F8F8",
            "hover-light": "#E9D8FD",
            "text-primary": "#030030",
            "text-secondary": "#777790",
            white: "#FFFFFF",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "4rem",
                "2xl": "6rem",
            },
        },
        extend: {},
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    radial: (value) => ({
                        backgroundImage: `radial-gradient(${value}80, transparent, transparent)`,
                    }),
                },
                { values: theme("colors") }
            );
        }),
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme("fontSize.3xl"), fontWeight: theme("fontWeight.medium"), marginBottom: theme("margin.4") },
                h2: { fontSize: theme("fontSize.2xl"), fontWeight: theme("fontWeight.medium"), marginBottom: theme("margin.4") },
                p: { marginBottom: theme("margin.2") }
            });
        }),
    ],
};
