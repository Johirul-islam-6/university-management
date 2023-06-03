import express from 'express'
import userController from './users.controller'
const router = express.Router()

router.post('/create-user', userController.singelUserCreated)

export default router
