# Casos de prueba · HU-03 Carrito

**Historia:** Como cliente, quiero agregar productos con su cantidad para ver cuánto suman.

**Precondición común:** el cliente inició sesión, está en la pantalla **Carrito** y el carrito está vacío.

**Datos:** Espresso $8000 · Latte $12000 · Croissant $9000 (archivo `data/carrito.js`).

| ID | Criterio | Pasos | Resultado esperado |
|---|---|---|---|
| CP-01 | Estado "vacío" | Abrir el carrito sin agregar nada | Estado "vacío", subtotal $0, ningún producto en la lista |
| CP-02 | Estado pasa a "con productos" | Agregar 1 Espresso | Estado "con productos", 1 producto en la lista |
| CP-03 | Subtotal de un producto = precio × cantidad | Agregar 3 Latte | Subtotal $36000 (12000 × 3) |
| CP-04 | Subtotal del carrito = suma de subtotales | Agregar 2 Latte y 3 Croissant | 2 productos en la lista, subtotal $51000 (24000 + 27000) |
| CP-05 | Límite inferior válido | Agregar 1 Espresso | Se agrega; subtotal $8000 |
| CP-06 | Límite superior válido | Agregar 10 Espresso | Se agrega; subtotal $80000 |
| CP-07 | Cantidad fuera de rango (debajo) | Intentar agregar 0 Espresso | Se muestra un error de validación; el carrito sigue "vacío" |
| CP-08 | Cantidad fuera de rango (encima) | Intentar agregar 11 Espresso | Se muestra un error de validación; el carrito sigue "vacío" |

## Caso de prueba que detecta el bug

| Campo | Detalle |
|---|---|
| **ID** | CP-03 (etiqueta `@bug` en `tests/carrito.spec.js`) |
| **Título** | El subtotal de un producto es su precio por la cantidad |
| **Criterio de aceptación** | El subtotal de cada producto es su precio multiplicado por la cantidad |
| **Precondición** | El cliente inició sesión, está en la pantalla Carrito y el carrito está vacío |
| **Datos** | Producto: Latte ($12000) · Cantidad: 3 |
| **Pasos** | 1. Seleccionar el producto "Latte". 2. Escribir 3 en Cantidad. 3. Pulsar "Agregar al carrito". |
| **Resultado esperado** | Subtotal: **$36000** (12000 × 3) |
| **Resultado obtenido** | Subtotal: **$12000** |
| **Estado** | ❌ Falla: bug detectado |
| **Bug** | El subtotal ignora la cantidad: suma el precio de cada producto una sola vez, como si siempre fuera 1 unidad |

**Por qué este caso detecta el bug:** usa una cantidad mayor que 1. Con cantidad 1, el precio y el subtotal coinciden aunque la app no multiplique, por eso CP-02 y CP-05 pasan y no lo revelan.

**Otros casos que también fallan por el mismo bug:**
- CP-04: 2 Latte + 3 Croissant. Esperado $51000, obtenido $21000.
- CP-06: 10 Espresso. Esperado $80000, obtenido $8000.

## Casos que ejecuta el pipeline

Solo los casos con `@acceptanceTest` en el título deciden si el pipeline queda en verde:

| Con `@acceptanceTest` | Sin la etiqueta |
|---|---|
| Login, CP-01, CP-02, CP-05, CP-07, CP-08 | CP-03, CP-04, CP-06 |

CP-03, CP-04 y CP-06 no la llevan porque detectan el bug: harían fallar el pipeline mientras el bug exista. Siguen en el proyecto y se ejecutan con `npm test`.

**Notas:**
- La pantalla no muestra el subtotal de cada producto por separado, solo el del carrito. Por eso CP-03 lo verifica con un único producto en el carrito.
- En CP-07 y CP-08, el campo Cantidad tiene `min="1"` y `max="10"`. El navegador bloquea el envío y muestra su propio mensaje de validación, que cambia según el navegador y el idioma. La prueba verifica que ese mensaje exista, no su texto.
