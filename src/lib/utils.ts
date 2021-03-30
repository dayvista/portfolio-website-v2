import { ghostApi } from "src/lib/instances";
const url = require("url");
const https = require("https");
const sizeOf = require("image-size");

export const getAllPosts = async () => {
  return await ghostApi.posts
    .browse({ limit: "all", include: "tags,authors" })
    .catch(() => {
      console.log("Error fetching all posts.");
    });
};

export const getSinglePost = async (postSlug: string | string[]) => {
  return await ghostApi.posts
    .read({
      slug: postSlug,
      include: "tags,authors",
    })
    .catch(() => {
      console.log("Error fetching single post.");
    });
};

export const getRemoteImageDimensions = (imgUrl: string) => {
  const getDimensions = new Promise<any>((resolve) => {
    https.get(url.parse(imgUrl), function (response) {
      const chunks = [];

      response
        .on("data", function (chunk: number | string) {
          chunks.push(chunk);
        })
        .on("end", function () {
          const buffer = Buffer.concat(chunks);

          resolve(sizeOf(buffer));
        });
    });
  });

  return getDimensions.then(
    function (data) {
      return data;
    },
    function (error) {
      console.error(error);
    }
  );
};
