// pages/PaginaCarrito.js
export class PaginaCarrito {
  constructor(page) {
    this.page = page;
    this.botonMenuCarrito = page.getByRole('button', { name: 'Carrito', exact: true });
    this.producto = page.getByLabel('Producto');
    this.cantidad = page.getByLabel('Cantidad');
    this.botonAgregar = page.getByRole('button', { name: 'Agregar al carrito' });
    this.botonVaciar = page.getByRole('button', { name: 'Vaciar carrito' });
    this.estado = page.getByTestId('estado-carrito');
    this.subtotal = page.getByTestId('subtotal');
    this.productos = page.getByRole('listitem');
    this.mensaje = page.getByRole('status');
  }

  async ir() {
    await this.botonMenuCarrito.click();
    // El resumen se pinta cuando llega el carrito del servidor.
    await this.estado.waitFor();
  }

  async agregarProducto(nombre, cantidad) {
    await this.producto.selectOption({ label: nombre });
    await this.cantidad.fill(String(cantidad));
    await this.botonAgregar.click();
  }

  async vaciar() {
    await this.botonVaciar.click();
  }

  // Mensaje que muestra el navegador cuando la cantidad no cumple min/max del campo.
  async mensajeDeValidacionCantidad() {
    return this.cantidad.evaluate((campo) => campo.validationMessage);
  }
}
