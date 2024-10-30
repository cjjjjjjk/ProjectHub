module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("Projects", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    state: {
      type: DataTypes.ENUM("Not Started", "In Progress", "Done"),
      allowNull: false,
      defaultValue: "Not Started",
    },

    model: {
      type: DataTypes.ENUM("Kanban", "Scrum", "Extreme Program", "Custom"),
      allowNull: false,
      defaultValue: "Custom",
    },

    accessibility: {
      type: DataTypes.ENUM("Public", "Private"),
      allowNull: false,
      defaultValue: "Private"
    }

  });

  // Association ===================================
  // ------------------------------------author: Hai
  Projects.associate = function (models) {
    Projects.hasMany(models["ProjectJoineds"], {
      foreignKey: 'project_id',
    })
  }
  //------------------------------------------------
  return Projects;
};
