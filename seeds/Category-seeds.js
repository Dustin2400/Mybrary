const { Category } = require('../models');

const categoryData = [
    {
        name: 'Sci-Fi'
    },
    {
        name: 'Literature'
    },
    {
        name: 'non-fiction'
    }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;