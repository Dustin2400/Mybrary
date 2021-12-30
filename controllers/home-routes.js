const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, Category, Review, User } = require('../models');

//obtain all books for user to see on homepage
router.get('/', (req, res) => {
   Book.findAll({
        attributes: [
            'id',
            'title',
            'author',
            'checked_out',
            // 'return_date',
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
            },
            {
                model: Category,
                attributes: ['name']
            }
        ]
    })
    .then(dbPostData => {
        const books = dbPostData.map(post => post.get({ plain: true }));
        console.log(books)
        res.render('homepage', {
            books,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/book/:id', (req, res) => {
    Book.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Review,
                attributes: ['content'],
                include: [
                    {
                    model: User,
                    attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(dbBookData => {
        if (!dbBookData) {
            res.status(404).json({ message: 'No book found with this id'});
            return;
        }
        const book = dbBookData.get({ plain: true});
        console.log(book);
        res.render('book', {
            book,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})
// search functionality not made at this time - mickey
router.get('/search', (req, res) => {
    res.render('search');
});

router.get('/wishlist', (req, res) => {
    res.render('wishlist');
});

router.get('/addreview',  (req, res) => {
    res.render('addreview');
});

router.get('/editreview',  (req, res) => {
    res.render('editreview');
});

router.get('/addbook', (req, res) => {
    res.render('addbook');
});

router.get('/account', (req, res) => {
    res.render('account');
    // include: [
    //     {
    //         model: Review,
    //         attributes: ['id', 'content', 'User_id', 'Book_id'],
    //         include: {
    //             model: User,
    //             attributes: ['username']
    //         }
    //     },
    //     {
    //         model: User,
    //         attributes: ['username']
    //     }
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
