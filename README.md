# monorepocafeteria

Monorepo del taller de Playwright: la aplicación El Rincón del Café y sus pruebas de aceptación.

| Carpeta | Contenido |
|---|---|
| `app/` | La aplicación (Node + Express) |
| `pruebas/` | Pruebas de Playwright en JavaScript (HU-03 · Carrito) |
| `.github/workflows/pipeline.yml` | Pipeline de GitHub Actions |

## Ejecutar en local

```bash
cd app && npm ci
cd ../pruebas && npm ci && npx playwright install chromium
npm run test:aceptacion   # solo @acceptanceTest (lo mismo que el pipeline)
npm test                  # todos los casos, incluidos los que detectan el bug
```

No hace falta encender la app: `webServer` la enciende y la apaga.

## Pipeline

Con cada push o pull request a `main` (o a mano desde Actions), el pipeline instala la app y las pruebas, enciende la app y ejecuta solo los casos `@acceptanceTest`. Si alguno falla, la ejecución queda en rojo. Los casos que detectan el bug de la HU-03 no llevan esa etiqueta.
