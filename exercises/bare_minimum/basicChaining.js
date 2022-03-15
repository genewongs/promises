/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = require('fs');
var request = require('needle');
const URL = 'https://api.github.com/user';
const { pluckFirstLineFromFileAsync } = require('./promiseConstructor');
const { getGitHubProfileAsync } = require('./promisification');

// Promise.promisifyAll(fs);

// const test = function test(readFilePath, writeFilePath) {
//   fs.promises.readFile(readFilePath, 'utf8')
//     .then(data => data.split('\n')[0])
//     .then(username => fetch(`https://api.github.com/users/${username}`))
//     .then(res => res.json())
//     .then(data => fs.promises.writeFile(writeFilePath, JSON.stringify(data)))
//   ;
// };

// const writeFile = Promise.promisify(require("fs").writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then(user => getGitHubProfileAsync(user))
    .then(body => Promise.promisify(fs.writeFile)(writeFilePath, JSON.stringify(body)))
    .catch(err => console.log('error reading file', err));

  // read github username from readFilePath
  // get the first line only
  // then, send a req to github API for user's profile
  // grab your web response and write to the file
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
