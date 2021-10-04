import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Element } from "../framework/element/element.cjs";


export class ZoomedPhoto extends BaseForm {
    constructor() {
        super(
            '//div[@id="pv_photo"]//child::img',
            'A zoomed photo attached to the post'
        )
    }

    get closeButton() {
        return new Element(
            '//div[@class="pv_close_btn"]',
            'The button to close zoomed photo'
        )
    }

    async getSource() {
        return this.form.getAttribute('src');
    }

    async close() {
        await this.closeButton.click();
        await this.waitFormNoLongerDisplayed();
    }

}