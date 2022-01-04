//for user authentication - users not logged in will be unable to rent books, review books, add books to wishlist, add books to site, or upvote books
const withAuth = (req, res, next) => {
    if(!req.session.user_id){
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;