import { ChakraComponent } from "@chakra-ui/react";

export interface BlogInterface {
  posts: PostInterface[];
  tag?: string;
}

export interface PostInterface {
  hero_image?: string;
  hero_image_dimensions: {
    height: number;
    width: number;
  };
  description?: string;
  published?: string;
  last_edited?: string;
  slug: string;
  title?: string;
  tags: string[];
  minutes_to_read?: number;
  md?: string;
}

export interface PortfolioItemInterface {
  heading: string;
  duration?: [string, string] | [string];
  description: string;
  technologies: { component: ChakraComponent<any>; name: string }[];
  link: string;
}

export interface CryptoDonationOptionsInterface {
  component: ChakraComponent<any>;
  name: string;
  address: string;
}
