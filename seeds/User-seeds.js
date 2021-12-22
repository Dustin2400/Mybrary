const { User } = require('../models');

const userData = [
    {
        username: 'david45',
        password: 'password1234'
    },
    {
        username: 'Kat9645',
        password: 'password1234'
    },
    {
        username: 'art35',
        password: 'password1234'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;