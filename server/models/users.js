module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Email address already exists.'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email!"
                },
                notNull: {
                    msg: `Email can not be empty !`,
                },
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'username  already exists.'
            },
            validate: {
                notNull: {
                    msg: 'Username can not be empty !',
                },
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name can not be empty !"
                }
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password can not be empty !',
                },
            },
        },

    });

    return Users;
};
