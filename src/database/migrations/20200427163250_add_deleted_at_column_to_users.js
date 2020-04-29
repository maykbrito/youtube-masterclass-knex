
exports.up = knex => 
    knex.schema.alterTable('users', t => {
        t.timestamp('deleted_at')
    })

exports.down = knex =>
    knex.schema.alterTable('users', t => {
        t.dropColumn('deleted_at')
    })
