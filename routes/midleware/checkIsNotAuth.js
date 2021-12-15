module.exports = checkIsNotAuth = (req, res, next) => {
    if(req.isAuthenticated()){
        return res.redirect('/articles')
    }

    next()
}