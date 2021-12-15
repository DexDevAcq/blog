const express = require('express');
const {body} = require('express-validator');
const uniqueId = require('./midleware/uniqueId');

const handleFileUpload = require('./midleware/handleFielUpload');
const articleController = require('../controllers/articleController');
const checkIsNotAuth = require('./midleware/checkIsNotAuth');
const checkIsAuth = require('./midleware/checkIsAuth');

const router = express.Router();





router.get('/',  articleController.getAllarticles);

router.get('/new', checkIsAuth, (req, res) => {
    res.render('create')
});


router.get('/:id',  articleController.getSingleArticle);

router.get('/filter/:tag', articleController.getArticlesByTagName)

router.post('/', checkIsAuth, uniqueId, handleFileUpload.single("image"), [body('title')
    .notEmpty()
    .withMessage('Title cannot be empty'),
    body('description')
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({min: 10})
    .withMessage('Description must be at least 10 characters')
],  articleController.createNewArticle);





module.exports = router;