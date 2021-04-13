import {
  ChakraReact,
  ChakraNext,
  ChakraPostgres,
  ChakraDocker,
  ChakraJavaScript,
  ChakraTypeScript,
  ChakraStripe,
  ChakraMarkdown,
  ChakraFramer,
  ChakraBitcoin,
  ChakraEthereum,
  ChakraLitecoin,
  ChakraRipple,
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
    link: "https://rei.link",
    duration: ["Oct. '20", "Mar. '21"],
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
    component: ChakraLitecoin,
    name: "LTC",
    address: "MW57LEfQdHrEGoTNNoRxQUv7v26VTVELAU",
  },
  {
    component: ChakraEthereum,
    name: "ETH",
    address: "0x8D77C7A62246b0bf7867437f36865DdFF81D6E0E",
  },
  {
    component: ChakraRipple,
    name: "XRP",
    address: "rwEpLBJpSc3v8C8tsjw7ryvXTZNLMXnFCR",
  },
];
