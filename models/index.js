// import models
const Book = require('./Book');
const Category = require('./Category');
const Review = require('./Review');
const User = require('./User');

// define relationships
Book.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Book, {
    foreignKay: 'category_id'
});

Book.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Book, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(Book, {
    foreignKey: 'book_id'
});

Book.hasMany(Review, {
    foreignKey: 'book_id'
});

// export models with associations
module.exports = { Book, Category, Review, User }