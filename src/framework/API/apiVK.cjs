import { StatusCodes } from "http-status-codes";
import { credentials } from "../../environment/credentials.cjs";
import { endpoints } from "../../constants/vkMethods.cjs";
import logger from "../logger.cjs";
import RequestSender from "./requestSender.cjs";
import { testEnvironment } from "../../environment/testEnvironment.cjs";

const { userId, token } = credentials;
const { vkApiUrl, apiVersion } = testEnvironment;

export class apiVk {
    constructor(){
        this.userId = userId;
        this.apiVersion = { v: apiVersion };
        this.auth = [token, { type: 'bearer' }],
        this.requestSender = new RequestSender(vkApiUrl);
    }

    async _sendGetRequest(endpoint, query) {
        return this.requestSender.get(
            endpoint, StatusCodes.OK, query, this.auth
        )
    }

    async _sendPostRequest(endpoint, payload) {
        return this.requestSender.post(
            endpoint, payload, StatusCodes.OK, 'form', this.auth
        );
    }

    async checkLike(itemId, sort) {
        logger.info('--API CHECK LIKE--')
        const query = {
            ...this.apiVersion,
            item_id: itemId,
            user_id: this.userId,
            owner_id: this.userId,
            type: sort
        };
        logger.info(
            `Checking the user's like:
             who liked - ${query.user_id}
             who was liked - ${query.owner_id}
             what was liked - ${query.type}, id - ${query.item_id}`
        )
        const response = await this._sendGetRequest(
            endpoints.like.check, query
        );
        logger.info('-------------');
        return response.body.response.liked === 1;
    }

    async createOrEditPost(text, attachments='', edit=false, editedMsgId=null) {
        logger.info(`${edit ? '--API EDIT POST--' : '--API CREATE POST--'}`);
        const payload = {
            ...this.apiVersion,
            owner_id: this.userId,
            post_id: editedMsgId,
            message: text,
            attachments: attachments,
        };
        const endpoint = edit ? endpoints.post.edit : endpoints.post.publish;
        const response = await this._sendPostRequest(endpoint, payload);
        const post_id = response.body.response.post_id;
        logger.info(`Created or changed the user's ${payload.owner_id} 
                    post with id ${post_id}.
                    Post's text '${payload.message}'
                    -------------`);
        return { 
            response: response,
            post_id: post_id,
            data_post_id: `${this.userId}_${response.body.response.post_id}`
        };
    }

    async deletePost(postId) {
        logger.info('API DELETE POST');
        const query = {
            ...this.apiVersion,
            post_id: postId,
            owner_id: this.userId
        };
        logger.info(`Deleting the post with id ${query.post_id}
                    of the user ${query.owner_id}`)
        await this._sendGetRequest(endpoints.post.delete, query);
        logger.info('-------------');
    }

    async createComment(text, postId) {
        logger.info('--API CREATE COMMENT--');
        const payload = {
            ...this.apiVersion,
            owner_id: this.userId,
            post_id: postId,
            message: text
        };
        logger.info(`Create a comment '${payload.message}' to the post
                    ${payload.post_id} of the user ${payload.owner_id}`)
        const response = await this._sendPostRequest(
            endpoints.post.createComment, payload
        );
        logger.info('-------------');
        return `${this.userId}_${response.body.response.comment_id}`;
    }

    async uploadImage(path) {
        logger.info('--API UPLOAD AN IMAGE--');
        let query = this.apiVersion;
        // step1 - get upload server url
        let response = await this.requestSender.get(
            endpoints.photo.getWallUploadServer, StatusCodes.OK, query,
            this.auth
        );
        const uploadUrl = response.body.response.upload_url;
        // step 2 - pass image to the upload server 
        const imageSender = new RequestSender(uploadUrl);
        response = await imageSender.postFile(
            '/', 'file1', path
        );
        const { server, photo, hash } = JSON.parse(response.text);
        query = {
            ...this.apiVersion,
            photo: photo,
            server: server,
            hash: hash,
            user_id: this.userId
        };
        // step 3 - save image and get its id
        response = await this.requestSender.get(
            endpoints.photo.saveWallPhoto, StatusCodes.OK, query, this.auth
        );
        const { id } = response.body.response[0];
        logger.info(`photo_id - ${id}
                    ----------------`)
        return {
            photoId: id,
            photoData: `photo${this.userId}_${id}`,
        }
    }

    async deleteImage(imageId) {
        logger.info('--API DELETE IMAGE--');
        const query = {
            ...this.apiVersion,
            photo_id: imageId,
            owner_id: this.userId
        };
        logger.info(`Deleting the photo with id ${query.photo_id}
                    of the user ${query.owner_id}`)
        await this._sendGetRequest(endpoints.photo.delete, query);
        logger.info('-------------');
    }

}
