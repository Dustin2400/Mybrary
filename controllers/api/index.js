const router = require('express').Router();

//implement specific routes for models - book, category, user, review 
//CRUD methods, get all, get one by id, create, update, delete,
//allow users to create the books for their library - run by a TA 

const bookRoutes = require('./user-routes.js');
const categoryRoutes = require('./category-routes');
const reviewRoutes = require('./review-routes');
const userRoutes = require('./user-routes');

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;