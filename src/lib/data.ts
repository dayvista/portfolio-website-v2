import {
  ChakraReact,
  ChakraNext,
  ChakraPostgres,
  ChakraDocker,
  ChakraJavaScript,
  ChakraTypeScript,
  ChakraMarkdown,
  ChakraFramer,
  ChakraBitcoin,
  ChakraEthereum,
  ChakraShopify,
} from "src/lib/icons";
import { PortfolioItemInterface } from "src/lib/interfaces";

export const portfolioItems: PortfolioItemInterface[] = [
  {
    heading: "Forge - Client Collaboration Suite",
    link: "https://forgedash.com",
    description:
      "SaaS offering for teams to manage client relationships with a suite of tools (invoicing, chat, to-do, etc.).",
    technologies: [
      { component: ChakraPostgres, name: "PostgreSQL" },
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraTypeScript, name: "TypeScript" },
    ],
  },
  {
    heading: "Gamma Guys Studio - Web Design Agency",
    link: "https://gammaguys.studio",
    description:
      "Handling project management and web development as one of four developers/designers.",
    technologies: [
      { component: ChakraFramer, name: "Framer Motion" },
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraJavaScript, name: "JavaScript" },
    ],
  },
  {
    heading: "Giuliana Design - Custom Shopfront and Art Showcase",
    link: "https://giuliana.design",
    duration: ["Apr. '21", "May '21"],
    description:
      "Responsive website that showcases artist's work. Features a shop with cart functionality, integrated with Shopify.",
    technologies: [
      { component: ChakraShopify, name: "Shopify" },
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraTypeScript, name: "TypeScript" },
    ],
  },
  {
    heading: "Invidious - Open Source, Private YouTube Front-End",
    link: "https://github.com/iv-org/documentation/",
    duration: ["Apr. '21"],
    description: "Contributed docker-compose tutorial to documentation.",
    technologies: [
      { component: ChakraDocker, name: "Docker" },
      { component: ChakraMarkdown, name: "Markdown" },
    ],
  },
  {
    heading: "REI Link - Real Estate Social Media Platform",
    link: "#",
    duration: ["Jul. '20", "Apr. '21"],
    description:
      "Managed code repo and tech-related decisions for a social real-estate listings platform. Features included live chat, auth, and dynamic searches.",
    technologies: [
      { component: ChakraPostgres, name: "PostgreSQL" },
      { component: ChakraNext, name: "Next.js" },
      { component: ChakraReact, name: "React.js" },
      { component: ChakraJavaScript, name: "JavaScript" },
    ],
  },
];

export const cryptoDonationOptions = [
  {
    component: ChakraBitcoin,
    name: "BTC",
    address: "3GnSprq2F4E14tr1MTgawdTSHeiGAzXKSt",
  },
  {
    component: ChakraEthereum,
    name: "ETH",
    address: "0x417227E2f8b8aeD3B03d71c2DC9C94332EFf6fA4",
  },
];
