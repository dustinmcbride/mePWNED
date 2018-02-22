# mePWNED

## Summary
A CLI for Troy Hunt's "Pwned Passwords" API. This utility will tell you if your password appears in the "Pwned Passwords" database
For more info see https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/

## Usage
```
npm start
```

## Security
Your password is not stored or sent over the network.  Your password is first hashed and then the api is queried 
with only the first 5 characters of the hash. The api returns all hashes in the database starting with those 5 characters. 
Your hashed password is then matched to the results if it exists.

For more info see https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/
