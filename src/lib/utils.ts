import { ghostApi } from "src/lib/instances";

export const getPosts = async () => {
  return await ghostApi.posts.browse({ limit: "all" }).catch((err) => {
    console.error(err);
  });
};

export const getSinglePost = async (postSlug: string) => {
  return await ghostApi.posts
    .read({
      slug: postSlug,
    })
    .catch((err) => {
      console.error(err);
    });
};
