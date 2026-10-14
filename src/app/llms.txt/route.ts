import { faqs, features, plan, site } from "@/content/site";
import { switching, trades } from "@/content/trades";

/**
 * /llms.txt: a plain-text summary of Kikai for AI assistants (ChatGPT,
 * Perplexity, Claude, Gemini) to read and quote. Built from the same content
 * as the pages, so it can't say anything the site doesn't.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Kikai is built in the UK for appointment-based salons. It answers the salon's existing phone number (forwarded), so clients ring the number they already know. Setup is done for the salon and takes about a week. There is a monthly plan and a one-off setup fee.",
    "",
    "## What it does",
    ...features.map((f) => `- ${f.title}: ${f.body}`),
    "",
    "## Included in the plan",
    ...plan.map((p) => `- ${p}`),
    "",
    "## Switching to Kikai",
    `${switching.body} Moved during setup: ${switching.moves.join(", ").toLowerCase()}.`,
    "",
    "## Who it's for",
    ...trades.map((t) => `- [${t.title}](${site.url}/for/${t.slug}): ${t.description}`),
    "",
    "## Questions",
    ...faqs.filter((f) => f.a).map((f) => `- ${f.q} ${f.a}`),
    "",
    "## Links",
    `- [Home](${site.url})`,
    `- [Sign up](${site.url}/start)`,
  ];
  return new Response(lines.join("\n") + "\n", { headers: { "content-type": "text/plain; charset=utf-8" } });
}
