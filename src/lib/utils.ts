import https from "https";
import sizeOf from "image-size";
const root = require("app-root-path");
import { promises as fs } from "fs";
import matter from "gray-matter";
import dayjs from "dayjs";
const advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);
import readingTime from "reading-time";

export const dateParser = (dateStr: string) => {
  return dayjs(dateStr).format("dddd[,] MMMM Do[,] YYYY");
};

export const getAllPostSlugs = async (
  path: string
): Promise<{ params: { slug: string } }[]> => {
  const contentPath: string = root.resolve(path);

  const fileNames: string[] = await fs.readdir(contentPath, "utf-8");

  const parsedFileNames: { params: { slug: string } }[] = [];

  fileNames.forEach((name: string) => {
    parsedFileNames.push({ params: { slug: name.split(".md")[0] } });
  });

  return parsedFileNames;
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
      const tags: string[] = parsedFile?.data?.tags?.split(",");

      frontMatterArr.push({
        ...parsedFile?.data,
        published: dateParser(dateCreated.toString()),
        last_edited: dateParser(dateLastEdited.toString()),
        hero_image_dimensions: dimensions,
        slug: file.split(".md")[0],
        tags: tags,
      });
    })
  );

  return frontMatterArr;
};

export const getSinglePost = async (
  path: string,
  fileName: string
): Promise<object> => {
  const contentPath: string = root.resolve(path);
  const filePath: string = `${contentPath}/${fileName}`;

  const fileData = await fs.readFile(filePath);

  const parsedFile = matter(fileData.toString(), { excerpt: true });

  // read when the file was created, and when it was last edited
  const { birthtime: dateCreated, mtime: dateLastEdited } = await fs.stat(
    filePath
  );

  const heroImg: string = parsedFile?.data?.hero_image;

  // get the hero image's dimensions, if there is one provided
  const dimensions = heroImg
    ? sizeOf(`${root.toString()}/public/images/blog/${heroImg}`)
    : null;

  // Create an array of strings from the file's tags
  const tags: string[] = parsedFile?.data?.tags?.split(",");

  const readingTimeInMin = Math.round(readingTime(parsedFile.content).minutes);

  const fileDataObj = {
    ...parsedFile?.data,
    md: parsedFile.content,
    published: dateParser(dateCreated.toString()),
    last_edited: dateParser(dateLastEdited.toString()),
    hero_image_dimensions: dimensions,
    tags: tags,
    slug: typeof fileName === "string" && (fileName as string).split(".md")[0],
    minutes_to_read: readingTimeInMin > 0 ? readingTimeInMin : 0.5,
  };

  return fileDataObj;
};

export const getAllTagSlugs = async (
  path: string
): Promise<{ params: { tag: string } }[]> => {
  const contentPath: string = root.resolve(path);

  const fileNames: string[] = await fs.readdir(contentPath, "utf-8");

  const tagsArr: { params: { tag: string } }[] = [];

  await Promise.all(
    fileNames.map(async (file) => {
      const fileData = await fs.readFile(`${contentPath}/` + file);

      const parsedFile = matter(fileData.toString(), { excerpt: true });

      const tags: string[] = parsedFile?.data?.tags?.split(",");

      tags.forEach((tag) => {
        if (tagsArr.every((obj) => obj.params.tag !== tag)) {
          tagsArr.push({ params: { tag: tag } });
        }
      });
    })
  );

  return tagsArr;
};

export const getPostsByTag = async (path: string, contextTag: string) => {
  const contentPath: string = root.resolve(path);

  const fileNames: string[] = await fs.readdir(contentPath, "utf-8");

  const frontMatterArr: object[] = [];

  await Promise.all(
    fileNames.map(async (file) => {
      const fileData = await fs.readFile(`${contentPath}/` + file);

      const parsedFile = matter(fileData.toString(), { excerpt: true });

      // Create an array of strings from the file's tags
      const tags: string[] = parsedFile?.data?.tags?.split(",");

      if (tags.some((tag) => tag === contextTag)) {
        // read when the file was created, and when it was last edited
        const { birthtime: dateCreated, mtime: dateLastEdited } = await fs.stat(
          `${contentPath}/` + file
        );

        const heroImg: string = parsedFile?.data?.hero_image;

        // get the hero image's dimensions, if there is one provided
        const dimensions = heroImg
          ? sizeOf(`${root.toString()}/public/images/blog/${heroImg}`)
          : null;

        frontMatterArr.push({
          ...parsedFile?.data,
          published: dateParser(dateCreated.toString()),
          last_edited: dateParser(dateLastEdited.toString()),
          hero_image_dimensions: dimensions,
          slug: file.split(".md")[0],
          tags: tags,
        });
      }
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
