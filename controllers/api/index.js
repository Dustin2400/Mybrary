const router = require('express').Router();

const bookRoutes = require('./book-routes.js');
const categoryRoutes = require('./category-routes');
const reviewRoutes = require('./review-routes');
const userRoutes = require('./user-routes');

router.use('/books', bookRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;