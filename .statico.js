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
const LayeredMenuSeqShortcode = require('./src/shortcodes/layeredmenuseqShortcode');
const debug = require('debug')('Statico:plugin:navigation'),
      debugf = require('debug')('Full.Statico:plugin:navigation');

module.exports = function(config, options = {}) {

    new Navigation(config);

    config.addNunjucksShortcode('menu', MenuShortcode);
    debug(`Added shortcode to Nunjucks: menu`);
    config.addNunjucksShortcode('layeredmenu', LayeredMenuShortcode);
    debug(`Added shortcode to Nunjucks: layeredmenu`);
    config.addNunjucksShortcode('layeredmenuseq', LayeredMenuSeqShortcode);
    debug(`Added shortcode to Nunjucks: layeredmenuseq`);

    syslog.notice(`Statico navigation plugin version ${pack.version} loaded.`);

}
