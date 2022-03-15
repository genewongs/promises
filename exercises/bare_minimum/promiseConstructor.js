/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');
const path = require('path');

// This function should retrieve the first line of the file at `filePath`
const pluckFirstLineFromFileAsync = filePath =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (err, fileName) => err
      ? reject(err)
      : resolve(fileName.split('\n')[0])
    )
  );

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.statusCode);
      }
    });
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
