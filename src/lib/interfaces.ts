export interface BlogInterface {
  posts: object[];
  tag?: string;
}

export interface PostInterface {
  hero_image: string;
  hero_image_dimensions: {
    height: number;
    width: number;
  };
  published: string;
  last_edited: string;
  slug: string;
  title: string;
  tags: string[];
}
