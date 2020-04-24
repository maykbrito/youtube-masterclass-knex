exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'admin',
          password:'password',
          email:'admin@email.com'
        },
        {
          username: "maykbrito",
          password: "123456",
          email: "mayk@local.test"
        }
      ]);
    });
};