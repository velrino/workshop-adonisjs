'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlacesSchema extends Schema {
    up() {
        this.table('places', (table) => {
            table.dropColumn('address')
            table.string('address_street', 100);
            table.string('address_number', 10);
            table.string('address_zip_code', 20);
            table.string('address_state', 20);
            table.string('address_country', 20);
        })
    }

    down() {
        this.table('places', (table) => {
            table.string('address', 100);
            table.dropColumn('address_street');
            table.dropColumn('address_number');
            table.dropColumn('address_zip_code');
            table.dropColumn('address_state');
            table.dropColumn('address_country');
        })
    }
}

module.exports = PlacesSchema