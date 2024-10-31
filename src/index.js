const {app} = require('@azure/functions');
const {mongoose} = require("mongoose")

mongoose.connect('mongodb://localhost/test').then(() => {
    console.log('Database connected');
});

app.setup({
    enableHttpStream: true,
});
