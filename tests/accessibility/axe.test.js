const fs = require('fs');
const { JSDOM } = require('jsdom');
const { axe, toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Accessibility checks', () => {
  test('index.htm has no basic axe violations', async () => {
    const html = fs.readFileSync('web-ui/index.htm', 'utf8');
    const dom = new JSDOM(html);
    const results = await axe(dom.window.document.body);
    expect(results).toHaveNoViolations();
  });
});
