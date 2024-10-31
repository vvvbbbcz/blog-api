const {app} = require('@azure/functions');
const {Article} = require('../../models/Article');
const markdown = require('markdown-it')();


async function createArticle(requestBody) {
    const model = new Article(requestBody);
    model._id = 0; // TODO
    model.abstract = model.content.substring(0, 200);
    model.content = markdown.render(model.markdown);
    model.publishDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    model.updateDate = model.publishDate;

    return model;
}

app.http('article', {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    authLevel: 'anonymous', // TODO
    handler: async (request, context) => {
        switch (request.method) {
            case 'GET':
                break;
            case 'POST':
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
        }

        if (request.method === 'GET') {
            const id = parseInt(request.query.get('id'));
            if (!isNaN(id)) {
                let data = null;
                await Article.findById(id).populate('tagId').exec().then(result => {
                    if (result && result.visible) {
                        data = result;
                    }
                }).catch(err => {
                    console.error(err);
                });
                if (data) {
                    return {body: JSON.stringify(data)};
                }
            }
        } else if (request.method === 'POST') {
            const model = await createArticle(request.body);

            return {status: 201, headers: {location: `/admin/article?id=${model._id}`}};
        } else if (request.method === 'PUT') {
            const id = parseInt(request.query.get('id'));
            if (!isNaN(id)) {
                let model = await Article.findById(id).exec();
                if (!model) {
                    model = await createArticle(request.body);

                    return {status: 201, headers: {location: `/admin/article?id=${model._id}`}};
                } else {
                    model = await Article.findByIdAndUpdate(id, request.body).exec();

                    return {status: 200}
                }
            }
        } else if (request.method === 'DELETE') {
            const id = parseInt(request.query.get('id'));
            if (!isNaN(id)) {
                await Article.findByIdAndDelete(id).exec();
            }
        }
        const paths = ['title', 'content', 'tagId', 'publishDate', 'updateDate', 'author', 'visible'];

        const id = parseInt(request.query.get('id'));
        if (!isNaN(id)) {
            const data = await Article.findById(id).populate(paths).exec();

            if (!data) {
                if (data.visible) {
                    return {body: data};
                }
            }
        }

        const name = request.query.get('name');
        if (name) {
            const data = await Article.find({urlName: name}).populate(paths);

            if (!data) {
                return {body: data};
            }
        }

        return {
            status: 404,
            body: '404 Not Found'
        };
    }
});
