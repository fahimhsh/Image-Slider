/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        "container-max-width": "1200px",
      },
      width: {
        "container-width": "95%",
        "image-width": "325px",
      },
      gap: {
        "image-gap": "18px",
      },
      height: {
        "image-height": "400px",
      },
      backgroundColor: {
        "back-body": "#f1f4fd",
      },
    },
  },
  plugins: [],
};
