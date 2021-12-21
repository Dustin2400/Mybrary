const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Book extends Model {}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checked_out: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        votes: {
            type: DataTypes.INTEGER,
            allowNull: false,
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