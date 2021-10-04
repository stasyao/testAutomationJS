import fs from 'fs';

import browserActions from "../src/framework/browserActions/actions.cjs";
import { testEnvironment } from '../src/environment/testEnvironment.cjs';
import { timeouts } from '../src/environment/timeouts.cjs';

export const config = {

    specs: [ './src/test/features/**/*.feature' ],
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: [
                    '--incognito', '--no-sandbox', 
                    '--disable-dev-shm-usage', '--log-level=3'
                ],
                prefs: {
                    'intl.accept_languages': testEnvironment.pageLang.russian
                }
              }
        }
    ],
    logLevel: 'silent',
    bail: 0,
    waitforTimeout: timeouts.explicit,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: ['./src/test/step-definitions/*.cjs'],
        format: ['pretty'],
        snippets: true,
        source: true,
        tagExpression: '@automated',
        timeout: timeouts.cucumberStep
    },
    beforeFeature: async (uri, feature) => {
        const { expect }  = await import("chai");
        global.expect = expect;
        await browserActions();
        await browser.maximizeWindow();
    },
    afterFeature: async (uri, feature) => {
        await browser.deleteSession();
        await fs.promises.unlink(testEnvironment.pathToDownloadedImage + testEnvironment.downloadedImageName);
    }
}
