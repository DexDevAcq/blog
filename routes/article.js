const express = require('express');
const uniqueId = require('./midleware/uniqueId');


const articleController = require('../controllers/articleController');

const articleValidation = require('./midleware/articleValidation');
const handleFileUpload = require('./midleware/handleFielUpload');
const checkIsNotAuth = require('./midleware/checkIsNotAuth');
const checkIsAuth = require('./midleware/checkIsAuth');

const router = express.Router();





router.get('/',  articleController.getAllarticles);

router.get('/new', checkIsAuth, articleController.getCreatePage);


router.get('/:id',  articleController.getSingleArticle);

router.get('/filter/:tag', articleController.getArticlesByTagName)

router.post('/', checkIsAuth, uniqueId, handleFileUpload.single("image"), articleValidation,  articleController.createNewArticle);





module.exports = router;