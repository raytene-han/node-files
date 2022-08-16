'use strict';

const axios = require('axios');

const fsP = require('fs/promises');

/** Accepts a file path and prints the contents. */
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

/** Accepts a URL and prints the URL contents. */
async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

// call the functions
const argv = process.argv;
const path = argv[2];
if (path.startsWith('http')) {
  webCat(path);
} else {
  cat(path);
}