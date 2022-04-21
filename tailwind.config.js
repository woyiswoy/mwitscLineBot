module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                IBMPlex: ["IBM Plex Sans Thai Looped", "sans-serif"],
                Kodchasan: ["Kodchasan", "sans-serif"]
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        prefix: "ds-",
    },
}