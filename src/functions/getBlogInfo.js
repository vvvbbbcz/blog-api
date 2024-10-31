const {app} = require('@azure/functions');

app.http('getBlogInfo', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        return {
            status: 404,
            body: '404 Not Found'
        };
    }
});
