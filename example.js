const placesToCoords = require('./places-to-coords');

placesToCoords([
  '1600 Amphitheatre Parkway, Mountain View, CA',
  'New York, NY',
  'Arlington, Virginia',
  'Dubai',
  'Canada',
  'Paris, France',
  'Cold Spring, NY'
]).then(responses => {
  console.log('RESPONSE\n', require('util').inspect(responses, { colors: true }));
})
