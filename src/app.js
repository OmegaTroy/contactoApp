import express from 'express' 
import morgan from 'morgan'
import authRouter from './routers/auth.routes.js'
import contactRouter from './routers/contact.routes.js'
import cookieParser from 'cookie-parser';
import { sequelize } from './db/db.js';

import './models/users.model.js'
import './models/contacts.model.js'


const app = express();
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(authRouter)
app.use(contactRouter)

const main =async()=>{
  try {
  await sequelize.sync()
  } catch (error) {
    console.error(error)
  }
}

main()
export default app