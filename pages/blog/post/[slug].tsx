import { GetStaticPaths, GetStaticProps } from "next";
import { getAllPosts, getSinglePost } from "src/lib/utils";
import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const LoadingDynamic = dynamic(() => import("src/components/Loading"));

const BlogPost = ({ post }) => {
  const router = useRouter();

  useEffect(() => {
    console.log(post);
  }, [post]);

  useEffect(() => {
    if (post === null) {
      router.push("/blog");
    }
  }, [post]);

  if (router.isFallback || !post) {
    return <LoadingDynamic />;
  } else {
    return <></>;
  }
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string | string[] = params.slug;

  const postData = await getSinglePost(slug);

  return { props: { post: postData ? postData : null }, revalidate: 1 };
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
    fallback: true,
  };
};
