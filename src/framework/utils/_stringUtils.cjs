import { getRandomNumber } from "./_numberUtils.cjs";


import { ArrayUtils } from "./_arrayUtils.cjs";

export class StringUtils {

    static lowerLatinLettersCode = [97, 122];

    static generateRandomString = () => {
        return ArrayUtils.range(Math.ceil(Math.random() * 20)).map(
            _ => String.fromCharCode(
                getRandomNumber.apply(null, this.lowerLatinLettersCode)
            )
        ).join(''); 
    }

}