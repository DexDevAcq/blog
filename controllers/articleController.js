const articleModel = require('../models/Article');
const {validationResult} = require('express-validator');



class postController{

    getAllarticles(req, res) {
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const allArticles = articleModel.getAllData();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const articles = allArticles.data.slice(startIndex, endIndex)
        
        try {
            res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.data.length, queryParams: {limit: 3} },
              login: req.user.login, email: req.user.email });
        } catch (error) {
            res.render('articles', {articles, pagination: { page, limit, totalRows: allArticles.data.length, queryParams: {limit: 3} },
              login: false, email: 'no email', showData: {
                showLoginBtn: true,
                showRegisterBtn: true
            } });
        }
    }


    getArticlesByTagName(req, res) {
        const tag = req.params.tag;
        const page = req.query.page || 1;
        const limit = req.query.limit || 3;
        const allArticles = articleModel.getAllData();
        const filteredArticlesByTagName = articleModel.filterByTagName(allArticles.data, tag);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const articles = filteredArticlesByTagName.slice(startIndex, endIndex)

        try {
            res.render('articles', {articles, pagination: { page, limit, totalRows: articles.length, queryParams: {limit: 3} },
             allPosts: true, login: req.user.login, email: req.user.email });
        } catch (error) {
            res.render('articles', {articles, pagination: { page, limit, totalRows: articles.length, queryParams: {limit: 3} },
             allPosts: true, login: false, email: 'no email', showData: {
                showLoginBtn: true,
                showRegisterBtn: true
            }});
        }
    }

    getSingleArticle(req, res) {
        const userId = req.params.id
        const singleArticle = articleModel.findById(userId)
        try {
            res.render('single-article', {article: singleArticle, login: req.user.login, email: req.user.email})
        } catch (error) {
            res.render('single-article', {article: singleArticle, login: false, email: 'no email', showData: {
                showLoginBtn: true,
                showRegisterBtn: true
            }})
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