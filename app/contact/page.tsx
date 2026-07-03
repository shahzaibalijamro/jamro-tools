import type { Metadata } from "next";

import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact Us – Request a Tool or Get Support | Jamro Tools",
  description:
    "Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out — we usually respond within 48 hours.",
  alternates: { canonical: '/contact' },,
  openGraph: {
    title: "Contact Us - Request a Tool or Get Support | Jamro Tools",
    description: "Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out - we usually respond within 48 hours.",
    url: "https://jamrotools.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Request a Tool or Get Support | Jamro Tools",
    description: "Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out - we usually respond within 48 hours.",
  }
};

export default function ContactPage() {
  return <ContactView />;
}
