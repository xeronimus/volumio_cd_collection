/* global __APP_CONFIG__ */

/**
 * This encapsulates access to application configuration.
 * Instead of accessing __APP_CONFIG__ in various components/places, use this module instead.
 *
 * In a unit-test environment (our files are loaded and run via nodeJS) there is no __APP_CONFIG__ set.
 *
 * In webpack dev serve + production, __APP_CONFIG__ is set via webpack (see webpack.config.js)
 */
const appConfig = (typeof __APP_CONFIG__ !== 'undefined') ? __APP_CONFIG__ : {env: 'test'};
export default appConfig;
