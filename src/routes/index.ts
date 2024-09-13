import { Router } from "express";
import authRouter from './auth'
import expenseRouter from './expenses'
import tokenRouter from './token'
const router = Router()


router.use('/api/auth',authRouter)
router.use('/api/expenses', expenseRouter)
router.use('/api/token', tokenRouter)

export default router
