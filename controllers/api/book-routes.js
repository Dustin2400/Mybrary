const router = require('express').Router();
const sequelize = require('../../config/connection'); //for Vote object if implemented
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
            }
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
router.post('/', (req, res) => {
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
        Book.upvote({...req.body, user_id: req.session.user_id }, {Vote, Review, User})
        .then(votedData => res.json(votedData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

router.put('/wishlist', (req, res) => {
    if(req.session){
        Book.wishlist({...req.body, user_id: 1}, {Wish, Book, User})
        .then(wishlistData => res.json(wishlistData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
})
//PUT - update book based on id and other attributes when needed - test out 

// router.put('/:id', withAuth, (req, res) => {
//     Book.update(
//         {
//             title: req.body.title,
//             author: req.body.author,
//             category_id: req.body.category_id,
//             user_id: req.session.user_id
//         },
//         {
//             where: {
//                 id: req.params.id
//             }
//         }
//     )
//     .then(dbBookData => {
//         if(!dbBookData) {
//             res.status(400).json({ message: 'No book found.'});
//             return;
//         }
//         res.json(dbBookData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

//DELETE - DELETE a book by its respective id
// router.delete('/:id', withAuth, (req, res) => {
//     console.log('id', req.params.id);
//     Book.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(dbBookData => {
//         if(!dbBookData) {
//             res.status(400).json({ message: 'No book found.'});
//             return;
//         }
//         res.json(dbBookData);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

//votes attach to books - should implement as a book attribute - vote considered as potential Model/api
//do we need to implement a book image cover - ask the TAs - upload asset in public file then relative path in database or object itself?
//once fullstack is together - login will be implemented aside other features 

module.exports = router;