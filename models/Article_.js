const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Article = new Schema({

    ownId: {type: String},
    title: {type: String},
    description: {type: String},
    tags: [{type: String}],
    imgExists: {type: Boolean},
    author: {type: Schema.ObjectId, ref: 'User'},
    creationDate: Number

});


const model = mongoose.model('Article', Article, 'articles');

module.exports = {
    articleModel_: model,
    filterMeth: _filterByTagName = (array, tag) => {
        return array.filter(article => article.tags.some(currentTag => currentTag === tag));
    }
}