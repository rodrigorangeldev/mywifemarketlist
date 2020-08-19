import express from 'express'

import UsersController from './controllers/UsersController'

const userCtrl = new UsersController()

const routes = express.Router()

routes.post('/users', userCtrl.create)
routes.get('/users', userCtrl.index)
routes.get('/users/:email', userCtrl.show)
routes.delete('/users/:email', userCtrl.delete)




export default routes