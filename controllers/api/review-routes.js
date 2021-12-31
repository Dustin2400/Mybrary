const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Book, Category, Review, User } = require('../../models');

//GET all reviews
router.get('/', (req, res) => {
    Review.findAll()
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Book
            }
        ]
    })
    .then(dbReviewData => {
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST a review
router.post('/', withAuth, (req, res) => 
    {
        Review.create({
            content: req.body.content,
            book_id: req.body.book_id,
            user_id: req.session.user_id
        })
        .then(dbReviewData => {
            console.log(dbReviewData);
            res.json(dbReviewData)})
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//PUT edit a review
router.put('/:id', withAuth, (req, res) => {
    Review.update(
        {
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(400).json({ message: 'No review found with this id'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DESTROY delete a review
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData => {
        if(!dbReviewData) {
            res.status(404).json({ message: 'No review found!' });
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 
