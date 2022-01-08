const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Article = new Schema({

    ownId: {type: String},
    title: {type: String},
    description: {type: String},
    tags: [{type: String}],
    imgExists: {type: Boolean},
    authorId: {type: Schema.ObjectId, ref: 'User'},
    creationDate: Number

});


const model = mongoose.model('Article', Article, 'articles');

module.exports = {
    articleModel_: model,
}