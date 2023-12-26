import {DataTypes} from 'sequelize'
import {sequelize} from '../db/db.js'  

export const ContactModel = sequelize.define('contacts',{
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    required: true,
    unique: true
  },
  number:{
  type:DataTypes.STRING(13),
  required: true,
  },

},{timestamps:false})