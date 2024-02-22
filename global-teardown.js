import CDP from 'chrome-remote-interface';
import { addCoverageReport } from 'monocart-reporter';

const globalTeardown = async (config) => {
    console.log('globalTeardown ...');

    // [WebServer] the --inspect option was detected, the Next.js router server should be inspected at port 9230.
    const client = await CDP({
        port: 9230
    });

    // enable and start v8 coverage
    await client.Runtime.enable();

    // write the coverage started by NODE_V8_COVERAGE to disk on demand
    const data = await client.Runtime.evaluate({
        expression: 'new Promise(resolve=>{ resolve(global.__coverage__); })',
        includeCommandLineAPI: true,
        returnByValue: true,
        awaitPromise: true
    });

    await client.Runtime.disable();

    // close debugger
    await client.close();

    const coverageData = data.result.value;

    // there is no test info on teardown, just mock one with required config
    const mockTestInfo = {
        config
    };
    await addCoverageReport(coverageData, mockTestInfo);

};

export default globalTeardown;
