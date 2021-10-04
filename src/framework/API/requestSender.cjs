import requestModule from 'supertest';
import StatusCodes from 'http-status-codes';

import logger from "../logger.cjs";

export default class RequestSender {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.site = requestModule(this.baseUrl);
    }

    async get(
        endpoint, expectedStatusCode=StatusCodes.OK, query={}, auth=[]
    ) {
        logger.info(`Sending a GET request to '${this.baseUrl}${endpoint}'`)
        const response = await this.site
                                    .get(endpoint)
                                    .auth(...auth)
                                    .query(query)
                                    .expect(expectedStatusCode);
        return response;
    }

    async post(
        endpoint, data,
        expectedStatusCode=StatusCodes.CREATED,
        contentType='json', auth=[]
    ) {
        logger.info(`Sending a POST request to '${this.baseUrl}${endpoint}'`)
        const response = await this.site
                                .post(endpoint)
                                .type(contentType)
                                .auth(...auth)
                                .send(data)
                                .expect(expectedStatusCode);
        return response;
    }

    async postFile(endpoint, fileFieldName, path) {
        logger.info(`Sending a file by a POST request
                    to '${this.baseUrl}${endpoint}'`)
        const response = await this.site
                                .post(endpoint)
                                .attach(fileFieldName, path);
        return response;
    }
}
