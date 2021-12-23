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

//POST a review
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Review.create({
            review_text: req.body.review_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
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