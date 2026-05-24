"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/data/blogPosts";
import { categoryBadgeClasses } from "@/data/blogPosts";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="group glass-card rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-2"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden relative">
        <Image
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          src={post.imageUrl}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Category badge */}
        <div className="absolute top-[16px] left-[16px]">
          <span
            className={`px-[16px] py-xs rounded-full text-label-sm ${
              categoryBadgeClasses[post.category]
            }`}
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-[24px] flex flex-col flex-grow">
        <h2 className="text-title-lg text-on-surface mb-[8px] group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        <p className="text-body-md text-on-surface-variant mb-[24px] flex-grow">
          {post.excerpt}
        </p>
        <Link
          href="#"
          className="inline-flex items-center text-primary text-label-md group/link"
        >
          Read More{" "}
          <span className="material-symbols-outlined ml-xs group-hover/link:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </article>
  );
}