const router = require('express').Router();
const sequelize = require('../config/connection');
const { Book, Category, Review, User, Vote, Wish } = require('../models');

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

router.get('/wishlist', (req, res) => {
    User.findOne({
        where: {
            id: 1
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
            user
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

router.get('/account', (req, res) => {
    res.render('account');
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
//check whether to add a dashboard routes - check with group
module.exports = router;
