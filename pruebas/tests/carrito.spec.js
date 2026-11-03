// tests/carrito.spec.js
import { test, expect } from '../fixtures/carrito.js';
import { productos, cantidades, lineaUnica, lineasVarias } from '../data/carrito.js';

test.describe('HU-03 · Carrito', () => {
  test('CP-01 el carrito empieza vacío @acceptanceTest', async ({ paginaCarrito: carrito }) => {
    await expect(carrito.estado).toHaveText('vacío');
    await expect(carrito.subtotal).toHaveText('$0');
    await expect(carrito.productos).toHaveCount(0);
  });

  test('CP-02 al agregar un producto el estado pasa a "con productos" @acceptanceTest', async ({ paginaCarrito: carrito }) => {
    await carrito.agregarProducto(productos.espresso.nombre, cantidades.minima);

    await expect(carrito.estado).toHaveText('con productos');
    await expect(carrito.productos).toHaveCount(1);
  });

  test('CP-03 el subtotal de un producto es su precio por la cantidad', { tag: '@bug' }, async ({ paginaCarrito: carrito }) => {
    const { producto, cantidad } = lineaUnica;

    await carrito.agregarProducto(producto.nombre, cantidad);

    await expect(carrito.subtotal).toHaveText(`$${producto.precio * cantidad}`);
  });

  test('CP-04 el subtotal del carrito es la suma de los subtotales de sus productos', async ({ paginaCarrito: carrito }) => {
    const [primera, segunda] = lineasVarias;

    await carrito.agregarProducto(primera.producto.nombre, primera.cantidad);
    await expect(carrito.productos).toHaveCount(1);
    await carrito.agregarProducto(segunda.producto.nombre, segunda.cantidad);
    await expect(carrito.productos).toHaveCount(2);

    const subtotalEsperado =
      primera.producto.precio * primera.cantidad + segunda.producto.precio * segunda.cantidad;
    await expect(carrito.subtotal).toHaveText(`$${subtotalEsperado}`);
  });

  test('CP-05 acepta la cantidad mínima (1) @acceptanceTest', async ({ paginaCarrito: carrito }) => {
    await carrito.agregarProducto(productos.espresso.nombre, cantidades.minima);

    await expect(carrito.estado).toHaveText('con productos');
    await expect(carrito.subtotal).toHaveText(`$${productos.espresso.precio * cantidades.minima}`);
  });

  test('CP-06 acepta la cantidad máxima (10)', async ({ paginaCarrito: carrito }) => {
    await carrito.agregarProducto(productos.espresso.nombre, cantidades.maxima);

    await expect(carrito.estado).toHaveText('con productos');
    await expect(carrito.subtotal).toHaveText(`$${productos.espresso.precio * cantidades.maxima}`);
  });

  test('CP-07 rechaza una cantidad menor que 1 @acceptanceTest', async ({ paginaCarrito: carrito }) => {
    await carrito.agregarProducto(productos.espresso.nombre, cantidades.debajoDelMinimo);

    expect(await carrito.mensajeDeValidacionCantidad()).not.toBe('');
    await expect(carrito.estado).toHaveText('vacío');
    await expect(carrito.productos).toHaveCount(0);
  });

  test('CP-08 rechaza una cantidad mayor que 10 @acceptanceTest', async ({ paginaCarrito: carrito }) => {
    await carrito.agregarProducto(productos.espresso.nombre, cantidades.encimaDelMaximo);

    expect(await carrito.mensajeDeValidacionCantidad()).not.toBe('');
    await expect(carrito.estado).toHaveText('vacío');
    await expect(carrito.productos).toHaveCount(0);
  });
});
