const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Book extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            book_id: body.book_id
        });
    }

    static wishlist(body, models) {
        return models.Wish.create({
            user_id: body.user_id,
            book_id: body.book_id
        });
    }
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checked_out: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        return_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'category',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book'
    }
);

module.exports = Book;