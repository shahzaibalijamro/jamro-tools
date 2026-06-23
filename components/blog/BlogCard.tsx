"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types/blog";
import { categoryBadgeClasses } from "@/lib/types/blog";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}
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
        {/* Category badges */}
        <div className="absolute top-[16px] left-[16px] flex flex-wrap gap-1.5 max-w-[calc(100%-32px)]">
          {post.categories?.map((cat) => (
            <span
              key={cat}
              className={`px-[12px] py-xs rounded-full text-label-sm ${
                categoryBadgeClasses[cat] || "bg-primary text-on-primary"
              }`}
            >
              {cat}
            </span>
          ))}
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
        <span className="inline-flex items-center text-primary text-label-md">
          Read More{" "}
          <span className="material-symbols-outlined ml-xs group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </span>
      </div>
    </Link>
  );
}
