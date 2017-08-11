// @ts-check
require('dotenv').config();

// I'm using a DIY composable event emitter. Kind of like an Observable.
const Emitter = require('./emitter');

const throttleWith = (with$, max) => {
  return input$ => {
    const output$ = Emitter();
    const pending = [];
    let active = 0;
    const check = () => {
      if (active < max) {
        const next = pending.pop();
        if (!next) return;
        const { err, data } = next;
        active++;
        output$.callCallbacks(err, data);
      }
    }
    input$.addCallback((err, data) => {
      pending.push({ err, data })
      check();
    });
    with$.addCallback((err, data) => {
      active--;
      check();
    });
    return output$;
  }
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const googleMapsClient = require('@google/maps')
  .createClient({
    key: GOOGLE_MAPS_API_KEY,
    timeout: 1e3
  });

const geocode = (address, callback) => {
  googleMapsClient.geocode({
    address
  }, callback);
}

const geocodeResponse$ = Emitter();

const geocodeRequest$ = Emitter();

geocodeRequest$
  .compose(throttleWith(geocodeResponse$, 1))
  .addCallback((err, address) => {
    geocode(address, (err, data) => {
      const out = null;
      try {
        const location = data.json.results[0].geometry.location;
        const out = {
          address,
          location
        };
        geocodeResponse$.callCallbacks(err, out);
      } catch (err) {
        geocodeResponse$.callCallbacks(err, null);
      }
    })
  });

const fromArray = places => {
  console.log('INPUT\n', require('util').inspect(places, { colors: true }))
  const out = [];
  return new Promise((resolve, reject) => {
    geocodeResponse$
      .addCallback((err, data) => {
        if (err) return reject(err);
        out.push(data);
        if (out.length === places.length) {
          resolve(out);
        }
      });
    places.forEach(place => {
      geocodeRequest$.callCallbacks(null, place)
    });
  })
};

module.exports = fromArray;

