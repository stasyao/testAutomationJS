import fetch from 'node-fetch';
import fs from 'fs';
import logger from '../logger.cjs';



export class FileUtils {

    static download = async (url, path) => {
        const response = await fetch(url);
        const buffer = await response.buffer();
        logger.info('Start to write fetched binary data');
        await fs.promises.writeFile(path, buffer);
        logger.info('Downloading was finished');
    }

    static waitForFileExists = async (
        filePath,
        currentTime = 0,
        polling = 200,
        timeout = 5000) => {
            if (fs.existsSync(filePath)) {
                logger.info(`The file '${filePath}' has appeared`);
                return true;
            }
            if (currentTime >= timeout) return false;
            await new Promise(resolve => setTimeout(resolve, polling));
            return this.waitForFileExists(filePath, currentTime + polling);
        }
}
