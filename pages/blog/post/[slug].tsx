import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getSinglePost } from "src/lib/utils";
import { useEffect } from "react";

const BlogPost = ({ post }) => {
  useEffect(() => {
    console.log(post);
  }, [post]);

  return <p style={{ color: "red" }}>{post.slug}</p>;
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string | string[] = params.slug;

  const postData = await getSinglePost(slug);

  return { props: { post: postData }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  const postSlugsArr = [];

  await Promise.all(
    allPosts.map(async (post: { slug: string }) => {
      if (post.slug) {
        postSlugsArr.push({ params: { slug: post.slug } });
      }
    })
  );

  return {
    paths: postSlugsArr,
    fallback: false,
  };
};
