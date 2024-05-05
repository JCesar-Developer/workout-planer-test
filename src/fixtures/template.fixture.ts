import { test as base } from '@playwright/test';
import { PageTemplate } from '../pom/shared/pages/template-page';

export const test = base.extend<{ pageTemplate: PageTemplate }>({
  pageTemplate: async ({ page }, use) => {
    const pageTemplate = new PageTemplate(page);
    await use(pageTemplate);
  }
});

export { expect } from '@playwright/test';