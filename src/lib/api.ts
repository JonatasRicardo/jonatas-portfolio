import { Post } from "@/src/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");
const articlesDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// New functions for articles/portfolio items
export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllArticles(): Post[] {
  if (!fs.existsSync(articlesDirectory)) {
    console.log('1');
    return [];
  }
  const slugs = getArticleSlugs();
  console.log('2', slugs)
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    // sort articles by date in descending order
    .sort((article1, article2) => (article1.date > article2.date ? -1 : 1));
  return articles;
}