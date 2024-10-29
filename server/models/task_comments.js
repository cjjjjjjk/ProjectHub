module.exports = (sequelize, DataTypes) => {
  const TaskComments = sequelize.define("TaskComments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tasks",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return TaskComments;
};
