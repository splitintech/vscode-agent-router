import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { BUNDLED_PROMPTS_DIR, composeRoutePrompt, loadCatalogPrompt, resolvePromptsDir } from "../src/core/prompts";

const bundledPrompts = join(dirname(fileURLToPath(import.meta.url)), "../prompts");

describe("prompt catalog loader", () => {
  it("loads the bundled catalog without an Ideation checkout", () => {
    expect(loadCatalogPrompt("chatgpt.plan", BUNDLED_PROMPTS_DIR)).toMatch(/chatgpt\.plan/);
    expect(loadCatalogPrompt("chatgpt.plan", BUNDLED_PROMPTS_DIR)).toBe(loadCatalogPrompt("chatgpt.plan", bundledPrompts));
    expect(() => loadCatalogPrompt("unknown.prompt", BUNDLED_PROMPTS_DIR)).toThrow(/Unknown bundled prompt/);
  });

  it("preserves explicitly configured catalogs", () => {
    expect(resolvePromptsDir("/unrelated/workspace", bundledPrompts)).toBe(bundledPrompts);
  });

  it("composes promptId + user prompt + memoryPacket", () => {
    const dir = mkdtempSync(join(tmpdir(), "ar-prompts-"));
    mkdirSync(join(dir, "chatgpt"));
    writeFileSync(
      join(dir, "catalog.yaml"),
      "prompts:\n  - id: chatgpt.plan\n    file: chatgpt/plan.md\n",
    );
    writeFileSync(join(dir, "chatgpt", "plan.md"), "PLAN BODY {{goal}}\n");
    const text = composeRoutePrompt(
      {
        peer: "chatgpt",
        action: "handoff",
        prompt: "the idea",
        params: { promptId: "chatgpt.plan", memoryPacket: "MEMORY excerpt" },
      },
      dir,
    );
    expect(text).toContain("PLAN BODY");
    expect(text).toContain("the idea");
    expect(text).toContain("MEMORY excerpt");
  });
});
