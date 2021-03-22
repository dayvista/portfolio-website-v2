import GhostContentAPI from "@tryghost/content-api";

export const ghostApi = new GhostContentAPI({
  url: process.env.GHOST_URL,
  key: process.env.GHOST_KEY,
  version: "v3",
});
