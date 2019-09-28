 'use strict'

 const Env = use('Env')

 class MapsService {
     googleMapsClient

     constructor() {
         const key = Env.get('GOOGLE_MAP_KEY')
         this.googleMapsClient = require('@google/maps').createClient({
             key,
             Promise: Promise
         });
     }

     getLocationByAddres(address) {
         return this.googleMapsClient.geocode({ address })
             .asPromise()
             .then(response => response.json.results[0])
             .catch(err => err)
     }
 }

 module.exports = MapsService