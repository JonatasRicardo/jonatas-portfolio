import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBody } from "components/articles/post-body";
import Header from "components/header";
import { getAllPosts, getPostBySlug } from "lib/api";

export default async function Post(props: Params) {
    const params = await props.params;
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return (
        <article className="mb-32">
            <Header
                title={post.title}
                description={post.description}
            />
                       
            <PostBody image={post.image} content={post.content} />
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