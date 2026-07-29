Summary
Finalize and merge the cleaned master Creative Operating System (COS) prompt and PR notes into main. This PR applies final edits after reviewer feedback and prepares the prompt for production use.

Files
- prompts/master-cos.md — final mode descriptions, examples, quick usage notes
- PR_NOTES_v2.md — cleaned notes file and reviewer checklist

How to review / test
- Read prompts/master-cos.md and validate mode behavior and example commands
- Run quick manual test sessions with example commands and confirm assistant tone/outputs
- Confirm PR_NOTES_v2.md renders cleanly and contains the expected checklist

Merge checklist (run before merging)
- [ ] Resolve all reviewer comments and incorporate agreed edits into draft/cleaned-cos-prompt
- [ ] Run Markdown linter / spell-check (optional tool: markdownlint or Vale)
- [ ] Confirm PR_NOTES_v2.md has no BOM and renders cleanly
- [ ] Rebase branch onto latest main (or merge main into branch) and ensure no conflicts
  - git fetch origin
  - git checkout draft/cleaned-cos-prompt
  - git rebase origin/main
  - Resolve conflicts, git add, git rebase --continue
  - git push --force-with-lease origin draft/cleaned-cos-prompt
- [ ] Confirm CI (if any) passes after rebase
- [ ] Squash or tidy commits if you want a clean history (optional)
- [ ] Add reviewers and labels, set PR status to Ready for review (exit Draft)
- [ ] Merge using preferred strategy (squash merge recommended for doc/chore)

Post-merge tasks
- [ ] Confirm files appear correctly on main and in any generated docs/Pages
- [ ] If you maintain a changelog, add an entry noting the prompt scaffold and docs
- [ ] If applicable, tag a release or note the change in release notes

Suggested reviewers and labels
- Reviewers: (e.g., @your-collaborator-handle)
- Labels: documentation, chore, prompts, ready-for-review
