import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ysld117o';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-05-03'; // Use current UTC date or specific date

// Read-only client (highly cached via CDN)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // true for fast, edge-cached queries
});

// Write client (bypasses CDN, uses write token for submitting contact forms)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
