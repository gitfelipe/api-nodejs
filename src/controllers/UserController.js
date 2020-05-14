const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { name, email, phone, location } = request.body;

        await connection('users').insert({
            name,
            email,
            phone,
            location
        });

        return response.json({ name, email, phone, location });
    },

    async update(request, response) {
        const { id } = request.params;

        const { name, email, phone, location } = request.body;

        await connection('users')
            .where({ id })
            .update({ name, email, phone, location });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('users').where({ id }).delete();

        response.status(204).send();
    }
};
