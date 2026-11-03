// fixtures/login.js
import { test as base, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/PaginaLogin.js';
import { correosDePrueba, claveDePrueba } from '../data/usuarios.js';

export const test = base.extend({
  paginaLogueada: async ({ page }, use, testInfo) => {
    // Cada worker usa su propia cuenta para que los carritos no se mezclen al correr en paralelo.
    const correo = correosDePrueba[testInfo.parallelIndex % correosDePrueba.length];

    const login = new PaginaLogin(page);
    await login.ir();
    await login.iniciarSesion(correo, claveDePrueba);
    await expect(page.getByRole('button', { name: 'Carrito', exact: true })).toBeVisible();

    await use(page);
  },
});

export { expect };
