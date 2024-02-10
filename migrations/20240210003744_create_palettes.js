/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("palettes", function(table) {
        table.increments("id");
        table.string("color1", 255).notNullable();
        table.string("color2", 255).notNullable();
        table.string("color3", 255).notNullable();
        table.string("color4", 255).notNullable();
        table.string("color5", 255).notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("palettes");
};
