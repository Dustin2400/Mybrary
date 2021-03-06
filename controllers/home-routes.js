const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, Category, Review, User, Vote, Wish } = require('../models');
const withAuth = require('../utils/auth');

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
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)'), 'vote_count']
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
        attributes: [
            'id',
            'title',
            'author',
            'checked_out',
            'return_date',
            'category_id',
            'user_id',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)'), 'vote_count']
        ],
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
            },
            {
                model: Wish,
                attributes: ['user_id', 'book_id']
            }
        ]
    })
    .then(dbBookData => {
        if (!dbBookData) {
            res.status(404).json({ message: 'No book found with this id'});
            return;
        }
        const book = dbBookData.get({ plain: true});
        let onWishlist = false;
        for (i=0; i<book.wishes.length; i++) {
            if (book.wishes[i].user_id === req.session.user_id) {
                onWishlist = true;
            }
        }
        let checkedOut = false;
        if(book.user_id === req.session.user_id) {
            checkedOut = true;
        }
        res.render('book', {
            book,
            loggedIn: req.session.loggedIn,
            onWishlist,
            checkedOut
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/addreview/:id', withAuth, (req, res) => {
    Book.findOne({
        where: {
           id: req.params.id
        },
        attributes: ['id'],
    })
    .then(dbBookData => {
        if (!dbBookData) {
            res.status(404).json({ message: 'No book found with this id'});
            return;
        }
        const book = dbBookData.get({ plain: true});
        console.log(book);
        res.render('addreview', {
            book,
            loggedIn: req.session.loggedIn
        });
    });
});


router.get('/wishlist', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
        },
        include: [
            { 
                model: Wish,
                attributes: ['id', 'book_id'],
                include: [
                    {
                        model: Book,
                        attributes: [
                            'id',
                            'title',
                            'author',
                            'checked_out',
                            // 'return_date',
                            'category_id',
                            'user_id',
                            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE book.id = vote.book_id)'), 'vote_count']
                        ]
                    }
                ]
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        const user = dbUserData.get({ plain: true });
        console.log(user);
        res.render('wishlist', {
            user,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);

    });
});

router.get('/editReview/:id', withAuth,  (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'content'
        ],
        include: [
            {
                model: Book,
                attributes: ['title']
            }
        ]
    })
    .then(dbReviewData => {
        if (!dbReviewData) {
            res.status(404).json({ message: 'No review found with that id'});
            return;
        }
        const review = dbReviewData.get({ plain: true });
        res.render('edit-review', {
            review,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/addbook', withAuth, (req, res) => {
    Category.findAll()
    .then(dbCategoryData => {
        const category = dbCategoryData.map(category => category.get({ plain: true }));
        res.render('addbook', {
            category,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/account', withAuth, (req, res) => {
    User.findOne({
        where: {
            id: req.session.user_id
            
        },
        include: [ {
            model: Book,
            attributes: ['id', 'title', 'author', 'checked_out'],
            include: [
                {
                    model: Category,
                    attribtes: ['name']
                }
            ]
        },
        {
            model: Review,
            attributes: ['id', 'content'],
            include: [
                {
                    model: Book,
                    attributes: ['title']
                }
            ]
        }
    ]
    })
    .then(dbBookData => {
        if (!dbBookData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }

        const book = dbBookData.get({ plain: true});
        console.log(book);
        res.render('account', {
            book,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/contact', (req, res) => {
    res.render('contact', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;