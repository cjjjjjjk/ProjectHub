// models/users.js
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DOB: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    socialAcc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Users.associate = (models) => {
    // Một người dùng có thể tham gia vào nhiều Project qua bảng Project_joined
    Users.belongsToMany(models.Projects, {
      through: "Project_joined",
      foreignKey: "participant_id",
      as: "projects",
    });

    // Một người dùng có thể được giao nhiều Task qua bảng Assigned_to
    Users.belongsToMany(models.Tasks, {
      through: "Assigned_to",
      foreignKey: "user_id",
      otherKey: "task_id",
      as: "tasks",
    });
  };

  return Users;
};
