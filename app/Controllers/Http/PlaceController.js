'use strict'

const Place = use("App/Models/Place")
const MapsService = use("App/Services/Maps")
const { validate } = use('Validator')

class PlaceController {
    rulesCreate = {
        company_id: 'required',
        address_street: 'required|string',
        address_number: 'required|string',
        address_zip_code: 'required|string',
        address_state: 'required|string',
        address_country: 'required|string',
    }

    async validator(request, rules) {
        const validation = await validate(request, rules);
        return (validation.fails()) ? validation.messages() : null;
    }

    async create({ request, response }) {
        const inputs = request.only(Object.keys(this.rulesCreate))

        const validation = await this.validator(inputs, this.rulesCreate);

        if (validation != null)
            return response.status(400).json(validation);

        const address = Object.values(inputs).join(',');

        const maps = await new MapsService().getLocationByAddres(address);

        if (!maps) {
            return response.status(400).json({ message: 'ADDRESS_NOT_FOUND' });
        }

        const { lat, lng } = maps.geometry.location;

        const data = await Place.create({...inputs, longitude: lng, latitude: lat });

        return data;
    }


    async get({ response }) {
        const data = await Place.query().paginate();

        return response.status(200).json(data);
    }

    async update({ request, response }) {
        const inputs = request.only(Object.keys(this.rulesCreate))

        const validation = await this.validator(inputs, this.rulesCreate);

        if (validation != null)
            return response.status(400).json(validation);

        const address = Object.values(inputs).join(',');

        const maps = await new MapsService().getLocationByAddres(address);

        if (!maps) {
            return response.status(400).json({ message: 'ADDRESS_NOT_FOUND' });
        }

        const { lat, lng } = maps.geometry.location;

        const data = await Place.query().where('id', request.params.id).update({...inputs, longitude: lng, latitude: lat });

        if (!data) {
            return response.status(400).json({ message: 'NOT_UPDATED' });
        }

        return response.status(200).json({ message: 'UPDATED' });
    }


    async delete({ request, response }) {
        const data = await Place.query().where('id', request.params.id).delete();

        if (!data) {
            return response.status(400).json({ message: 'NOT_DELETED' });
        }

        return response.status(200).json({ message: 'DELETED' });
    }
}

module.exports = PlaceController