const path = require('path');
const { JSDOM } = require('jsdom');

describe('Copy behavior', () => {
  let dom;
  let window;
  let document;

  async function loadDom() {
    dom = await JSDOM.fromFile(path.join(__dirname, '../../web-ui/index.htm'), {
      runScripts: 'dangerously',
      resources: 'usable'
    });
    await new Promise((resolve) => {
      dom.window.addEventListener('load', () => resolve(), { once: true });
    });
    window = dom.window;
    document = window.document;
  }

  beforeEach(async () => {
    await loadDom();
  });

  afterEach(() => {
    if(dom && dom.window && dom.window.close) dom.window.close();
  });

  test('uses navigator.clipboard when available and announces success', async () => {
    const writeText = jest.fn().mockResolvedValue();
    window.navigator.clipboard = { writeText };

    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.querySelector('button.copy');
    copyBtn.click();

    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));

    expect(writeText).toHaveBeenCalled();
    expect(document.querySelector('#copyStatus').textContent).toContain('Prompt copied to clipboard');
  });

  test('falls back to execCommand when clipboard is unavailable', async () => {
    document.execCommand = jest.fn().mockReturnValue(true);
    delete window.navigator.clipboard;

    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.querySelector('button.copy');
    copyBtn.click();

    await new Promise((r) => setTimeout(r, 0));

    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(document.querySelector('#copyStatus').textContent).toContain('fallback copy');
  });

  test('variant changes re-render currently active mode prompt', () => {
    const deepBtn = document.querySelector('button.deep');
    const variant = document.querySelector('#variant');

    deepBtn.click();
    expect(document.querySelector('#promptArea').textContent).toContain('Deep Work Mode — Condensed');

    variant.value = 'full';
    variant.dispatchEvent(new window.Event('change'));

    expect(document.querySelector('#promptArea').textContent).toContain('Deep Work Mode — Full');
  });

  test('quick variant resolves via alias for deep mode', () => {
    const deepBtn = document.querySelector('button.deep');
    const variant = document.querySelector('#variant');

    variant.value = 'quick';
    variant.dispatchEvent(new window.Event('change'));
    deepBtn.click();

    expect(document.querySelector('#promptArea').textContent).toContain('Deep Work Mode — Condensed');
  });

  test('copy before activation announces no content', async () => {
    const writeText = jest.fn().mockResolvedValue();
    window.navigator.clipboard = { writeText };

    document.querySelector('button.copy').click();
    await new Promise((r) => setTimeout(r, 0));

    expect(writeText).not.toHaveBeenCalled();
    expect(document.querySelector('#copyStatus').textContent).toContain('Nothing to copy yet');
  });
});
