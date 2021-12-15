const express = require('express');

const router = express.Router();

// const sessionController = require('./controllers/sessionController');

const articleRouter = require('./routes/article');
const authRouter = require('./routes/auth');


router.use('/auth', authRouter)
router.use('/articles', articleRouter)



router.use('/', (req, res) => {
    res.redirect('/articles')
})


module.exports = router;