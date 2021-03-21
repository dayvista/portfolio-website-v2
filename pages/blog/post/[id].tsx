import { GetStaticPaths, GetStaticProps } from "next";

const BlogPost = () => {
  return <></>;
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
};
