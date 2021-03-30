import { GetStaticProps } from "next";
import { Grid } from "@chakra-ui/react";
import BlogPostCard from "src/components/BlogPostCard";
import { useEffect } from "react";
import { getAllPosts } from "src/lib/utils";

interface BlogInterface {
  meta: object;
  posts: [];
}

interface PostInterface {
  slug: string;
  feature_image: string;
  // hero_image: string;
  uuid: string;
  id: string;
  feature_image_dimensions: {
    height: number;
    width: number;
  };
  title: string;
  published_at: string;
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
        return (
          <BlogPostCard
            heroImg={post.feature_image}
            slug={post.slug}
            title={post.title}
            datePosted={post.published_at}
            key={post.uuid}
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
