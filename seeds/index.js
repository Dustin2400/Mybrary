const seedCategories = require('./category-seeds');
const seedBooks = require('./book-seeds');
const seedUsers = require('./user-seeds');
const seedReviews = require('./review-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database sync');

    await seedCategories();
    console.log('categories seeded');
    
    await seedUsers();
    console.log('Users seedes');

    await seedBooks();
    console.log('Books seeded');

    await seedReviews();
    console.log('Reviews seeded');
}

seedAll();