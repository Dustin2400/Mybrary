const { Wish } = require('../models')

const wishData = [
    {
        user_id: 1,
        book_id: 1
    },
    {
        user_id: 1,
        book_id: 4
    },
    {
        user_id: 1,
        book_id: 2
    },
    {
        user_id: 1,
        book_id: 5
    },
    {
        user_id: 2,
        book_id: 5
    },
    {
        user_id: 3,
        book_id: 5
    },
    {
        user_id: 3,
        book_id: 3
    },
    {
        user_id: 3,
        book_id: 4
    },
]

const seedWishes = () => Wish.bulkCreate(wishData);

module.exports = seedWishes;