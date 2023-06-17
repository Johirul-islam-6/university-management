import express from 'express'
import { CreateUserController } from './users.controller'

const router = express.Router()

router.post('/create-user', CreateUserController.singelUserCreated)

export const UserRoutes = router
