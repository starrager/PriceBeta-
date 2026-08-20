import { Router } from "express";
import {register,login} from '../controllers/auth.controller'
import { middleware } from "../middleware/middleware";

const router=Router()

router.post('/register',register)
router.post('/login',login)

export default router