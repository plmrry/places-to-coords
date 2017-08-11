# Convert place names to coordinates

## Setup

Create a `.env` file and add a `GOOGLE_MAPS_API_KEY` variable:

```bash
GOOGLE_MAPS_API_KEY=AIz...ezI
```

Install stuff:

```bash
yarn
```

## Example

```bash
node example.js
```

## Usage

Give `places-to-coords` an array of strings and a callback.

The callback will be called **every time** a response is received.

```javascript
const placesToCoords = require('./places-to-coords');
const placeNames = [ 'Germany', 'Arlington, VA', ];
placesToCoords(placeNames, (err, data) => console.log('Got one', data));
```

The callback will include a result of the form:

```javascript
{ 
  address: 'New York, NY',
  location: { 
    lat: 40.7127837, 
    lng: -74.0059413 
  } 
}
```

A Promise will also be returned once all the results are returned:

```javascript
const placesToCoords = require('./places-to-coords');
const placeNames = [ 'Germany', 'Arlington, VA', ];
placesToCoords(placeNames)
  .then(results => {
    console.log("We're all done here.", results);
  });
```

**Note:** The order of responses will not match the order of addresses in the array.