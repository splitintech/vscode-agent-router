import type { PeerAdapter } from "../core/types";
import { probePeer } from "../core/probe";
import { loadMergedCatalog, PeerRegistry } from "../core/registry";
import { launchIdePeer, refuseVendorCli } from "./ideLaunch";
import { encodeClaudeHandoffUri } from "../core/launchUri";

export { encodeClaudeHandoffUri };

export const claudeAdapter: PeerAdapter = {
  id: "claude",
  async route(req) {
    const runtime = req.runtime ?? "ide";
    if (runtime !== "ide") return refuseVendorCli("claude", req);
    const prompt = String(req.prompt ?? req.params?.prompt ?? "");
    return launchIdePeer("claude", req, prompt);
  },
  async probe(ctx) {
    return probePeer(new PeerRegistry(loadMergedCatalog()).get("claude"), ctx);
  },
};
