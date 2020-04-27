
exports.up = knex => 
    knex.schema.createTable('users', t => {
        t.increments('id').primary().unsigned()
        t.string('username').unique()
        t.string('password')
        t.string('email').unique()
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })


exports.down = knex => 
    knex.schema.dropTable('users')