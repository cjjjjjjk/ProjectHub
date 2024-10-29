// models/projects.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Projects = sequelize.define(
    "Projects",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => {
          const { nanoid } = require("nanoid");
          return nanoid(10);
        },
      },
      state: {
        type: DataTypes.ENUM("Not Started", "In Progress", "Done"),
        defaultValue: "Not Started",
      },
      model: {
        type: DataTypes.ENUM("Kanban", "Scrum", "Extreme Program", "Custom"),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
  );

  return Projects;
};
