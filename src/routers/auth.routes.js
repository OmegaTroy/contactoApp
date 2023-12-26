import {Router} from 'express'
import { register,getUser, login,profile,verifyToken, logout} from '../controller/user.controller.js';
import {registerSchema,loginSchema} from '../schemas/auth.schema.js'
import {validatorSchema} from '../middlewares/validator.middlewares.js'
import {authRegister} from '../middlewares/validatorToken.js'
const router = Router()

router.post('/register',validatorSchema(registerSchema),register)
router.post('/login', validatorSchema(loginSchema), login)
router.post('/logout',logout)
router.get('/users', getUser)
router.get('/profile', authRegister, profile)
router.get('/verify', verifyToken)

export default router;