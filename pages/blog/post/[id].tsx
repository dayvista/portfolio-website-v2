import { GetStaticPaths, GetStaticProps } from "next";

const BlogPost = () => {
  return <></>;
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async () => {
  return { props: {}, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // if (!posts) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    paths: [{ params: { id: "1" } }],
    fallback: false,
  };
};
