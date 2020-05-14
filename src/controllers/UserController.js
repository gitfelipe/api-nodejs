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
    }
};
