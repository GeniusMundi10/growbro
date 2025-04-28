import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900 hover:shadow-2xl transition-shadow border border-neutral-200 dark:border-neutral-800">
      <div className="h-48 w-full bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-green-900 dark:via-neutral-900 dark:to-green-950 flex items-end justify-end">
        {post.cover && (
          <img src={post.cover} alt={post.title} className="object-cover w-full h-full" />
        )}
      </div>
      <div className="p-6">
        <div className="flex gap-2 mb-2 text-xs text-green-600 font-semibold uppercase">
          {post.tags && post.tags.map(t => <span key={t}>{t}</span>)}
        </div>
        <h3 className="font-extrabold text-2xl mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{post.title}</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4 line-clamp-3">{post.summary}</p>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{post.author}</span>
          <span className="mx-1">·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
