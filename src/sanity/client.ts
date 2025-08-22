import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dk04gs3s",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
