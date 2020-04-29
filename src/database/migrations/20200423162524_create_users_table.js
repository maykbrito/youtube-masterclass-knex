const { onUpdateTrigger } = require('../../../knexfile')

exports.up = knex => 
    knex.schema.createTable('users', t => {
        t.increments('id')
        t.text('username').unique().notNullable()

        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .then(() => knex.raw(onUpdateTrigger('users')))


exports.down = knex => 
    knex.schema.dropTable('users') // don't need drop trigger