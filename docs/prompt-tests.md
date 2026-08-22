# Prompt tests and acceptance

This document lists canonical example commands and expected behavior used to validate COS prompt quality.

## Test cases

1) Deep Work — Condensed
- Command: Activate Deep Work — Condensed
- Expected behavior: Assistant responds in a focused, minimal style with a short prioritized checklist (3–5 items), estimated timeboxes, and the first concrete next action.

Sample transcript:
User: Activate Deep Work — Condensed
Assistant: "Entering Deep Work (condensed). Top 3 priorities: 1) Draft section A (20 min) — start with outline; 2) Fix bug X (15 min) — run tests; 3) Prepare notes for meeting (10 min). First action: start with outline for section A. Do you want a 20-minute timer?"

2) Creative Storm — Full
- Command: Activate Creative Storm — Full
- Expected behavior: Assistant generates many (8–12) varied ideas, groups them into themes, and provides optional templates to expand on selected ideas.

3) Reset — Quick
- Command: Activate Reset — Quick
- Expected behavior: Assistant provides a short (1–3 line) recovery checklist, a summary of what was last done, and the next small action to resume work.

4) Deep Work — Quick alias behavior
- Command: Activate Deep Work — Quick
- Expected behavior: Uses Deep Work condensed behavior (quick aliases to condensed for this mode in catalog).

5) Copy feedback behavior
- Action: Click Copy Prompt after selecting any mode.
- Expected behavior: UI provides non-blocking status text announcing copy success/failure (clipboard API or fallback path).

## Notes for reviewers
- Use these commands verbatim in a test chat to check for tone and structure.
- If behavior diverges from these expectations, update `/prompts/catalog.js`, associated docs, and tests in the same change.
