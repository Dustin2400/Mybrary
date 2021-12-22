const { Review } = require('../models');

const reviewData = [
    {
        content: 'This book made me lose my job',
        user_id: 3,
        book_id: 6
    },
    {
        content: 'BOOOOOORING!',
        user_id: 2,
        book_id: 3
    },
    {
        content: 'Utter nonsense.',
        user_id: 1,
        book_id: 4
    },
    {
        content: 'How could someone write something so contaversial and so brave.',
        user_id: 1,
        book_id: 4
    }
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;