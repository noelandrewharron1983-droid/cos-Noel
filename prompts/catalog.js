/* Canonical COS prompt catalog for UI + prompt docs */
(function initCatalog(root, factory) {
  const catalog = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = catalog;
  }
  root.COS_PROMPT_CATALOG = catalog;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildCatalog() {
  return {
    version: '1.0.0',
    projectScope: 'both',
    modes: {
      deep: {
        id: 'deep',
        label: 'Deep Work',
        defaultVariant: 'condensed',
        variantAliases: {
          quick: 'condensed'
        },
        variants: {
          condensed: {
            name: 'Deep Work — Condensed',
            text: 'Deep Work Mode — Condensed\nFocus me. Cut fluff. Guide me toward finishing one high-quality asset.'
          },
          full: {
            name: 'Deep Work — Full',
            text: 'Deep Work Mode — Full\nActivate Deep Work Mode.\nWorkflow:\n1. Define the asset\n2. Build the structure\n3. Draft\n4. Refine\n5. Polish\n6. Finalise\n7. Archive or deploy'
          }
        }
      },
      storm: {
        id: 'storm',
        label: 'Creative Storm',
        defaultVariant: 'condensed',
        variantAliases: {
          quick: 'condensed'
        },
        variants: {
          condensed: {
            name: 'Creative Storm — Condensed',
            text: 'Creative Storm Mode — Condensed\nGive me fast, bold ideas with no filtering.'
          },
          full: {
            name: 'Creative Storm — Full',
            text: 'Creative Storm Mode — Full\nActivate Creative Storm Mode.\nWorkflow:\n1. Set the theme\n2. Generate 10 fast ideas\n3. Expand 3\n4. Boldify 1\n5. Wild card\n6. Select\n7. Save for Deep Work'
          }
        }
      },
      reset: {
        id: 'reset',
        label: 'Reset',
        defaultVariant: 'condensed',
        variants: {
          quick: {
            name: 'Reset — Quick',
            text: 'Reset Mode — Quick\n1. Pause and breathe (3 slow breaths)\n2. Summarize what just happened in one line\n3. Choose one tiny next action and start now'
          },
          condensed: {
            name: 'Reset — Condensed',
            text: 'Reset Mode — Condensed\nSlow the pace. Help me breathe, reflect, and re-centre.'
          },
          full: {
            name: 'Reset — Full',
            text: 'Reset Mode — Full\nActivate Reset Mode.\nWorkflow:\n1. Pause\n2. Reflect\n3. Release\n4. Re-centre\n5. Return to Daily Mode'
          }
        }
      }
    },
    masterMapping: {
      condensed: 'Prefer short checklist/TL;DR style outputs.',
      full: 'Provide structured steps, optional examples, and templates.',
      quick: 'Provide short 1–3 line recovery/resume guidance.'
    }
  };
});
