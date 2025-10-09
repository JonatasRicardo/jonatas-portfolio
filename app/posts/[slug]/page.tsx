import Header from "@/src/components/header";
import { PostBody } from "@/src/components/post-body";
import { getAllPosts, getPostBySlug } from "@/src/lib/api";
import markdownToHtml from "@/src/lib/markdownToHtml";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function Post(props: Params) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const content = await markdownToHtml(post.content || "");

    return (
        <article className="mb-32">
            <Header
                title={post.title}
            />
           
            <PostBody content={content} />
        </article>
    );
}

type Params = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    const title = `${post.title} | Jonatas Santos`;

    return {
        title,
        openGraph: {
            title,
            images: [post.image],
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}