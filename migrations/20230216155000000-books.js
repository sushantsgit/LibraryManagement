"use strict";

const { STRING, TEXT, UUID, UUIDV4, INTEGER, DATE } = require("sequelize");

module.exports = {
  up: ({ context: { queryInterface } }) => {
    return queryInterface.createTable("books", {
      id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      title: {
        type: STRING,
        allowNull: false,
      },
      authorName: {
        type: STRING,
        allowNull: false,
      },
      isbn: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      genre: {
        type: STRING,
        allowNull: true,
      },
      description: {
        type: TEXT,
        allowNull: true,
      },
      quantity: {
        type: INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        type: DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DATE,
        allowNull: false,
      },
    });
  },
  down: ({ context: { queryInterface } }) => {
    return queryInterface.dropTable("books");
  },
};
