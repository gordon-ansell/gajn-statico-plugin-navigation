/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { string, syslog, GAError } = require('js-framework');
const Navigation = require('./src/Navigation');
const pack = require('./package.json');
const MenuShortcode = require('./src/shortcodes/menuShortcode');
const LayeredMenuShortcode = require('./src/shortcodes/layeredmenuShortcode');
const debug = require('debug')('Statico:plugin:navigation'),
      debugf = require('debug')('Full.Statico:plugin:navigation');

module.exports = function(config, options = {}) {

    new Navigation(config);

    config.addNunjucksShortcode('menu', MenuShortcode);
    debug(`Added shortcode to Nunjucks: menu`);
    config.addNunjucksShortcode('layeredmenu', LayeredMenuShortcode);
    debug(`Added shortcode to Nunjucks: layeredmenu`);

    syslog.notice(`Statico navigation plugin version ${pack.version} loaded.`);

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
