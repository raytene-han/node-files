'use strict';

const axios = require('axios');

const fsP = require('fs/promises');
const { toNamespacedPath } = require('path');

/** Accepts a file path and prints the contents. */
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    return contents;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

/** Accepts a URL and prints the URL contents. */
async function webCat(url) {
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

/** Writes to a new output.txt */
async function catWrite(path, output) {
  try {
    let content = await cat(path);
    await fsP.writeFile(output, content, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function webCatWrite(url, output) {
  try {
    const content = await webCat(url);
    await fsP.writeFile(output, content, 'utf8');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

// call the functions
const argv = process.argv;
const path = argv[2];
if (path.startsWith('http')) {
  webCat(path);
}
else if (path === '--out') {
  if (argv[4].startsWith('http')) {
    webCatWrite(argv[4], argv[3]);
  } else {
    catWrite(argv[4], argv[3]);
  }
} else {
  cat(path);
}