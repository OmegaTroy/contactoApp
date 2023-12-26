import Sequelize from 'sequelize'

export const sequelize = new Sequelize('contactoapp', 'root', '425681581718',{
  host: 'localhost',
  dialect: 'mysql'
})