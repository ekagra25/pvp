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
            "bg-disabled": "#E7E7E7",
            "bg-primary": "#FAF5FF",
            "bg-success": "#E1F4E3",
            black: "#000000",
            "border-dark": "#CCCCCC",
            "border-light": "#DDDDDD",
            "brand-dark": "#44337A",
            "brand-darkest": "#322659",
            "brand-light": "#9F7AEA",
            "brand-lightest": "#B794F4",
            "brand-secondary": "#C1469C",
            brand: "#6B46C1",
            error: "#CF0808",
            footer: "#F8F8F8",
            "hover-light": "#E9D8FD",
            success: "#08A618",
            "text-disabled": "#C5C5C5",
            "text-primary": "#030030",
            "text-secondary": "#777790",
            "text-tertiary": "#AAA9B6",
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
        extend: {
            spacing: {
                15: "3.75rem"
            },
            backgroundImage: {
                contact: "url('/images/contactForm.png')"
            },
            // keyframes: {
            //     loader: {
            //         "0%": { backgroundImage: `conic-gradient(${value} 0deg, transparent)` }
            //     }
            // }
        },
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
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    conic: (value) => ({
                        backgroundImage: `conic-gradient(${value} 0deg, transparent)`,
                        keyframes: {
                            loader: {
                                "0%": {
                                    opacity: 1,
                                    backgroundImage: `conic-gradient(${value} 0deg, transparent)`,
                                },
                                "100%": {
                                    opacity: 0,
                                    backgroundImage: `conic-gradient(${value} 360deg, transparent)`,
                                }
                            }
                        },
                        animation: "pulse 5s ease"
                    }),
                },
                { values: theme("colors") }
            );
        }),
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: { paddingLeft: theme("padding.2"), fontSize: theme("fontSize.3xl"), fontWeight: theme("fontWeight.medium"), marginBottom: theme("margin.4"), borderLeftWidth: theme("borderWidth.4"), borderColor: theme("colors.brand") },
                h2: { paddingLeft: theme("padding.2"), fontSize: theme("fontSize.2xl"), fontWeight: theme("fontWeight.medium"), marginBottom: theme("margin.4"), borderLeftWidth: theme("borderWidth.4"), borderColor: theme("colors.brand") },
                p: { marginBottom: theme("margin.2") }
            });
        }),
    ],
};
