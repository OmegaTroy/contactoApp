import { createAccessToken } from '../libs/jwt.js';
import { UserModel } from '../models/users.model.js'
import {TOKEN_SECRET} from '../config.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUser = async(req,res)=>{
  const users = await UserModel.findAll();
  res.json(users)
}

export const register  = async(req,res)=> {
  const {userName,email,password} = req.body;
  
  try {
    const passwordHast = await bcrypt.hash(password, 10)
    const User = await UserModel.create({userName,email,password:passwordHast})
    await User.save();

    const token = await createAccessToken({id: User.id})
    res.cookie('token',token)
      res.json({
      id: User.id,
      username: User.userName,
      email: User.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const login = async(req,res)=>{
  const {email,password} = req.body

  try {
    const userFound = await UserModel.findOne({where: {email}})
    if(!userFound) return res.status(404).json({message: 'user not found'})
  
    const isMatch = await bcrypt.compare(password, userFound.password)
    if(!isMatch) return res.status(404).json('the password is not valid')
  
    const token = await createAccessToken({id: userFound.id})
    res.cookie('token',token)
  
    res.json({
      id: userFound.id,
      userName: userFound.userName,
      email: userFound.email
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const profile = async(req,res)=>{
const {id} = req.user

try {
  const userFound = await UserModel.findByPk(id);
  if(!userFound) return res.status(404).json({message: 'user not Found'})
  
  return res.json({
    id: userFound.id,
    userName: userFound.userName,
    email: userFound.email
  })  
} catch (error) {
  res.status(500).json({ message: error.message })
}
}

export const logout = (req,res)=>{
  res.cookie('token',"",{
    expires: new Date(0)
  });
  res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) res.status(404).json({ message: "Unauthorized" })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(404).json({ message: "Unauthozed" })

    const userFound = await UserModel.findByPk(user.id)
    if (!userFound) return res.status(404).json({ message: "Unauthozed" })
    return res.json({
      id: userFound.id,
      username: userFound.userName,
      email: userFound.email,
    })
  })
}