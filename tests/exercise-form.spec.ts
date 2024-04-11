import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('Exercise Form component', () => {

	const rootUrl = 'http://localhost:4200/exercises';

	test.describe.configure({ mode: 'serial' });
	
	test.beforeEach(async ({ page }) => {
		await page.goto(rootUrl);
	});

	test('Page exists', async ({ page }) => {
		await expect(page).toHaveTitle('WorkoutPlanner');
	});

	//Save
	test('Form should throw an error if the exercise name is empty', async ({ page }) => {
		await page.getByRole('link', { name: 'Ejercicios' }).click();
		await page.getByRole('button', { name: 'Nuevo Ejercicio' }).click();
		await page.getByRole('button', { name: 'Crear Ejercicio' }).click();
		await expect(page.locator('span[data-testid="error-message"]')).toHaveText('Este campo es requerido');
	});

	test('Form should create a new exercise', async ({ page }) => {
		await page.getByRole('link', { name: 'Ejercicios' }).click();
		await page.getByRole('button', { name: 'Nuevo Ejercicio' }).click();
		await page.getByPlaceholder('Nombre del ejercicio').click();
		await page.getByPlaceholder('Nombre del ejercicio').fill('Test exercise');
		await page.getByRole('button', { name: 'Crear Ejercicio' }).click();
		await page.getByRole('heading', { name: 'Test exercise' }).click();
	});

	//Update
	test('Form should update an exercise', async ({ page }) => {
		await page.getByRole('link', { name: 'Ejercicios' }).click();
		await page.locator('article').filter({ hasText: 'CoreTest exercise' }).getByRole('button').click();
		await page.getByPlaceholder('Nombre del ejercicio').click();
		await page.getByPlaceholder('Nombre del ejercicio').fill('Test exercise updated');
		await page.getByRole('button', { name: 'Actualizar' }).click();
		await page.getByRole('heading', { name: 'Test exercise updated' }).click();
	});

	//Delete
	test('Form should delete an exercise', async ({ page }) => {
		await page.goto('http://localhost:4200/');
		await page.goto('http://localhost:4200/statistics');
		await page.getByRole('link', { name: 'Ejercicios' }).click();
		await page.locator('article').filter({ hasText: 'CoreTest exercise updated' }).getByRole('button').click();
		await page.getByRole('button', { name: 'Eliminar' }).click();
		await expect(page.locator('article').filter({ hasText: 'CoreTest exercise updated' })).not.toBeAttached();
	});
});