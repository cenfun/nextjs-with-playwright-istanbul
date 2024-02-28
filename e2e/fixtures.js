import { test as testBase, expect } from '@playwright/test';
import { addCoverageReport } from 'monocart-reporter';

// fixtures
// const test = testBase.extend({
//     autoTestFixture: [async ({ page }, use) => {

//         const isChromium = test.info().project.name === 'Desktop Chrome';

//         // console.log('autoTestFixture setup...', test.info().project.name);

//         await use('autoTestFixture');

//         // console.log('autoTestFixture teardown...');
//         if (isChromium) {
//             const coverageData = await page.evaluate(() => window.__coverage__);
//             // console.log(Object.keys(coverageData));
//             await addCoverageReport(coverageData, test.info());
//         }

//     }, {
//         scope: 'test',
//         auto: true
//     }]
// });

// see issue: https://github.com/cenfun/nextjs-with-playwright-istanbul/issues/2
const test = testBase.extend({
    context: async ({ context }, use) => {
        await context.addInitScript(() => window.addEventListener('beforeunload', () => window.collectIstanbulCoverage(window.__coverage__)));
        await context.exposeFunction('collectIstanbulCoverage', (coverage) => {
            if (coverage) {
                addCoverageReport(coverage, test.info());
            }
        });
        await use(context);
        // eslint-disable-next-line no-restricted-syntax
        for (const page of context.pages()) {
        // eslint-disable-next-line no-await-in-loop
            await page.evaluate(() => window.collectIstanbulCoverage(window.__coverage__));
        }
    }
});

export {
    test,
    expect
};
