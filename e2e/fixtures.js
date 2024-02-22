import { test as testBase, expect } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

// fixtures
const test = testBase.extend({
    autoTestFixture: [async ({ page }, use) => {

        const isChromium = test.info().project.name === 'Desktop Chrome';

        // console.log('autoTestFixture setup...', test.info().project.name);

        await use('autoTestFixture');

        // console.log('autoTestFixture teardown...');
        if (isChromium) {
            const coverageData = await page.evaluate(() => window.__coverage__);
           // console.log(Object.keys(coverageData));
            await addCoverageReport(coverageData, test.info());
        }

    }, {
        scope: 'test',
        auto: true
    }]
});

export {
    test,
    expect
};
