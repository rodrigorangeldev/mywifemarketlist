import { Request, Response } from 'express'
import knex from '../database/connection'

class UsersController {

   async create(req: Request, res: Response){
      const { email, name, password } = req.body

      const trx = await knex.transaction()

      const user = { email, name, password }

      const insertedIds = await trx('users').insert(user)

      await trx.commit()

      return res.json({
         id: insertedIds[0],
         user
      })

   }

   async index(req: Request, res: Response){
      
      const users = 
         await knex('users').select('users.*')

         if(!users)
            return res.status(404).json({message: "Not Found."})

      return res.status(200).json(users)
         
   }

   async show(req: Request, res: Response){
      const { email } = req.params

      const user = 
         await knex('users')
            .where('email', email)
            .select('users.*')
      
      if(!user[0])
         return res.status(404).json({message: "Not Found."})

      return res.status(200).json(user)

   }

   async delete(req: Request, res: Response){
      const { email } = req.params

      const user = 
         await knex('users')
            .where('email', email)
            .select('users.*')  

            console.log(user)

      if(!user[0])
         return res.status(404).json({message: "Not Found."})
         

      const trx = await knex.transaction()
      
      const t = await trx('users').where('email', email).delete()

      await trx.commit()

      return res.json({t})

   }


}

export default UsersController