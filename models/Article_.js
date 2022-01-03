const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Article = Schema({

    ownId: {type: String},
    title: {type: String},
    description: {type: String},
    tags: [{type: String}],
    imgExists: {type: Boolean},
    author: {type: Schema.ObjectId, ref: 'User'},
    creationDate: Number

});


module.exports = mongoose.model('Article', Article, 'articles');