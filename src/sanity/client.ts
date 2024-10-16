//'use server'
//import "server-only";

import { createClient } from "next-sanity";

const crud ='skgHCoXbljUnatOmOlMJXxfx13KZSLXoWWYZi0Yj70LB7tpk3I1q7dQmgu2PE0Ae6CkHNqsDpdHw3v2Yke6p2cE8znU2JbmrJj4IFnWOo0XloHcR2ioItQjLGG2ioMRM8NDieIrciiuVpWFRapZh0CwHT9ZBJ5RVzjk70N7n5E1KBWa10VWM'

export const client = createClient({
  projectId: "hav0je78",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
});

/* export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
      tags,
    },
  });
} */