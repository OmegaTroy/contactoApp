import {DataTypes} from 'sequelize'
import { sequelize } from '../db/db.js';
import {ContactModel} from './contacts.model.js';

export const UserModel = sequelize.define('user',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userName:{
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  email:{
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  password:{
    type: DataTypes.STRING,
    required: true
  }
},{timestamps: false})  


UserModel.hasMany(ContactModel,{
  foreignKey: 'userId',
  sourceKey: 'id'
})


ContactModel.belongsTo(UserModel,{
  foreignKey: 'userId',
  targetId: 'id'
})