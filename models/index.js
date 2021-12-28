// import models
const Book = require('./Book');
const Category = require('./Category');
const Review = require('./Review');
const User = require('./User');
const Vote = require('./Vote')

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

Book.belongsToMany(User, {
    through: Vote,
    as: 'voted_books',
    foreignKey: 'book_id'
});

User.belongsToMany(Book, {
    through: Vote,
    as: 'voted_books',
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Book, {
    foreignKey: 'book_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Book.hasMany(Vote, {
    foreignKey: 'book_id'
});

// export models with associations
module.exports = { Book, Category, Review, User, Vote }