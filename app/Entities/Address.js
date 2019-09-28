'use strict'

class AddressEntity {

    address_street;
    address_number;
    address_zip_code;
    address_state;
    address_country;
    constructor({ address_country }) {
        this.address_country = address_country;
    }
}

module.exports = PlaceEntity;