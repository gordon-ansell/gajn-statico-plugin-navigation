/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { string, syslog, GAError } = require('gajn-framework');
const Navigation = require('./src/Navigation');
const MenuShortcode = require('./src/shortcodes/menuShortcode');
const debug = require('debug')('Statico:plugin:navigation'),
      debugf = require('debug')('FStatico:plugin:navigation');

module.exports = function(config, options = {}) {

    new Navigation(config);

    config.addNunjucksShortcode('menu', MenuShortcode);
    debug(`Added shortcode to Nunjucks: menu`);


    /*
    let scssCfg = {
        exts: ['scss'],
        engineOptions: {outputStyle: 'compressed'},
        userOptions: {
            noFrontMatter: true,
            output: '/assets/css',
            autoPrefix: true
        },
        postcss: {
            file: undefined
        }
    };

    config.assetHandlers.scss = scssCfg;
    config.assetHandlers.addHandler('scss', new ScssAssetsHandler(config), ['scss']);
    */


    /*
    try {
        config.addNunjucksShortcode('url', function (p) {
            return '<strong>' + p + '</strong>';
        });
    } catch (e) {
        throw new GAError("user.statico: Failed to load slugin shortcode for nunjucks.", null, e);
    }
    */
}
