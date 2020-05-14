const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');

        return response.json(users);
    },

    async create(request, response) {
        const { name, email, phone, location } = request.body;

        const user = await connection('users').where({ email }).first();

        if (user) {
            return response.status(401).send({ error: 'E-mail already exists.' });
        }

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

        const updateUser = await connection('users').where({ id }).first();

        if (!updateUser) {
            return response.status(404).send({ error: 'User not found.' });
        }

        await connection('users')
            .where({ id })
            .update({ name, email, phone, location });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        const deleteUser = await connection('users').where({ id }).first();

        if (!deleteUser) {
            return response.status(404).send({ error: 'User not found.' });
        }

        await connection('users').where({ id }).delete();

        response.status(204).send();
    }
};
