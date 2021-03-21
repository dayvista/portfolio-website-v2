interface ComponentStyles {
  baseStyle?: object;
  sizes?: object;
  variants?: object;
}

export const Heading: ComponentStyles = {
  baseStyle: {
    fontFamily: "BioRhyme, serif",
  },
  sizes: {
    sm: {
      fontSize: "24px",
    },
    md: {
      fontSize: "28px",
    },
    lg: {
      fontSize: "32px",
    },
  },
};

export const Text: ComponentStyles = {
  baseStyle: {
    fontFamily: "Space Grotesk, sans-serif",
  },
};
