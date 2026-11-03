// fixtures/carrito.js
import { test as base, expect } from './login.js';
import { PaginaCarrito } from '../pages/PaginaCarrito.js';

export const test = base.extend({
  paginaCarrito: async ({ paginaLogueada }, use) => {
    const carrito = new PaginaCarrito(paginaLogueada);
    await carrito.ir();
    await carrito.vaciar();
    await expect(carrito.estado).toHaveText('vacío');

    await use(carrito);
  },
});

export { expect };
