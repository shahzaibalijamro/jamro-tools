import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { searchTools } from "@/lib/search-index";

describe("test configuration", () => {
  it("resolves the root alias and supplies a browser-like DOM", () => {
    render(<button type="button">Configured</button>);

    expect(screen.getByRole("button", { name: "Configured" })).toBeInTheDocument();
    expect(searchTools("mortgage")[0]?.slug).toBe("mortgage-calculator");
  });
});
