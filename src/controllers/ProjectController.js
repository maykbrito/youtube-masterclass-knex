const knex = require('../database')


module.exports = {
    async index (req, res, next) {
        try {
            const { user_id } = req.query;
            // pagination
            const { page = 1 } = req.query;

            const db = knex('projects')
                // pagination
                .limit(5)
                .offset( (page -1 ) * 5)

            if (user_id) {
                db
                .where({ user_id })
                .join('users', 'users.id', '=', 'projects.user_id')
                .select("projects.*", "users.username")
                .where('users.deleted_at', null) // soft delete
            }

            // count
            const [total] = await knex('projects').where({ user_id }).count()
            console.log(total)

            res.header('X-Total-Count', count["count(*)"])

            const result = await db

            return res.json(result)

        } catch (error) {
            next(error)
        }
    }
}