import {Router} from 'express'
import { send } from '../controllers/test.controller'

const router=Router()

router.get('/',send)

export default router