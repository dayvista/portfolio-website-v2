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

  const fileNames = await fs.readdir(contentPath, "utf-8");

  const frontMatterArr: object[] = [];

  await Promise.all(
    fileNames.map(async (file) => {
      const fileData = await fs.readFile(`${contentPath}/` + file);

      const parsedFile = matter(fileData.toString(), { excerpt: true });

      const { birthtime: dateCreated, mtime: dateLastEdited } = await fs.stat(
        `${contentPath}/` + file
      );

      frontMatterArr.push({
        ...parsedFile.data,
        published: dateParser(dateCreated.toString()),
        last_edited: dateParser(dateLastEdited.toString()),
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
