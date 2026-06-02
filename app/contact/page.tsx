import type { Metadata } from "next";

import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "Contact Us – Request a Tool or Get Support | Jamro Tools",
  description:
    "Got a question, bug report, or tool idea? We read every message and build what our community asks for. Reach out — we usually respond within 48 hours.",
};

export default function ContactPage() {
  return <ContactView />;
}
