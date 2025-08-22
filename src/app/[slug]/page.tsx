import { type SanityDocument } from "next-sanity";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { components } from "./PortableTextComponents";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options
  );

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(800).height(400).url()
    : null;

  return (
    <main className="container mx-auto max-w-3xl p-8">
      <Link href="/" className="hover:underline text-sm">
        ← Back to posts
      </Link>

      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="w-full aspect-video rounded-xl shadow-lg my-6"
        />
      )}

      <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-8">
        {post.publishedAt &&
          new Date(post.publishedAt).toLocaleDateString("vi-VN")}
      </p>

      <article className="dark:prose-invert prose prose-lg prose-blue max-w-none">
        <PortableText value={post.content} components={components} />
      </article>
    </main>
  );
}
