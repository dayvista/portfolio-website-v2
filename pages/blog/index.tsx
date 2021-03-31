import { GetStaticProps } from "next";
import { Grid } from "@chakra-ui/react";
import BlogPostCard from "src/components/BlogPostCard";
import { useEffect } from "react";
import { getAllPosts } from "src/lib/utils";

interface BlogInterface {
  posts: object[];
}

interface PostInterface {
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

const BlogHome = ({ posts }: BlogInterface) => {
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <Grid
      w="100%"
      templateColumns={[
        "repeat(1, 1fr)",
        null,
        "repeat(2, 1fr)",
        null,
        "repeat(3, 1fr)",
      ]}
      gap={3}
      transition="0.25s all"
      mt="2.5vh !important"
      mb="2.5vh !important"
    >
      {posts.map((post: PostInterface) => {
        const {
          hero_image: heroImg,
          slug,
          title,
          published: datePosted,
          tags,
        } = post;

        return (
          <BlogPostCard
            heroImg={heroImg}
            slug={slug}
            title={title}
            datePosted={datePosted}
            tags={tags}
            key={`${post.slug}-${post.published}`}
          />
        );
      })}
    </Grid>
  );
};

export default BlogHome;

export const getStaticProps: GetStaticProps = async () => {
  const allPostsArr = await getAllPosts("/src/content");

  return {
    props: {
      posts: allPostsArr,
    },
  };
};
