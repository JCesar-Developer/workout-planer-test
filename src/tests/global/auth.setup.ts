import { LoginPage } from '@/pom/login/pages/login-page.pom';
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPom = new LoginPage(page);

  await loginPom.goto();
  await loginPom.fillUsername('julioasto.92@gmail.com');
  await loginPom.fillPassword('123456');
  await loginPom.clickOnLoginButton();

  // await page.waitForURL('http://localhost:4200/statistics');
  await expect(page.getByRole('heading', { name: 'John Doe' })).toBeVisible();
  await page.context().storageState({ path: authFile });
});