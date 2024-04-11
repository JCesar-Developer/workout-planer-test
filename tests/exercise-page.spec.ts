import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Exercise Page component', () => {

	const rootUrl = 'http://localhost:4200/exercises';

	test.describe.configure({ mode: 'parallel' });

	test.beforeEach(async ({ page }) => {
		await page.goto(rootUrl);
	});

	test('Page exists', async ({ page }) => {
		await expect(page).toHaveTitle('WorkoutPlanner');
	});

	//Read
	test('Page should has "Lista de Ejercicios" title', async ({ page }) => {
		await expect(page.getByRole('heading', { name: 'LISTA DE EJERCICIOS' })).toHaveText('LISTA DE EJERCICIOS');
	});

	test('Page should has a list of exercises', async ({ page }) => {
		await expect(page.locator('ul[data-testid="card-list"]')).toBeVisible();
	});

	test('Page should has a list of exercises with at least one exercise', async ({ page }) => {
		const cardItems = await page.locator('li[data-testid="card-item"]').count();
		expect(cardItems).toBeGreaterThan(0);
	});

	//Search
	test('Should find 0 cards after put an invalid text in the search input', async ({ page }) => {
		await page.getByRole('link', { name: 'Ejercicios' }).click();
		await page.getByRole('searchbox').click();
		await page.getByRole('searchbox').fill('cualquier cosa');
		await page.getByRole('searchbox').press('Escape');
		await new Promise(resolve => setTimeout(resolve, 500));
		expect( await page.locator('li[data-testid="card-item"]').count() ).toBe(0);
	});

	test('Should find more than 0 cards after select an option in the search input', async ({ page }) => {
		await page.getByRole('searchbox').click();
		await page.getByRole('searchbox').fill('Lun');
		await page.getByRole('option', { name: 'Lunge con Mancuernas' }).click();
		expect( await page.locator('li[data-testid="card-item"]').count() ).toBe(1);
	});

	test('Should find more than 0 cards after put a valid text in the search input', async ({ page }) => {
		await page.getByRole('searchbox').click();
		await page.getByRole('searchbox').fill('Exerc');
		await page.getByRole('searchbox').press('Escape');
		expect( await page.locator('li[data-testid="card-item"]').count() ).toBeGreaterThan(0);
	});

	test('Page should find more than 0 cards after use a chip filter', async ({ page }) => {
		await page.locator('[data-testid="filter-tab"]').locator('text="Core"').click();
		const coreCards = await page.locator('article').filter({ hasText: 'Core' }).getByTestId('exercise-category').count();
		expect(coreCards).toBeGreaterThan(0);
	});
});