#!/usr/bin/env node
import { readFileSync } from "fs";
import { join } from "path";

interface HookInput {
  session_id: string;
  transcript_path: string;
  cwd: string;
  permission_mode: string;
  prompt: string;
}

interface PromptTriggers {
  keywords?: string[];
  intentPatterns?: string[];
}

interface AgentRule {
  priority: "critical" | "high" | "medium" | "low";
  description: string;
  promptTriggers?: PromptTriggers;
}

interface AgentRules {
  version: string;
  description: string;
  agents: Record<string, AgentRule>;
}

interface MatchedAgent {
  name: string;
  matchType: "keyword" | "intent";
  config: AgentRule;
}

async function main() {
  try {
    // Read input from stdin
    const input = readFileSync(0, "utf-8");
    const data: HookInput = JSON.parse(input);
    const prompt = data.prompt.toLowerCase();

    // Load agent rules
    const projectDir = process.env.CLAUDE_PROJECT_DIR || "$HOME/project";
    const rulesPath = join(projectDir, ".claude", "skills", "agent-rules.json");
    const rules: AgentRules = JSON.parse(readFileSync(rulesPath, "utf-8"));

    const matchedAgents: MatchedAgent[] = [];

    // Check each agent for matches
    for (const [agentName, config] of Object.entries(rules.agents)) {
      const triggers = config.promptTriggers;
      if (!triggers) {
        continue;
      }

      // Keyword matching
      if (triggers.keywords) {
        const keywordMatch = triggers.keywords.some((kw) =>
          prompt.includes(kw.toLowerCase()),
        );
        if (keywordMatch) {
          matchedAgents.push({ name: agentName, matchType: "keyword", config });
          continue;
        }
      }

      // Intent pattern matching
      if (triggers.intentPatterns) {
        const intentMatch = triggers.intentPatterns.some((pattern) => {
          const regex = new RegExp(pattern, "i");
          return regex.test(prompt);
        });
        if (intentMatch) {
          matchedAgents.push({ name: agentName, matchType: "intent", config });
        }
      }
    }

    // Generate output if matches found
    if (matchedAgents.length > 0) {
      let output = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
      output += "🤖 AGENT ACTIVATION CHECK\n";
      output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";

      // Group by priority
      const critical = matchedAgents.filter(
        (a) => a.config.priority === "critical",
      );
      const high = matchedAgents.filter((a) => a.config.priority === "high");
      const medium = matchedAgents.filter(
        (a) => a.config.priority === "medium",
      );
      const low = matchedAgents.filter((a) => a.config.priority === "low");

      if (critical.length > 0) {
        output += "⚠️ CRITICAL AGENTS (REQUIRED):\n";
        critical.forEach(
          (a) => (output += `  → ${a.name}: ${a.config.description}\n`),
        );
        output += "\n";
      }

      if (high.length > 0) {
        output += "📚 RECOMMENDED AGENTS:\n";
        high.forEach(
          (a) => (output += `  → ${a.name}: ${a.config.description}\n`),
        );
        output += "\n";
      }

      if (medium.length > 0) {
        output += "💡 SUGGESTED AGENTS:\n";
        medium.forEach(
          (a) => (output += `  → ${a.name}: ${a.config.description}\n`),
        );
        output += "\n";
      }

      if (low.length > 0) {
        output += "📌 OPTIONAL AGENTS:\n";
        low.forEach(
          (a) => (output += `  → ${a.name}: ${a.config.description}\n`),
        );
        output += "\n";
      }

      output += "ACTION: Use Task tool with subagent_type BEFORE responding\n";
      output += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";

      console.log(output);
    }

    process.exit(0);
  } catch (err) {
    console.error("Error in agent-activation-prompt hook:", err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Uncaught error:", err);
  process.exit(1);
});
