import { GetStaticProps } from "next";
import { getAllPosts, getRemoteImageDimensions } from "src/lib/utils";
import { Grid, useColorModeValue, useColorMode } from "@chakra-ui/react";
import BlogPostCard from "src/components/BlogPostCard";

interface BlogHomeProps {
  meta: object;
  posts: [];
}

interface PostProps {
  slug: string;
  feature_image: string;
  uuid: string;
  id: string;
  feature_image_dimensions: {
    height: number;
    width: number;
  };
  title: string;
  published_at: string;
}

const BlogHome = ({ posts }: BlogHomeProps) => {
  const scrollbar = useColorModeValue("light_scroll", "dark_scroll");
  const color = useColorModeValue("black", "white");

  const { colorMode } = useColorMode();

  // TODO: handle pagination with 'meta' prop
  return (
    <Grid
      w="100%"
      minH="57.5vh"
      h="100%"
      m="2.5vh 0 !important"
      templateColumns="repeat(3, 1fr)"
      borderRadius="5px"
      gap={3}
      bg={color}
      color={color}
      overflowX="hidden"
      overflowY="scroll"
      boxShadow={
        colorMode === "light"
          ? "-1px 2px 13px 1px rgba(37,38,39,0.4)"
          : "-1px 2px 13px 1px rgba(242,239,233,0.4)"
      }
      transition="0.25s all"
      className={`scroll ${scrollbar}`}
    >
      {posts.map((post: PostProps) => {
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
  const allPosts = await getAllPosts();

  const amendedPostsArr = [];

  await Promise.all(
    allPosts.map(async (post: PostProps) => {
      if (post.feature_image) {
        const dimensions = await getRemoteImageDimensions(post.feature_image);

        amendedPostsArr.push({
          ...post,
          feature_image_dimensions: {
            width: dimensions.width,
            height: dimensions.height,
          },
        });
      } else {
        amendedPostsArr.push(post);
      }
    })
  );

  return {
    props: {
      meta: allPosts.meta,
      posts: amendedPostsArr,
    },
    revalidate: 1,
  };
};
