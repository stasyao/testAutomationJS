import { BaseForm } from "../framework/baseForm/baseForm.cjs";
import { Post } from "./post.cjs";


export class UserWall extends BaseForm {
    constructor() {
        super(
            '//div[@id="profile_wall"]',
            'VK user wall'
        )
    }

    getPost(id) {
        return new Post(id);
    }

}