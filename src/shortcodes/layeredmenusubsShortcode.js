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
 * Layered menu sebs shortcode class.
 */
class LayeredMenuSubsShortcode extends NunjucksShortcode
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
        let subsof = args[1] || null;

        syslog.warning(subsof);

        if (!this.config.navigation || !this.config.navigation[menu]) {
            throw new NunjucksShortcodeMenuError(`No (layered) navigation menu found for '${menu}'.`);
        }

        if (!this.config.layeredMenus || !this.config.layeredMenus[menu]) {
            throw new NunjucksShortcodeMenuError(`No (layered) navigation menu saved structure found for '${menu}'.`);
        }

        let flattened = this.config.layeredMenus[menu];

        let article = context.ctx;
        let articlenav = article.navigation || null;

        if (null === subsof) {
            subsof = articlenav.title;
        }

        let subs = [];

        for (let item of flattened) {
            if ('_main' === subsof && !item.parent) {
                subs.push(item);
            } else if (subsof === item.parent) {
                subs.push(item);
            }
        }

        let prev = null;

        let ret = `<ul class="nav-subs">`;
        for (let item of subs) {
            ret += `<li><a href="${item.link}">${item.title}</li>`;
        }
        ret += `</uk>`;

        return ret;

    }

 }

module.exports = LayeredMenuSubsShortcode;
 