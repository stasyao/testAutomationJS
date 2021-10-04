import { When, Then } from '@cucumber/cucumber';

import { apiVk } from '../../framework/API/apiVK.cjs';
import { credentials } from '../../environment/credentials.cjs';
import { 
    FileUtils,
    ImageUtils,
    StringUtils 
} from '../../framework/utils/bundler.cjs';
import { testEnvironment } from '../../environment/testEnvironment.cjs';
import { profilePage } from '../../pages/pages.cjs';

const vk = new apiVk();
const { userName } = credentials;
const { 
    pathToTestImage, pathToDownloadedImage, pathToDiffImage, 
    downloadedImageName 
} = testEnvironment;

When(
    /^Creates a random post$/,
    async function() {
        const message = StringUtils.generateRandomString();
        const response = await vk.createOrEditPost(message);
        this.post = profilePage.userWall.getPost(
            response.data_post_id
        );
        this.postId = response.post_id;
        expect(
            await this.post.getPostInfo()
        ).to.deep.equal(
            {author: userName, text: message},
            `The author and/or the text of the post on the wall 
            does not match the one sending via API`
        );
    }
)

When(
    /^Edits the created post and uploads an image$/,
    async function() {
        const message = StringUtils.generateRandomString();
        await browser.saveScreenshot(pathToTestImage);
        const { photoId, photoData }= await vk.uploadImage(pathToTestImage);
        this.photoId = photoId;
        await vk.createOrEditPost(message, photoData, true, this.postId);
        await this.post.postText.state().isTextChanged(message);
        expect(
            (await this.post.getPostInfo()).text
        ).to.be.equal(message, 'Edited text does not match');
        const zoomedPhoto = await this.post.clickOnAttachedImage(photoData);
        const imageSource = await zoomedPhoto.getSource();
        const pathToJpgImage = pathToDownloadedImage + downloadedImageName;
        await FileUtils.download(imageSource, pathToJpgImage);
        const pngImagePath = `${pathToDownloadedImage}${this.postId}_${ImageUtils.convertPathFromJpgToPng(downloadedImageName)}`;
        ImageUtils.convertJPGtoPNG(pathToJpgImage, pngImagePath);
        await FileUtils.waitForFileExists(pngImagePath);
        const imagesHasDifferences = await ImageUtils.comparePngImages(
            pngImagePath,     
            pathToTestImage,
            pathToDiffImage
        );
        expect (
            Boolean(imagesHasDifferences),
            'The image on the wall does not match the one sending via API'
            ).to.be.false;
        await zoomedPhoto.close();
    }
)

When(
    /^Adds a comment to the post$/,
    async function() {
        const message = StringUtils.generateRandomString();
        const commentId = await vk.createComment(message, this.postId);
        await this.post.showComments();
        expect(
            await (await this.post.getComment(commentId)).getCommentInfo()
        ).to.deep.equal(
            {author: userName, text: message},
            `The author and/or the text of the comment on the wall 
            does not match the one sending via API`
        );
    }
)

When(
    /^Likes the post$/,
    async function() {
        await this.post.likePost();
        expect(
            await vk.checkLike(this.postId, 'post'),
            'The post was not marked by this user'
        ).to.be.true;
    }
)

When(
    /^Deletes the created post$/,
    async function() {
        await vk.deletePost(this.postId);
        await vk.deleteImage(this.photoId);
    }
)

Then(
    /^The post is deleted$/,
    async function() {
        expect(
            await this.post.waitFormNoLongerDisplayed(),
            'The post was not deleted'
        ).to.be.true;
    }
)