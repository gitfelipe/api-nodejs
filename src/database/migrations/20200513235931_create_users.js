exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments();

        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('location');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
