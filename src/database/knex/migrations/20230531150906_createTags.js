exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable(); // Campo obrigatório
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // Se deletar a nota, deleta a tag.
  table.integer("user_id").references("id").inTable("users")
});
  


exports.down = knex => knex.schema.dropTable("notes");