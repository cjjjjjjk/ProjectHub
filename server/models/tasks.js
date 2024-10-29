module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Projects",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("In Progress", "Done"),
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("1", "2", "3"),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Hook kiểm tra loại task có hợp lệ với mô hình dự án không
  Tasks.beforeCreate(async (task, options) => {

    try {

      // Lấy dự án dựa trên project_id
      const project = await sequelize.models.Projects.findByPk(task.project_id);

      // Kiểm tra nếu project không tồn tại
      if (!project) {
        throw new Error("Project not found");
      }

      // Các loại task theo mô hình
      const taskTypes = {
        Kanban: ["Backlog", "In progress", "Review", "Completed"],
        Scrum: ["To Do", "In progress", "Test", "Review"],
        "Extreme Program": ["Planning", "Designing", "Coding", "Testing", "Listening"],
        Custom: [], // Nếu có mô hình Custom thì ta có thể xử lý loại task theo nhu cầu
      };

      // Lấy các loại task hợp lệ cho mô hình dự án
      const validTaskTypes = taskTypes[project.model];

      // Nếu loại task của project không hợp lệ, báo lỗi
      if (!validTaskTypes.includes(task.type)) {
        throw new Error(
          `Invalid task type for ${project.model} model. Valid types: ${validTaskTypes.join(", ")}`
        );
      }
    } catch (err) {
      console.log(err.message)
    }
  });
  return Tasks;
};
