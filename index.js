const prompt = require('prompt');
const sha1 = require('sha1');
const got = require('got');
const colors = require('colors');

const uri = 'https://api.pwnedpasswords.com/range/';

console.log(``);
console.log(`Based on Troy Hunt's Pwned Passwords version 2`);
console.log('https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/');
console.log(``);
console.log(`This utility will query the pwnedpasswords api with an abbreviated hash of your password`);
console.log('If your password is in the pwnedpasswords database the api will return how many times it was seen');
console.log(``);
console.log(colors.green(`Your password is not stored and is not sent over the network`));
console.log(``);


const promptOptions = {
  properties: {
    password: {
      description: "Password:",
      hidden: true
    }
  }
};

const buildUriWithHash = hash => {
  return uri + hash.slice(0,5);
};

const getHashes = (hash) => {
  return got(buildUriWithHash(hash));
};

const parseBody = body => {
  return body.split('\r\n').map(a => a.split(':'));
};

const getTimesUsed = (hashes, hashedPassword) => {
  let timesUsed = hashes.get(hashedPassword.slice(5, hashedPassword.length).toUpperCase());
  if (timesUsed) {
    return timesUsed;
  }
  return 0;
};

const createResultsMessage = (timesUsed) => {
  if (timesUsed > 0) {
    return  colors.red(`Your password has been PWNED. It has been seen ${timesUsed} times(s)`);
  }
    return colors.green('Woot, your password does not appear in the database');
};

const getHashesSuccessful = (results, hashedPassword) => {
  let hashes = new Map(parseBody(results.body));
  let timesUsed = getTimesUsed(hashes, hashedPassword);
  console.log(createResultsMessage(timesUsed));
};

const getHashesFail = () => {
  console.log('An Error occurred')
};

const handlePrompt = (error, results) => {

  if (error) {
    return
  }

  let hashedPassword = sha1(results.password);
  results.password = '';

  getHashes(hashedPassword)
    .then((results) => {getHashesSuccessful(results, hashedPassword)})
    .catch(getHashesFail)
};

prompt.message = '';
prompt.delimiter = '';
prompt.get(promptOptions, handlePrompt);


