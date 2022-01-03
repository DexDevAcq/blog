const DB_LINK_POSTS = `${__dirname}/../DB/articles.json`
const articleModel = require('./Article_');



class PostModel {

    constructor(link){
        this.articlesLink = link;
    }

    async getAllData() {
        const articles = articleModel.find({}).populate('author')
        return articles

    }

    filterByTagName(array, tag) {
        return array.filter(article => article.tags.some(currentTag => currentTag === tag));
    }


    async findById(id){

        const article = await articleModel.findOne({ownId: id}).populate('author')
        return article

    }



   async createNewOne(articleData, file, user, uniqueID){

        const Article = new articleModel({

            ownId: uniqueID,
            title: articleData.title,
            description: articleData.description,
            author: user._id,  
            creationDate: new Date(),
            tags: !!articleData.tags.split(',')[0] ? [...articleData.tags.split(',')] : [],
            imgExists: file ? true : false

        });

        await Article.save()

    }
    
}


module.exports = new PostModel(DB_LINK_POSTS);

