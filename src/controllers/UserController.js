const knex = require('../database')

module.exports = {
    async index (req, res, next) {
        try {
            const result = await knex
            .select("*")
            .from('users')
            .where('deleted_at', null)
    
            return res.json(result)
            
        } catch (error) {
            next(error)
        }
    },
    async create (req, res, next) {
        try {
            // verificar se usuário já existe
        
            // verificar se o email já existe
        
            // salvar
            await knex('users')
                .insert(req.body)
        
            return res.status(201).send()

        } catch (error) {
            next(error)
        }
    },
    async update (req, res, next) {
        try {
            const { id } = req.params
    
            await knex('users')
                .where({ id })
                .update(req.body)
        
            return res.send()
        } catch (error) {
            next(error)
        }
    },
    async delete (req, res, next) {
        try {
            const { id } = req.params
        
            await knex('users')
                .where({ id })
                // soft delete
                // .update({ deleted_at: new Date()})
                .del()
        
            return res.send()
        } catch (error) {
            next(error)
        }
    }
}