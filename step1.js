'use strict';

const fsP = require('fs/promises');

/** Accepts a file path and prints the contents. */
async function cat(path) {
  try {
    let contents = await fsP.readFile(path, "utf8");
    console.log(contents);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
}

// call the function
const argv = process.argv;
cat(argv[2]);
