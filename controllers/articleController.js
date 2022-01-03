const articleModel = require('../models/Article');
const {validationResult} = require('express-validator');



class postController{

   async getAllarticles(req, res) {
       try {

            const page = req.query.page || 1;
            const limit = req.query.limit || 3;
            const allArticles = await articleModel.getAllData();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const articles = allArticles.slice(startIndex, endIndex)
        try {
            res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.length, queryParams: {limit: 3} },
              login: req.user.login, email: req.user.email });
        } catch (error) {
            res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.length, queryParams: {limit: 3} },
              login: false, email: 'no email', showData: {
                showLoginBtn: true,
                showRegisterBtn: true
            } });
        }
           
       } catch (error) {
           console.log(error)
       }
        
    }


    async getArticlesByTagName(req, res) {
        try {
            const tag = req.params.tag;
            const page = req.query.page || 1;
            const limit = req.query.limit || 3;
            const allArticles = await articleModel.getAllData();
            const filteredArticlesByTagName = articleModel.filterByTagName(allArticles, tag);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const articles = filteredArticlesByTagName.slice(startIndex, endIndex)
            console.log(articles.length)

            try {
                res.render('articles', {articles, pagination: { page, limit, totalRows: filteredArticlesByTagName.length, queryParams: {limit: 3} },
                allPosts: true, login: req.user.login, email: req.user.email });
            } catch (error) {
                res.render('articles', {articles, pagination: { page, limit, totalRows: filteredArticlesByTagName.length, queryParams: {limit: 3} },
                allPosts: true, login: false, email: 'no email', showData: {
                    showLoginBtn: true,
                    showRegisterBtn: true
                }});
            }
        } catch (error) {
            console.log(error)
        }
    }

   async getSingleArticle(req, res) {
        try {
            const articleId = req.params.id
            const singleArticle = await articleModel.findById(articleId)
            console.log(articleId)
            try {
                res.render('single-article', {article: singleArticle, login: req.user.login, email: req.user.email})
            } catch (error) {
                res.render('single-article', {article: singleArticle, login: false, email: 'no email', showData: {
                    showLoginBtn: true,
                    showRegisterBtn: true
                }})
            }   
        } catch (error) {
            console.log(erro)
        }
    }

    createNewArticle(req, res) {
        const articleData = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/articles/new')
        }
        articleModel.createNewOne(articleData, req.file, req.user, req.uniqueID)
        res.redirect('/articles')
    }


    getCreatePage(req, res) {
        res.render('create', {login: req.user.login, email: req.user.email});
    }
}


module.exports = new postController();