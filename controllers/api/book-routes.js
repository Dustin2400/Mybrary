const router = require('express').Router();
const sequelize = require('../../config/connection'); 
const withAuth = require('../../utils/auth');
const { Book, Category, Review, User, Vote, Wish } = require('../../models');

//GET all books 
router.get('/', (req, res) => {
    Book.findAll({
        include: [
            {
                model: Category,
                attributes: ['name']
            },
            {
                model: Review,
                attributes: ['id', 'content', 'user_id', 'book_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(dbBookData => res.json(dbBookData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET book by one id
router.get('/:id', (req, res) => {
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
                attributes: ['id', 'content', 'user_id', 'book_id'],
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
                model: Vote
            }
        ]
    })
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(400).json({ message: 'No book found with this id number.' });
            return;
        }
        res.json(dbBookData);
    })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   })
});

//CREATE/POST Book - made by user
router.post('/', withAuth, (req, res) => {
    Book.create({
        title: req.body.title,
        author: req.body.author,
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        checked_out: false
    })
    .then(dbBookData => res.json(dbBookData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Make a VOTE model
//PUT - vote addon for each book as voted by users 
router.put('/vote', withAuth, (req, res) => {
    if(req.session){
        console.log(req.body)
        Book.upvote({...req.body, user_id: req.session.user_id }, {Vote, Review, User})
        .then(votedData => {
            res.json(votedData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/wishlist', withAuth, (req, res) => {
    if(req.session){
        Book.wishlist({...req.body, user_id: req.session.user_id}, {Wish, Book, User})
        .then(wishlistData => res.json(wishlistData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
});

router.delete('/wishlistRemove', withAuth, (req, res) => {
    if(req.session){
        Wish.destroy({
            where: {
                book_id: req.body.book_id,
                user_id: req.session.user_id
            }
        })
        .then(dbBookData =>{
            if(!dbBookData) {
                res.status(400).json({ message: 'No book found.'});
                return;
            }
            res.json(dbBookData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})

router.put('/:id', withAuth, (req, res) => {
    Book.update(
        {
            checked_out: req.body.checked_out,
            return_date: req.body.return_date,
            user_id: req.session.user_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(400).json({ message: 'No book found.'});
            return;
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/checkin/:id', withAuth, (req, res) => {
    Book.update(
        {
            checked_out: req.body.checked_out,
            return_date: null,
            user_id: req.body.user_id
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(400).json({ message: 'No book found.'});
            return;
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req,res) => {
    Book.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBookData => {
        if(!dbBookData) {
            res.status(400).json({ message: 'No book found.'});
            return;
        }
        res.json(dbBookData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;