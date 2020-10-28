
exports.up = function(knex) {
  return knex.schema
    .createTable('urls', function (table) {
      table.string('url', 128).notNullable();
      table.text('json').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('urls');
};
