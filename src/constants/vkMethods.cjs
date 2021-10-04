export { endpoints };

const endpoints = {
    like: {
        check: 'likes.isLiked',
    },
    photo: {
        delete: 'photos.delete',
        getWallUploadServer: 'photos.getWallUploadServer',
        saveWallPhoto: 'photos.saveWallPhoto'
    },
    post: {
        createComment: 'wall.createComment',
        delete: 'wall.delete',
        edit: 'wall.edit',
        publish: 'wall.post',
    }
};
