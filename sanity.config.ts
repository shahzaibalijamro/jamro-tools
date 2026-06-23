import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ysld117o';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  title: 'Jamro Tools Admin',
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
