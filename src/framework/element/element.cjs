import { ElementStateProvider } from "./stateProvider.cjs";
import logger from "../logger.cjs";

const maskedValue = '********';

export class Element {

    constructor(locator, name) {
        this.locator = locator;
        this.name = name;
    }

    state = () => new ElementStateProvider(this.locator, this.name);

    async getElement() {
        await this.state().isExists();
        return $(this.locator);
    }

    async getAttribute(attr) {
        logger.info(`Getting the value of the attribute '${attr}' 
                    of the element '${this.name}'`);
        const value = await (await this.getElement()).getAttribute(attr);
        logger.info(`The value is ${value}`);
        return value;
    }

    async getElementText() {
        logger.info(`Getting text of the of the element '${this.name}'`);
        const text = await (await this.getElement()).getText();
        logger.info(`The text is '${text}'`);
        return text;
    }

    async click() {
        logger.info(`Click on the element '${this.name}',
                    current url '${await browser.getUrl()}'`)
        const el = await this.getElement();
        await this.state().isClickable();
        await el.click();
    }

    async type(value) {
        await this._setText(value, false);
    }

    async typeSecret(value) {
        await this._setText(value, true);
    }

    async _setText(value, maskValueInLog){
        logger.info(`Type text "${maskValueInLog ? maskedValue : value}" 
                    into element "${this.name}"`);
        await (await this.getElement()).setValue(value);
    }

}