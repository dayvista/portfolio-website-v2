import { getAllTagSlugs, getPostsByTag } from "src/lib/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { Grid, Heading, VStack, useColorMode } from "@chakra-ui/react";
import { BlogInterface, PostInterface } from "src/lib/interfaces";
import { BlogPostCard } from "src/components/Blog";

const FilterByTagPage = ({ posts, tag }: BlogInterface) => {
  const { colorMode } = useColorMode();

  return (
    <VStack w="100%">
      <Heading
        as="h3"
        size="lg"
        fontWeight="bold"
        alignSelf="flex-start"
        color={colorMode === "light" ? "black" : "white"}
        transition="0.25s all"
      >
        {`${(tag.charAt(0).toUpperCase() + tag.slice(1)).replace(
          "-",
          "."
        )} Articles`}
      </Heading>
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
    </VStack>
  );
};

export default FilterByTagPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postsArr = await getPostsByTag("/src/content", params.tag as string);

  return { props: { posts: postsArr, tag: params.tag } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagArr = await getAllTagSlugs("/src/content");

  return {
    paths: tagArr,
    fallback: false,
  };
};
