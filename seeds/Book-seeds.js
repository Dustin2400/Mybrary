const { Book } = require('../models');

const BookData = [
    {
        title: 'Cats Cradle',
        author: 'Kurt Vonnegut',
        checked_out: true,
        votes: 7,
        category_id: 1,
        user_id: 1
    },
    {
        title: 'Farenheit 451',
        author: 'Ray Bradbury',
        checked_out: true,
        return_date: "01-19-2022",
        votes: 6,
        category_id: 1,
        user_id: 3
    },
    {
        title: 'Moby Dick',
        author: 'Herman Melville',
        checked_out: false,
        votes: 0,
        category_id: 2,
    },
    {
        title: 'Finnegans Wake',
        author: 'James Joyce',
        checked_out: true,
        votes: 2,
        category_id: 2,
        user_id: 2
    },
    {
        title: 'Blink',
        author: 'Malcolm Gladwell',
        checked_out: true,
        votes: 4,
        category_id: 3,
        user_id: 3
    },
    {
        title: 'Ghandi and Churchill',
        author: 'Arthur Herman',
        checked_out: false,
        votes: 3,
        category_id: 3,
    },
];

const seedBooks = () => Book.bulkCreate(BookData);

module.exports = seedBooks;