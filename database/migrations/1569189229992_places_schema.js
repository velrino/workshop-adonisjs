'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlacesSchema extends Schema {
    up() {
        this.create('places', (table) => {
            table.increments()
            table.string('latitude', 30).notNullable();
            table.string('longitude', 30).notNullable();
            table.string('address', 100).notNullable();
            table.integer('company_id', 2).unsigned().notNullable();
            table.foreign('company_id')
                .references('id')
                .inTable('companies')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps();
        })
    }

    down() {
        this.drop('places')
    }
}

module.exports = PlacesSchema