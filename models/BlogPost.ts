import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  author?: string;
  date?: string;
  readTime?: string;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  seoTitle: { type: String },
  description: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageAlt: { type: String, required: true },
  author: { type: String, default: 'Jamro Tools' },
  date: { type: String },
  readTime: { type: String },
  content: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
