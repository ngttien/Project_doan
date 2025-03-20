const { override, useBabelRc } = require("customize-cra");
const path = require("path");

module.exports = override(
    useBabelRc(),
    (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "~": path.resolve(__dirname, "src"),
        };
        return config;
    }
);
