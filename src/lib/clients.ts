import { createClient as createPexelsClient } from "pexels";

export const pexelsClient = createPexelsClient(
  process.env.NEXT_PUBLIC_PEXELS_API_KEY
);
