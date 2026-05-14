import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { envBoolean, envInteger, humanDelay } from './utils.js';

const storageState = process.env.IG_STORAGE_STATE || 'playwright/.auth/instagram.json';
const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;

if (!username || !password) {
  console.error('Defina IG_USERNAME e IG_PASSWORD no .env antes de fazer login.');
  process.exit(1);
}

const browser = await chromium.launch({
  headless: envBoolean('IG_HEADLESS', false),
  slowMo: envInteger('IG_SLOW_MO_MS', 80)
});

const context = await browser.newContext({
  viewport: { width: 1366, height: 900 },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome Safari'
});
const page = await context.newPage();

console.log('[login] abrindo Instagram');
await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await humanDelay('antes de preencher login');

await page.locator('input[name="username"]').fill(username, { timeout: 30000 });
await humanDelay('entre usuário e senha');
await page.locator('input[name="password"]').fill(password, { timeout: 30000 });
await humanDelay('antes de enviar login');
await page.locator('button[type="submit"]').click();

console.log('[login] aguarde 2FA/captcha manual se aparecer. O script salva a sessão após detectar navegação autenticada.');
await page.waitForURL((url) => !url.pathname.includes('/accounts/login'), { timeout: 180000 });
await humanDelay('após login');

await mkdir(dirname(storageState), { recursive: true });
await context.storageState({ path: storageState });
console.log(`[login] sessão salva em ${storageState}`);
await browser.close();
