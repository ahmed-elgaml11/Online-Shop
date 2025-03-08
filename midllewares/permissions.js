const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    req.flash('error', 'You must be logged in .');
    res.redirect('/user/login');
};

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.admin === true ) {
        return next();
         
    }
    req.flash('error', 'You must be an admin to access this page.');
    return res.redirect('/user/login');
}

module.exports = {
    isAuthenticated,
    isAdmin
}