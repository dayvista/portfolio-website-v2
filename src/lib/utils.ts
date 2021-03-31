import https from "https";
import sizeOf from "image-size";
const root = require("app-root-path");
import { promises as fs } from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export const dateParser = (dateStr: string) => {
  return dayjs(dateStr).format("dddd[,] MMMM Do[,] YYYY");
};

export const getAllPosts = async (path: string): Promise<object[]> => {
  const contentPath: string = root.resolve(path);

  const fileNames: string[] = await fs.readdir(contentPath, "utf-8");

  const frontMatterArr: object[] = [];

  await Promise.all(
    fileNames.map(async (file) => {
      const fileData = await fs.readFile(`${contentPath}/` + file);

      const parsedFile = matter(fileData.toString(), { excerpt: true });

      // read when the file was created, and when it was last edited
      const { birthtime: dateCreated, mtime: dateLastEdited } = await fs.stat(
        `${contentPath}/` + file
      );

      const heroImg: string = parsedFile?.data?.hero_image;

      // get the hero image's dimensions, if there is one provided
      const dimensions = heroImg
        ? sizeOf(`${root.toString()}/public/images/blog/${heroImg}`)
        : null;

      // Create an array of strings from the file's tags
      const tags: string[] = parsedFile?.data?.tags.split(",");

      frontMatterArr.push({
        ...parsedFile.data,
        published: dateParser(dateCreated.toString()),
        last_edited: dateParser(dateLastEdited.toString()),
        hero_image_dimensions: dimensions,
        tags: tags,
      });
    })
  );

  return frontMatterArr;
};

export const getRemoteImageDimensions = (imgUrl: string) => {
  const getDimensions = new Promise<any>((resolve) => {
    const parsedImgUrl = new URL(imgUrl);

    https.get(parsedImgUrl, function (response) {
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
