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
const placeNames = [ 'Germany', 'Arlington, VA' ];
const callback = (err, data) => console.log('Got one.', data)
placesToCoords(placeNames, callback);
```

The response data will look like this:

```javascript
{ 
  address: 'New York, NY',
  location: { 
    lat: 40.7127837, 
    lng: -74.0059413 
  } 
}
```

A Promise is also returned once all the results are collected:

```javascript
const placesToCoords = require('./places-to-coords');
const placeNames = [ 'Germany', 'Arlington, VA', ];
placesToCoords(placeNames)
  .then(results => {
    console.log("We're all done here.", results);
  });
```

**Note:** The order of responses will not match the order of addresses in the array.
