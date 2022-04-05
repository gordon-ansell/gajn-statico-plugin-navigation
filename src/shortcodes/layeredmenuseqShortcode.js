/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { NunjucksShortcode, GAError } = require('js-framework');
const syslog = require('js-framework/src/logger/syslog');
const path = require('path');

class NunjucksShortcodeMenuError extends GAError {}


/**
 * Layered menu seq shortcode class.
 */
class LayeredMenuSeqShortcode extends NunjucksShortcode
{
    /**
     * Render.
     * 
     * @param   {object}    context     URL.
     * @param   {Array}     args        Other arguments.
     * 
     * @return  {string}
     */
    render(context, args)
    {
        let menu = args[0];
        let dir = args[1];

        if (!this.config.navigation || !this.config.navigation[menu]) {
            throw new NunjucksShortcodeMenuError(`No (layered) navigation menu found for '${menu}'.`);
        }

        if (!this.config.layeredMenus || !this.config.layeredMenus[menu]) {
            throw new NunjucksShortcodeMenuError(`No (layered) navigation menu saved structure found for '${menu}'.`);
        }

        let flattened = this.config.layeredMenus[menu];

        syslog.inspect(flattened, "error", "flattened")

        let article = context.ctx;

        syslog.inspect(article.navigation, "error", "article");

        let prev = null;

        let count = 0;
        for (let item of flattened) {
            let curr = null;
            if (article.navigation && article.navigation.menu && article.navigation.menu === menu) {
                curr = article.navigation;
                if (item.title === curr.title && item.link === curr.link) {
                    if ('prev' === dir) {
                        if (prev) {
                            return `<a href="${prev.link}">${prev.title}</a>`;
                        }
                    } else if ('next' === dir) {
                        if (flattened[count + 1]) {
                            return `<a href="${flattened[count + 1].link}">${flattened[count + 1].title}</a>`;
                        }
                    } 
                } else {
                    prev = curr;
                }
            } else {
                syslog.warning(`No menu match.`);
                //syslog.inspect(article.navigation, "error");
            }
            count++;
        }

        return null;

    }

 }

module.exports = LayeredMenuSeqShortcode;
 