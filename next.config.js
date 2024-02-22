import fs from 'fs';

const nextConfig = {
    webpack: (config, { defaultLoaders }) => {

        const babelConfigFile = defaultLoaders.babel.options.configFile;
        // update babel.config.json for test
        const json = JSON.parse(fs.readFileSync(babelConfigFile).toString('utf-8'));
        json.plugins = json.plugins.filter((it) => {
            if (typeof it === 'string' && it.includes('istanbul')) {
                return false;
            }
            return true;
        });
        if (process.env.INSTRUMENT_CODE) {
            json.plugins.push('istanbul');
        }
        fs.writeFileSync(babelConfigFile, JSON.stringify(json, null, 4));

        return config;
    }
};


export default nextConfig;
