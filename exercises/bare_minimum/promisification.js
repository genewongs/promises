/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */

const fs = require('fs');
const request = require('needle');
const crypto = require('crypto');
const Promise = require('bluebird');

// (1) Asyncronous HTTP request
const getGitHubProfile = function(user, callback) {
  const url = 'https://api.github.com/users/' + user;
  const options = {
    headers: { 'User-Agent': 'request' },
  };

  request.get(url, options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(
        new Error('Failed to get GitHub profile: ' + body.message),
        null
      );
    } else {
      callback(null, body);
    }
  });
};

const getGitHubProfileAsync = Promise.promisify(getGitHubProfile);

// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

const generateRandomTokenAsync = Promise.promisify(generateRandomToken);

// (3) Asyncronous file manipulation
const readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }

    const funnyFile = file.split('\n')
      .map(line => line + ' lol')
      .join('\n');

    callback(null, funnyFile);
  });
};

const readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
