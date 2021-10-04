import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Element } from "../framework/element/element.cjs";


export class Comment extends BaseForm {
    constructor(fullCommentId) {
        super(
            `//div[@id="post${fullCommentId}"]`,
            `The comment with id ${fullCommentId}`
        )
    }

    get commentText() {
        return new Element(
            `${this.locator}//child::div[contains(@class, "wall_reply_text")]`,
            'Comment\'s text' 
        )
    }

    get commentAuthor() {
        return new Element(
            `${this.locator}//child::a[@class="author"]`,
            'Comment\'s author' 
        )
    }

    async getCommentInfo() {
        return { 
            author: await this.commentAuthor.getElementText(),
            text: await this.commentText.getElementText()
        };
    }

}