import Sequelize from 'sequelize';
import db from '../database';

const Operation = db.define('Operation', {
    
    id: {
      autoIncrement: true, 
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    concept: {
      type: Sequelize.STRING,
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE
    }
  }, {
    tableName: 'Operations',
    timestamps: true
});

export default Operation;