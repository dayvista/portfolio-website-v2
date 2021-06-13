import { GetStaticProps } from "next";
import { Grid } from "@chakra-ui/react";
import { BlogPostCard } from "src/components/Blog";
import { getAllPosts, sortByDate } from "src/lib/utils";
import { BlogInterface, PostInterface } from "src/lib/interfaces";

const BlogHome = ({ posts }: BlogInterface) => {
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
  const allPosts = await getAllPosts("/src/content");

  const allPostsSortedByDate = allPosts.sort((a, b) =>
    sortByDate(a.published, b.published)
  );

  return {
    props: {
      posts: allPostsSortedByDate,
    },
  };
};
