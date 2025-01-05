import { defineConfig, PlaywrightTestConfig } from '@playwright/test';

export default defineConfig({
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        actionTimeout: 15000,
        navigationTimeout: 30000,
    },
    timeout: 60000,
    reporter: 'html',
    retries: 1,
});
