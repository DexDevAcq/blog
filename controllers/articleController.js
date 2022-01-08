const {validationResult} = require('express-validator');

const {articleModel_}  = require('../models/Article_');

class postController{


   async getAllarticles(req, res) {

            const page = req.query.page || 1;
            const limit = req.query.limit || 3;
            const allArticles = await articleModel_.find({}).populate('authorId');
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const articles = allArticles.slice(startIndex, endIndex)
        try {
            return res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.length, queryParams: {limit: 3} },
              login: req.user.login, email: req.user.email });
        } catch (error) {
            return res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.length, queryParams: {limit: 3} },
              login: false, email: 'no email', showData: {
                showLoginBtn: true,
                showRegisterBtn: true
            } });
        }
    }


    async getArticlesByTagName(req, res) {
            const tag = req.params.tag;
            const page = req.query.page || 1;
            const limit = req.query.limit || 3;
            const filteredArticlesByTagName = await articleModel_.find({tags: tag}).populate('authorId');
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const articles = filteredArticlesByTagName.slice(startIndex, endIndex)
            console.log(articles);

            try {
                return res.render('articles', {articles, pagination: { page, limit, totalRows: filteredArticlesByTagName.length, queryParams: {limit: 3} },
                allPosts: true, login: req.user.login, email: req.user.email });
            } catch (error) {
                return res.render('articles', {articles, pagination: { page, limit, totalRows: filteredArticlesByTagName.length, queryParams: {limit: 3} },
                allPosts: true, login: false, email: 'no email', showData: {
                    showLoginBtn: true,
                    showRegisterBtn: true
                }});
            }
    }

   async getSingleArticle(req, res) {
            const articleId = req.params.id
            const singleArticle = await articleModel_.findOne({ownId: articleId}).populate('authorId')
            try {
               return res.render('single-article', {article: singleArticle, login: req.user.login, email: req.user.email})
            } catch (error) {
               return res.render('single-article', {article: singleArticle, login: false, email: 'no email', showData: {
                    showLoginBtn: true,
                    showRegisterBtn: true
                }})
            } 
    }

    async createNewArticle(req, res) {
        const articleData = req.body;

        const Article = new articleModel_({

            ownId: req.uniqueID,
            title: articleData.title,
            description: articleData.description,
            authorId: req.user._id,  
            creationDate: new Date(),
            tags: !!articleData.tags.split(',')[0] ? [...articleData.tags.split(',')] : [],
            imgExists: req.file ? true : false

        });

    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/articles/new')
        }
        await Article.save()
        res.redirect('/articles')
    }


    getCreatePage(req, res) {
        res.render('create', {login: req.user.login, email: req.user.email});
    }
}


module.exports = new postController();