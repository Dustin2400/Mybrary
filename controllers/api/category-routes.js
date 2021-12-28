const router = require('express').Router();
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const { Book, Category, Review, User } = require('../../models');
//wait for pull once this is completed
//GET all categories 
router.get('/', (req, res) => {
    Category.findAll({
        include: [
            {
                model: Book
            }
        ]
    })
    .then(categoryData => {
        console.log('Route to find all book categories', categoryData);
        res.json(categoryData);
    });
});

//GET category by its id 
router.get('/:id', (req, res) => {
    Category.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Book
            }
        ]
    })
    .then(categoryData => {
        console.log('Route to find the book category by its id', categoryData);
        res.json(categoryData);
    });
});

//POST - create a new category for bookss
router.post('/', withAuth, (req, res) => {
    Category.create(req.body)
    .then(categoryData => {
        console.log('Router to create a category', categoryData);
        res.json(categoryData)
    });
});

//PUT - update a category by its id
// router.put('/:id', withAuth, (req, res) => {
//     Category.update(req.body, {
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(categoryData => {res.json(categoryData)});
// });

//DELETE - delete a category 
// router.delete('/:id', withAuth, (req, res) => {
//     Category.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(categoryData => {res.json(categoryData)});
// });

module.exports = router;