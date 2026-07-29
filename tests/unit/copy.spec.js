const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

describe('Copy behavior', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, '../../web-ui/index.htm'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;
    document = window.document;
    window.alert = jest.fn();
  });

  afterEach(() => {
    if(dom && dom.window && dom.window.close) dom.window.close();
  });

  test('uses navigator.clipboard when available and calls alert on success', async () => {
    const writeText = jest.fn().mockResolvedValue();
    window.navigator.clipboard = { writeText };

    // Activate a mode to set current
    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.querySelector('button.copy');
    copyBtn.click();

    // allow microtasks / promise resolution
    await Promise.resolve();
    await new Promise((r) => setTimeout(r, 0));

    expect(writeText).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Prompt copied to clipboard');
  });

  test('does not throw and does not alert when clipboard is unavailable', async () => {
    // Ensure clipboard missing
    delete window.navigator.clipboard;

    const deepBtn = document.querySelector('button.deep');
    deepBtn.click();

    const copyBtn = document.querySelector('button.copy');
    copyBtn.click();

    // allow any sync/async updates
    await new Promise((r) => setTimeout(r, 0));

    expect(window.alert).not.toHaveBeenCalled();
  });
});
