/**
 * @jest-environment jsdom
 */
const path = require('path');
const fs = require('fs');
const axeCore = require('axe-core');
const { toHaveNoViolations } = require('jest-axe');

expect.extend(toHaveNoViolations);

describe('Accessibility checks', () => {
  test('index.htm has no basic axe violations', async () => {
    const html = fs.readFileSync(path.join(__dirname, '../../web-ui/index.htm'), 'utf8');
    document.open();
    document.write(html);
    document.close();
    const results = await axeCore.run(document);
    expect(results).toHaveNoViolations();
  });
});
