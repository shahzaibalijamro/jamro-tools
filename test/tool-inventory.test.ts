import { describe, expect, it } from "vitest";
import { allTools } from "@/data/tools";
import { getRegisteredCustomToolNames } from "@/components/tools/calculators/registry";
import { toolRegressionManifest } from "./tool-regression-manifest";

describe("implemented tool regression inventory", () => {
  it("maps every configured tool and registered component to one owning suite", () => {
    const configs = allTools.map(({ slug, customComponent }) => [slug, customComponent]).sort();
    const manifest = toolRegressionManifest.map(([slug, component]) => [slug, component]).sort();
    const registered = getRegisteredCustomToolNames().sort();
    expect(configs).toHaveLength(24);
    expect(registered).toHaveLength(24);
    expect(manifest).toEqual(configs);
    expect(toolRegressionManifest.map(([, component]) => component).sort()).toEqual(registered);
    expect(new Set(toolRegressionManifest.map(([, , suite]) => suite)).size).toBe(24);
  });
});
