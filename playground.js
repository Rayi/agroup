var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./playground/mydb.sqlite"
  },
  debug: true
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name');
      table.timestamps();
    })
    .catch(function(e) {
      console.error(e);
    });
  }
});