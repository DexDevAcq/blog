const articleModel = require('../models/Article');
const {validationResult} = require('express-validator');
const { uniqueId } = require('../models/Article');



class postController{

    getAllarticles(req, res) {
        const page = req.query.page || "1";
        const limit = req.query.limit || "2";
        const allArticles = articleModel.getAllData();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const articles = allArticles.data.slice(startIndex, endIndex)
        
        try {
            res.render('articles', {articles, pagination: { page, limit: 3, totalRows: 20, queryParams: {limit: 2} },  login: req.user.login, email: req.user.email });
        } catch (error) {
            res.render('articles', {articles, pagination: { page, limit: 3, totalRows: 20, queryParams: {limit: 2} },  login: false, email: 'no email' });
        }
    }


    getArticlesByTagName(req, res) {
        const tag = req.params.tag;
        const page = req.query.page || "1";
        const limit = req.query.limit || "2";
        const allArticles = articleModel.getAllData();
        const filteredArticlesByTagName = articleModel.filterByTagName(allArticles.data, tag);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const articles = filteredArticlesByTagName.slice(startIndex, endIndex)

        try {
            res.render('articles', {articles, pagination: { page, limit: 3, totalRows: 20, queryParams: {limit: 2} }, allPosts: true, login: req.user.login, email: req.user.email });
        } catch (error) {
            res.render('articles', {articles, pagination: { page, limit: 4, totalRows: 20, queryParams: {limit: 2} }, allPosts: true, login: false, email: 'no email' });
        }
    }

    getSingleArticle(req, res) {
        const userId = req.params.id
        const singleArticle = articleModel.findById(userId)
        try {
            res.render('single-article', {article: singleArticle, login: req.user.login, email: req.user.email})
        } catch (error) {
            res.render('single-article', {article: singleArticle, login: false, email: 'no email'})
        }   
    }

    createNewArticle(req, res) {
        const articleData = req.body;
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // return res.status(400).json({ errors: errors.array() });
            req.session.message = {
                msg: JSON.stringify(errors.array()[0].msg)
            }
            return res.redirect('/articles/new')
        }
        articleModel.createNewOne(articleData, req.file, req.user, req.uniqueID)
        res.redirect('/articles')
    }
}


module.exports = new postController();