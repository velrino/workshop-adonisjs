'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompaniesSchema extends Schema {
    up() {
        this.create('companies', (table) => {
            table.increments()
            table.string('name', 100).notNullable();
            table.timestamps()
        })
    }

    down() {
        this.drop('companies')
    }
}

module.exports = CompaniesSchema