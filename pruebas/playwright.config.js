// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Falla en CI si alguien dejó un test.only
  forbidOnly: !!process.env.CI,
  // Reporte HTML; se abre con: npm run reporte
  reporter: 'html',
  use: {
    // Los goto('/') son relativos a esta dirección
    baseURL: 'http://localhost:3000',
    // Guarda la traza de las pruebas que fallan, para revisarlas en el reporte
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  // Si la app ya responde en el 3000 (el pipeline la levanta antes), la reutiliza.
  // Si no está encendida (por ejemplo, en tu equipo), la enciende desde ../app.
  webServer: {
    command: 'npm start',
    cwd: '../app',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
