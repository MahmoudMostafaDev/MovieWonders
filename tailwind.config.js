tailwind.config = {
  theme: {
    extend: {
      container: {
        padding: {
          "2xl": "6rem",
        },
      },
      colors: {
        primary: "#222831",
        secondary: "#31363F",
        "secondary-50": "rgba(49, 54, 63, 0.58)",
        "text-color": "#fff",
        "accent-primary": "#76ABAE",
        "accent-primary-hover": "#7db8bb",
        "accent-secondary": "rgba(118, 171, 174, 0.73)",
        background:
          "linear-gradient(180deg, rgba(4,7,15,1) 0%, rgba(2,3,7,1) 100%)",
        "secondary-text": "#9B9B9B",
        "half-background": "rgba(49, 54, 63, 0.5)",
      },
      height: {
        128: "35rem",
        132: "45rem",
      },
      width: {
        card: "236px",
        90: "90%",
        600: "600px",
        550: "550px",
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
      },
    },
  },
};
