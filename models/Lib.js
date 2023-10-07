const Sequelize = require('sequelize');

const sequelize = new Sequelize('Node_complete', 'root', 'Mayur@123', {
  host: 'localhost',
  dialect: 'mysql', 
});

const Library = sequelize.define('library', {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    BOOKNAME: { 
      type: Sequelize.STRING, 
      allowNull: false,
    },
    ISSUEDATE: { 
      type: Sequelize.STRING, 
      allowNull: false,
    },
    RETURNDATE: { 
        type: Sequelize.STRING, 
        allowNull: false,
    },
},
{
    tableName: 'library', 
    timestamps: false, 
});

module.exports = Library;
