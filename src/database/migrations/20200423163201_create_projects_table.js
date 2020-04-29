exports.up = knex =>
    knex.schema.createTable('projects', t => {
        t.increments('id')

        // relacionamento
        t.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')

        t.text('title')
        t.text('description')

        t.timestamps(true, true)
    })

exports.down = knex => 
    knex.schema.dropTable('projects')