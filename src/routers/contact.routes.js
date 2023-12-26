import {Router} from 'express'
import {createContact, getContacts,getContact,deleteContact,updateContact} from '../controller/contact.controller.js'
import {authRegister} from '../middlewares/validatorToken.js'

const router = Router();

  router.get('/contact',authRegister,getContacts);
  router.get('/contact/:name',authRegister,getContact);
  router.post('/contact',authRegister , createContact);
  router.delete('/contact/:id',authRegister,deleteContact)
  router.put('/contact/:name',authRegister,updateContact)


export default router;