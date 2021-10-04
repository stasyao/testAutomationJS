import fs from 'fs';
import Jimp from 'jimp';
import pngjs from 'pngjs';
import pixelmatch from 'pixelmatch';

import logger from '../logger.cjs';


export class ImageUtils{

    static convertPathFromJpgToPng = jpgPath => jpgPath.replace('.jpg', '.png');

    static convertJPGtoPNG = (imgPath, pngPath) => {
        logger.info('Convert the image from JPG to PNG');
        Jimp.read(
            imgPath, 
            (err, img) => {
                if (err) throw err;
                img.write(pngPath);
            }
        );
        logger.info('The image was converted successfully');
    }

    static comparePngImages = async (
        pathToImg1, pathToImg2, pathToDiffImage
    ) => {
        logger.info(
            `Start comparing images: '${pathToImg1}' and ${pathToImg2}`
        );
        const PNG = pngjs.PNG;
        const img1 = PNG.sync.read(await fs.promises.readFile(pathToImg1));
        const img2 = PNG.sync.read(await fs.promises.readFile(pathToImg2));
        const {width, height} = img1;
        const diff = new PNG({width, height});
        const result = pixelmatch(
            img1.data, img2.data, diff.data, width, height, 
            {threshold: 0.5, includeAA: true}
        );
        logger.info(`The number of mismatched pixels - ${result}`)
        await fs.promises.writeFile(pathToDiffImage, PNG.sync.write(diff));
        return result;
    }
}
