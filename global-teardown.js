import { addCoverageReport } from 'monocart-reporter';
import { CDPClient } from 'monocart-coverage-reports';

const globalTeardown = async (config) => {
    console.log('globalTeardown ...');

    // [WebServer] the --inspect option was detected, the Next.js router server should be inspected at port 9230.
    const client = await CDPClient({
        port: 9230
    });

    const coverageData = await client.getIstanbulCoverage();
    await client.close();

    // console.log(Object.keys(coverageData));

    // there is no test info on teardown, just mock one with required config
    const mockTestInfo = {
        config
    };
    await addCoverageReport(coverageData, mockTestInfo);

};

export default globalTeardown;
