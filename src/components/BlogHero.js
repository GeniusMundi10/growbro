import React from "react";

export default function BlogHero() {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-green-900 dark:via-neutral-900 dark:to-green-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-black text-4xl md:text-6xl text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
          Growbro.ai Blog
        </h1>
        <p className="text-lg md:text-2xl text-neutral-700 dark:text-neutral-300 mb-6">
          Insights, stories, and updates from the frontier of trustworthy AI & business growth.
        </p>
      </div>
    </section>
  );
}
