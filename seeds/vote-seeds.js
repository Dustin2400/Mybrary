const { Vote } = require('../models');

const voteData = [
    {
        user_id: 1,
        book_id: 4
    },
    {
        user_id: 2,
        book_id: 4
    },
    {
        user_id: 2,
        book_id: 3
    },
    {
        user_id: 3,
        book_id: 1
    },
]

const seedVotes = () => Vote.bulkCreate(voteData);

module.exports = seedVotes;