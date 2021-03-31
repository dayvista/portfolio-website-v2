interface ComponentStylesInterface {
  baseStyle?: object;
  sizes?: {
    xs?: object;
    sm?: object;
    md?: object;
    lg?: object;
    xl?: object;
  };
  variants?: object;
}

export const Heading: ComponentStylesInterface = {
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

export const Text: ComponentStylesInterface = {
  baseStyle: {
    fontFamily: "Space Grotesk, sans-serif",
  },
};

export const Button: ComponentStylesInterface = {
  variants: {
    tag: {
      background: "grey.base",
      borderRadius: "5px",
      color: "white",
      fontSize: "13px",
      padding: "5px !important",
      transition: "0.25s all",
      _hover: {
        background: "grey.500",
      },
    },
  },
};
