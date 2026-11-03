// tests/login.spec.js
import { test, expect } from '../fixtures/login.js';

test('el usuario logueado ve el menú de la tienda @acceptanceTest', async ({ paginaLogueada: page }) => {
  await expect(page.getByRole('button', { name: 'Carrito', exact: true })).toBeVisible();
});
