const placesToCoords = require('./places-to-coords');

placesToCoords([
  '1600 Amphitheatre Parkway, Mountain View, CA',
  'New York, NY',
  'Arlington, Virginia',
  'Dubai',
  'Canada',
  'Paris, France',
  'Cold Spring, NY'
], (err, data) => {
  console.log('ONE RESPONSE:', require('util').inspect(data, { colors: true }))
}).then(responses => {
  console.log('ALL RESPONSES\n', require('util').inspect(responses, { colors: true }));
});
