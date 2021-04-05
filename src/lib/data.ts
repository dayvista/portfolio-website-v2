import {
  ChakraReact,
  ChakraNext,
  ChakraPostgres,
  // ChakraDocker,
  ChakraJavaScript,
  ChakraTypeScript,
  ChakraStripe,
} from "src/lib/icons";
import { PortfolioItemInterface } from "src/lib/interfaces";

export const portfolioItems: PortfolioItemInterface[] = [
  {
    heading: "Forge - Client Collaboration Suite",
    link: "https://github.com/Gamma-Guys-Studio/forge",
    description:
      "SaaS offering for teams to manage client relationships with a suite of tools (invoicing, chat, to-do, etc.).",
    technologies: [
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraTypeScript, name: "TypeScript" },
      { component: ChakraPostgres, name: "PostgreSQL" },
    ],
  },
  // {
  //   heading: "Invidious - Open Source & Privacy-Friendly YouTube Front-End",
  //   link: "https://rei.link",
  //   duration: ["Apr. '21"],
  //   description: "Contributed docker-compose tutorial to documentation.",
  //   technologies: [{ component: ChakraDocker, name: "Docker" }],
  // },
  {
    heading: "Gamma Guys Studio - Web Design Agency",
    link: "https://gammaguys.studio",
    description:
      "Handling project management and web development as one of four developers/designers.",
    duration: ["Mar. '21", "Apr. '21"],
    technologies: [
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraJavaScript, name: "JavaScript" },
    ],
  },
  {
    heading: "Giuliana Design - Custom Shopfront and Artist Showcase",
    link: "https://giuliana.design",
    description:
      "Responsive website that showcases artist's work. Features a shop with cart functionality, integrated with Shopify.",
    technologies: [
      { component: ChakraStripe, name: "Stripe" },
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraTypeScript, name: "TypeScript" },
    ],
  },
  {
    heading: "REI Link - Real Estate ",
    link: "https://rei.link",
    duration: ["Oct. '20", "Mar. '21"],
    description:
      "Managed code repo and tech-related decisions for a social real-estate listings platform. Features included live chat, auth, and dynamic searches.",
    technologies: [
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraJavaScript, name: "JavaScript" },
      { component: ChakraPostgres, name: "PostgreSQL" },
    ],
  },
];
