const express = require('express')
const app = express()

const knex = require('./config/database')

app.use(express.json())

app.get('/users', async (req, res) => {
    const result = await knex
        .select("*")
        .from('users')
        .where('deleted_at', null)

    return res.json(result)
})

app.post('/users', async (req, res) => {

    // verificar se usuário já existe

    // verificar se o email já existe

    //se não, salvar
    await knex('users')
        .insert(req.body)

    return res.json({ message: 'ok', user: req.body })
})

app.put('/users/:id', async (req, res) => {
    const { id } = req.params

    await knex('users')
    .where({ id })
    .update(req.body)

    return res.json({message: "ok", user: req.body})
})

app.delete('/users/:id', async (req,res) => {
    const { id } = req.params

    await knex('users')
    .where({ id })
    .update({ deleted_at: new Date()})

    return res.json({ message: "ok" })
})

app.get('/users/:id/projects', async(req, res, next) => {
    const { id } = req.params;

    try {
        const result = await knex('projects')
        .where({user_id: id})
        .where('users.deleted_at', null)
        .join('users', 'users.id', '=', 'projects.user_id')
        .select("projects.*", "users.username")
    
        return res.json(result)

    }catch(e) {
        next(e)
    }
    
})

app.put('/projects/:id', async (req, res, next) => {
    const { id } = req.params

    try {
        await knex('projects')
        .where({id})
        .update(req.body)
    
        return res.json(req.body)

    }catch(e) {
        next(e) 
    }
})

// notFound
app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404
    next(error)
})

// general error
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(3000, () =>  console.log('server is running'))