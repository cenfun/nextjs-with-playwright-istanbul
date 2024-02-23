const nextConfig = {

    experimental: {
        // enable babel only for test https://nextjs.org/docs/messages/swc-disabled
        forceSwcTransforms: !process.env.INSTRUMENT_CODE
    },

    webpack: (config) => {
        return config;
    }
};

export default nextConfig;
