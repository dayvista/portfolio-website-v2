import { GetStaticProps } from "next";
import { getAllPosts, getRemoteImageDimensions } from "src/lib/utils";
import { Grid } from "@chakra-ui/react";
import BlogPostCard from "src/components/BlogPostCard";

interface BlogInterface {
  meta: object;
  posts: [];
}

interface PostInterface {
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

  let amendedPostsArr: object[] = [];

  if (allPosts) {
    await Promise.all(
      allPosts.map(async (post: PostInterface) => {
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
  }

  interface DateObjInterface {
    published_at: string;
  }

  if (amendedPostsArr.length > 1) {
    amendedPostsArr.sort((a: DateObjInterface, b: DateObjInterface): number => {
      const dateOne = new Date(a.published_at).getTime();
      const dateTwo = new Date(b.published_at).getTime();

      return dateTwo > dateOne ? 1 : -1;
    });
  }

  return {
    props: {
      meta: allPosts?.meta ? allPosts.meta : null,
      posts: amendedPostsArr,
    },
    revalidate: 1,
  };
};
