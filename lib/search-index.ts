import { allTools } from "@/data/tools/index";
import { calculatorCategories } from "@/data/calculator-tools";

export interface SearchEntry {
  slug: string;
  title: string;
  description: string;
  category: string;       // e.g. "math"
  categoryTitle: string;   // e.g. "Math"
  href: string;
  /** True if the tool has a custom component (fully implemented) */
  implemented: boolean;
}

let _index: SearchEntry[] | null = null;

function buildIndex(): SearchEntry[] {
  if (_index) return _index;

  _index = allTools.map((tool) => {
    const cat = calculatorCategories.find((c) => c.slug === tool.category);
    return {
      slug: tool.slug,
      title: tool.title,
      description: tool.description,
      category: tool.category,
      categoryTitle: cat?.title ?? tool.category,
      href: `/tools/calculators/${tool.category}/${tool.slug}`,
      implemented: !!tool.customComponent,
    };
  });

  return _index;
}

/**
 * Perform a case-insensitive fuzzy search across tool titles and descriptions.
 * Returns results ranked by match quality:
 *   1. Exact title match
 *   2. Title starts with query
 *   3. Title contains query
 *   4. Description contains query
 */
export function searchTools(query: string): SearchEntry[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.toLowerCase().trim();
  const index = buildIndex();

  // Score each entry
  const scored = index
    .map((entry) => {
      const titleLower = entry.title.toLowerCase();
      const descLower = entry.description.toLowerCase();
      let score = 0;

      if (titleLower === q) {
        score = 100;
      } else if (titleLower.startsWith(q)) {
        score = 80;
      } else if (titleLower.includes(q)) {
        score = 60;
      } else if (descLower.includes(q)) {
        score = 40;
      }

      return { entry, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.entry);

  return scored;
}

/** Return all searchable tools (for empty-query "quick list" if desired) */
export function getAllSearchEntries(): SearchEntry[] {
  return buildIndex();
}