import { LoginPage } from '@/pom/login/pages/login-page.pom';
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPom = new LoginPage(page);

  await loginPom.goto();
  await loginPom.fillUsername('julioasto.92@gmail.com');
  await loginPom.fillPassword('123456');
  await loginPom.clickLoginButton();

  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL('localhost:4200/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});