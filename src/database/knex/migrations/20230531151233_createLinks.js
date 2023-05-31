exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable(); // Campo obrigatório
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE") // Se deletar a nota, deleta a tag.
  table.timestamp("created_at").default(knex.fn.now())
});
  


exports.down = knex => knex.schema.dropTable("notes");