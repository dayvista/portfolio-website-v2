interface SizeObject {
  fontSize: string;
}

interface ComponentStyles {
  baseStyle?: object;
  sizes?: {
    xs?: SizeObject;
    sm?: SizeObject;
    md?: SizeObject;
    lg?: SizeObject;
    xl?: SizeObject;
  };
  variants?: object;
}

export const Heading: ComponentStyles = {
  baseStyle: {
    fontFamily: "BioRhyme, serif",
  },
  sizes: {
    xs: {
      fontSize: "18px",
    },
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
