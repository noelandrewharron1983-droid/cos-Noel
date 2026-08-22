(function initNoelApp() {
  const catalog = globalThis.COS_PROMPT_CATALOG;
  const promptArea = document.getElementById('promptArea');
  const statusEl = document.getElementById('copyStatus');
  const variantSelect = document.getElementById('variant');
  const modeButtons = document.querySelectorAll('[data-mode]');
  const copyButton = document.getElementById('copyBtn');

  const state = {
    mode: null,
    variant: variantSelect.value || 'condensed',
    currentText: promptArea.textContent || ''
  };

  let statusClearTimer = null;

  function clearStatus() {
    statusEl.textContent = '';
    statusEl.dataset.status = 'idle';
  }

  function announceStatus(message, type) {
    if (statusClearTimer) {
      clearTimeout(statusClearTimer);
      statusClearTimer = null;
    }

    statusEl.textContent = message;
    statusEl.dataset.status = type;
    statusClearTimer = setTimeout(clearStatus, 5000);
  }

  function getMode(modeId) {
    return catalog && catalog.modes ? catalog.modes[modeId] : null;
  }

  function resolveVariant(mode, variant) {
    if (!mode) return null;

    if (mode.variants[variant]) return variant;

    if (mode.variantAliases && mode.variantAliases[variant] && mode.variants[mode.variantAliases[variant]]) {
      return mode.variantAliases[variant];
    }

    if (mode.variants[mode.defaultVariant]) return mode.defaultVariant;

    const available = Object.keys(mode.variants);
    return available.length ? available[0] : null;
  }

  function renderPrompt() {
    const mode = getMode(state.mode);

    if (!mode) {
      state.currentText = '';
      promptArea.textContent = 'Activate a mode to load its condensed prompt.';
      return;
    }

    const resolvedVariant = resolveVariant(mode, state.variant);
    const variantData = resolvedVariant ? mode.variants[resolvedVariant] : null;
    state.currentText = variantData ? variantData.text : '';
    promptArea.textContent = state.currentText || 'No prompt content available for this selection.';
  }

  function silentlyTryClipboardWrite(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  }

  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      return document.execCommand('copy');
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }

  function copyCurrent() {
    if (!state.mode) {
      announceStatus('Nothing to copy yet. Activate a mode first.', 'error');
      return;
    }

    if (!state.currentText) {
      state.currentText = promptArea.textContent || '';
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(state.currentText)
        .then(() => announceStatus('Prompt copied to clipboard.', 'success'))
        .catch(() => {
          const copied = fallbackCopyTextToClipboard(state.currentText);
          announceStatus(
            copied
              ? 'Prompt copied to clipboard using fallback copy.'
              : 'Copy failed. Select the text and copy manually.',
            copied ? 'success' : 'error'
          );
        });
      return;
    }

    const copied = fallbackCopyTextToClipboard(state.currentText);
    announceStatus(
      copied
        ? 'Prompt copied to clipboard using fallback copy.'
        : 'Copy failed. Select the text and copy manually.',
      copied ? 'success' : 'error'
    );
  }

  function activate(modeId) {
    state.mode = modeId;
    state.variant = variantSelect.value || 'condensed';
    renderPrompt();

    if (state.currentText) {
      silentlyTryClipboardWrite(state.currentText);
    }
  }

  variantSelect.addEventListener('change', () => {
    state.variant = variantSelect.value || 'condensed';
    renderPrompt();
  });

  modeButtons.forEach((button) => {
    button.addEventListener('click', () => activate(button.dataset.mode));
  });

  copyButton.addEventListener('click', copyCurrent);

})();
