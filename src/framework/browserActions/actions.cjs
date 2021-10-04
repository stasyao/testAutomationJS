import logger from "../logger.cjs";


export default async function () {

    await browser.overwriteCommand(
        'url',
        async (origFunction, url) => {
            logger.info(`Go to the url - ${url}`);
            await origFunction(url);
        }
    );

    await browser.overwriteCommand(
        'saveScreenshot',
        async (origFunction, filepath) => {
            logger.info(`Take a screenshot and save it - ${filepath}`)
            await origFunction(filepath);
        }
    );
};
