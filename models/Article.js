const fs = require('fs');
const DB_LINK_POSTS = `${__dirname}/../DB/articles.json`
const userModal = require('./User');

class PostModel {


    constructor(link){
        this.articlesLink = link;
    }

    getAllData() {
        const data = JSON.parse(fs.readFileSync(this.articlesLink))
        return data
    }

    filterByTagName(array, tag) {
        return array.filter(article => article.tags.some(currentTag => currentTag === tag));
    }


    findById(id){
        const { data } = this.getAllData();
        const post = data.find((article) => article.id === id)
        if(post){
            return post
        } else {
            console.log('There is no such post')
        }
    }



    createNewOne(articleData, file, user, uniqueID){
        const { data } = this.getAllData();
        const currentUser = userModal.findById(user.id);

        const newArticle = {
            id: uniqueID,
            title: articleData.title,
            description: articleData.description,
            tags: [...articleData.tags.split(',')],
            imgExists: file ? true : false,
            authorName: currentUser.login,
            authorId: currentUser.id
        }
        
        data.push(newArticle)

        const updatedArticles = JSON.stringify({data})

        fs.writeFile(this.articlesLink, updatedArticles, (err) => {
            if(err){
                console.log(err)
            }
            console.log('Written successfully');
        })

    }

    
}


module.exports = new PostModel(DB_LINK_POSTS);

