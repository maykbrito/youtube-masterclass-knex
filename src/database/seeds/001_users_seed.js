exports.seed = knex =>
  // Deletes ALL existing entries
  knex('users').del()
  .then(() => 
    // Inserts seed entries
    knex('users').insert([
      {
        username: 'mayk',
      },
      {
        username: "diego",
      }
    ])
  )