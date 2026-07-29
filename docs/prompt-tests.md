# Prompt tests and acceptance

This document lists canonical example commands, the expected assistant behavior, and sample transcripts you can use to validate the master COS prompt.

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

## Notes for reviewers
- Use these commands verbatim in a test chat to check for tone and structure.
- If the assistant fails to match expected structure, file feedback in the prompt-feedback issue template or comment directly on PR #4.
