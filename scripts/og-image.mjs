// Renders scripts/og-image.html to public/og-image.png (1200×630) with headless Chrome.
// Set CHROME_PATH if Chrome is not in the default macOS location.
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const source = pathToFileURL(fileURLToPath(new URL('./og-image.html', import.meta.url))).href;
const output = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1200,630',
  '--virtual-time-budget=3000',
  '--allow-file-access-from-files',
  `--screenshot=${output}`,
  source,
], { stdio: 'ignore' });

console.log(`Wrote ${output}`);
