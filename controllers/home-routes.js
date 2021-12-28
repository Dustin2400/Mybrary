const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, Category, Review, User } = require('../models');

//obtain all books for user to see on homepage
router.get('/', (req, res) => {
   Book.findAll({
        attributes: [
            'id',
            'author',
            'checked_out',
            'return_date',
            'votes',
            'category_id',
            'user_id',
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE ')] - sequelize confuses me tbh 
        ],
        include: [
            {
                model: Review,
                attributes: ['id', 'content', 'User_id', 'Book_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//check whether to add a dashboard routes - check with group
module.exports = router;
