/**
 * Please refer to the following files in the root directory:
 * 
 * README.md        For information about the package.
 * LICENSE          For license details, copyrights and restrictions.
 */
'use strict';

const { fsutils, GAError, syslog } = require('gajn-framework');
const path = require('path');
const fs = require('fs');

class StaticoNavigationError extends GAError {}
 
 /**
  * Navigation manager.
  */
 class Navigation
 { 
    config = null;

    /**
     * Constructor.
     * 
     * @param   {Config}    config      Global config object.
     * 
     * @return  {Navigation}
     */
    constructor(config)
    { 
        this.config = config;
        this.config.events.on('statico.abouttoparsetemplatefile', this.saveNavigation);
    }

    /**
     * Event trap.
     * 
     * @param   {object}    tplf    Template file.
     * 
     * @return
     */
    async saveNavigation(cfg, tplf)
    {
        this.config = cfg;

        syslog.debug(`Intercepted navigation event for: ${tplf.filePath}`, 'statico.navigation');
        if (!tplf || !tplf.data || !tplf.data.navigation) {
            syslog.debug(`Rejecting navigation event for: ${tplf.filePath} as no relevant data found.`, 'statico.navigation');
            return;
        }

        let cf = tplf.data.navigation;
        let menu;

        if (!cf.menu) {
            throw new StaticoNavigationError(`No navigation menu specified for: ${tplf.filePath}`);
        } else {
            menu = cf.menu;
            delete cf.menu;
        }

        if (!cf.title) {
            if (tplf.data.title) {
                cf.title = tplf.data.title;
            } else {
                cf.title = 'unnamed';
            }
        }
        if (!cf.link) {
            if (tplf.data.permalink) {
                cf.link = tplf.data.permalink;
            } else {
                throw new StaticoNavigationError(`No navigation link found for: ${tplf.filePath}`);
            }
        }

        if (!this.config.navigation) {
            this.config.navigation = {};
        }
        if (!this.config.navigation[menu]) {
            this.config.navigation[menu] = {};
        }

        if (this.config.navigation[menu][cf.title]) {
            syslog.debug(`A menu item with the title '${cf.title}' already exists. It will be overwritten.`, 'statico.navigation');
        }

        this.config.navigation[menu][cf.title] = cf;
        syslog.debug(`Pushing menu item ${cf.title} in menu ${menu} for: ${tplf.filePath}`, 'statico.navigation');

    }
 
 
  }
 
 module.exports = Navigation;
 