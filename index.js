const express = require('express')
const app = express()

const knex = require('./config/database')

app.use(express.json())

app.get('/users', async (req, res) => {
    const result = await knex
        .select("*")
        .from('users')

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
    .delete()

    return res.json({ message: "ok" })
})

app.listen(3000, () =>  console.log('server is running'))