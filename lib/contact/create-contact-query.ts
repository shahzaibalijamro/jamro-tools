import { isFixtureMode } from "@/lib/test-mode";

export interface ContactQueryInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function createContactQuery(input: ContactQueryInput) {
  if (isFixtureMode()) {
    const { fixtureContactResult } = await import("@/test/fixtures/content");
    return { ...fixtureContactResult };
  }

  const { writeClient } = await import("@/lib/sanity");
  return writeClient.create({
    _type: "contactQuery",
    ...input,
    createdAt: new Date().toISOString(),
  });
}
