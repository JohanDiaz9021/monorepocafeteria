// data/carrito.js
export const productos = {
  espresso: { nombre: 'Espresso', precio: 8000 },
  latte: { nombre: 'Latte', precio: 12000 },
  croissant: { nombre: 'Croissant', precio: 9000 },
};

export const cantidades = {
  minima: 1,
  maxima: 10,
  debajoDelMinimo: 0,
  encimaDelMaximo: 11,
};

export const lineaUnica = { producto: productos.latte, cantidad: 3 };

export const lineasVarias = [
  { producto: productos.latte, cantidad: 2 },
  { producto: productos.croissant, cantidad: 3 },
];
