const fs = require('fs');
const { JSDOM } = require('jsdom');

describe('Copy behavior', () => {
  let dom;
  let window;
  let document;
  let originalExecCommand;

  beforeEach(() => {
    const html = fs.readFileSync('web-ui/index.htm', 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;
    document = window.document;

    // Preserve original execCommand
    originalExecCommand = document.execCommand;

    // Ensure execCommand exists (some JSDOM versions may not implement it)
    if (typeof document.execCommand !== 'function') {
      document.execCommand = () => false;
    }
  });

  afterEach(() => {
    if(dom && dom.window && dom.window.close) dom.window.close();
    document.execCommand = originalExecCommand;
  });

  test('uses navigator.clipboard when available and updates live region', async () => {
    const writeText = jest.fn().mockResolvedValue();
    window.navigator.clipboard = { writeText };

    // Activate a mode to set current
    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.getElementById('copyBtn');
    copyBtn.click();

    // allow microtasks / promise resolution
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));

    const status = document.getElementById('copyStatus');
    expect(writeText).toHaveBeenCalled();
    expect(status).not.toBeNull();
    expect(status.textContent).toMatch(/Prompt copied to clipboard/);
  });

  test('falls back to execCommand when clipboard unavailable and updates live region', async () => {
    // Ensure clipboard missing
    delete window.navigator.clipboard;

    // Spy on execCommand
    document.execCommand = jest.fn(() => true);

    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.getElementById('copyBtn');
    copyBtn.click();

    // allow any sync updates
    await new Promise((r) => setTimeout(r, 0));

    const status = document.getElementById('copyStatus');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
    expect(status).not.toBeNull();
    expect(status.textContent).toMatch(/Prompt copied to clipboard/);
  });
});
