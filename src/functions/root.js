const {app} = require('@azure/functions');
// const {BlogInfo} = require('../models/BlogInfo');
const {Article} = require('../models/Article');

app.http('root', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const paths = ['title', 'abstract', 'tagId', 'publishDate', 'updateDate', 'author', 'visible'];

        // const blogInfo = await BlogInfo.find();
        const articleData = await Article.find().limit(10).sort({_id: -1}).populate(paths).exec();

        if (!articleData) {
            if (articleData.visible) {
                return {body: articleData};
            }
        }

        return {
            status: 404,
            body: '404 Not Found'
        };
    }
});
