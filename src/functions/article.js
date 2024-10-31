const {app} = require('@azure/functions');
const {Article} = require('../models/Article');
require('../models/Tag'); // register Tag model

app.http('article', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
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

        const name = request.query.get('name');
        if (name) {
            let data = null;
            await Article.findOne({urlName: name}).populate('tagId').exec().then(result => {
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

        return {
            status: 404,
            body: '404 Not Found'
        };
    }
});
