import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Comment } from "./comment.cjs";
import { Element } from "../framework/element/element.cjs";
import { ZoomedPhoto } from "./zoomedPhoto.cjs";

export class Post extends BaseForm {
    constructor(id) {
        super(
            `//div[@data-post-id='${id}']`,
            `The post with id ${id}`
        )
    }

    get postAuthor() {
        return new Element(
            `${this.locator}//child::a[@class="author"]`,
            'Post author'
        )
    }

    get postText() {
        return new Element(
            `${this.locator}//child::div[contains(@class, "wall_post_text")]`,
            'Post text' 
        )
    }

    get likeButton() {
        return new Element(
            `${this.locator}//child::div[@class="like_button_icon"]`,
            'Like button' 
        )
    }

    get showCommentsLink() {
        return new Element(
            `${this.locator}//child::a[contains(@class, "replies_next")]`,
            'Show the next reply link' 
        )
    }

    getComment(fullCommentId) {
        return new Comment(fullCommentId);
    }

    attachedImage(imageId) {
        return new Element(
            `${this.locator}//child::a[@href="/${imageId}"]`,
            `Attached image`
        )
    }

    async likePost() {
        await this.likeButton.click();
    }

    async showComments() {
        await this.showCommentsLink.click();
    }

    async getPostInfo() {
        return { 
            author: await this.postAuthor.getElementText(),
            text: await this.postText.getElementText()
        };
    }

    async getAttachedImageHref(imageId) {
        return this.attachedImage(imageId).getAttribute('href');
    }

    async clickOnAttachedImage(imageId) {
        await this.attachedImage(imageId).click();
        return new ZoomedPhoto();
    }

}