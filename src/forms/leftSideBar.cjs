import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Element } from "../framework/element/element.cjs";


export class LeftSideBar extends BaseForm {
    constructor() {
        super(
            '//div[@id="side_bar_inner"]',
            'VK user menu'
        )
    }

    get linkToUserPage() {
        return new Element(
            '//li[@id="l_pr"]//a',
            'The link to the user page ("the wall")'
        )
    }

    async goToTheWall() {
        await this.linkToUserPage.click();
    }

}