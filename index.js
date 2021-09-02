#!/usr/bin/env node

const fs = require("fs");
const prettyBytes = require("pretty-bytes");
const sharp = require("sharp");

if (process.argv.length !== 4) {
  console.error("usage: bespoke file.jpg name");
  process.exit(0);
}

const inputBuffer = fs.readFileSync(process.argv[2]);
const name = process.argv[3];
const today = new Date();

const prefix = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today
  .getDate()
  .toString()
  .padStart(2, "0")}-${name}`;

(async function() {
  for (let res of [2880]) {
    const jpgOutputFilename = `${prefix}.jpg`;
    const webpOutputFilename = `${prefix}.webp`;

    await sharp(inputBuffer)
      .resize(res)
      .toFile(jpgOutputFilename);

    await sharp(inputBuffer)
      .resize(res)
      .toFile(webpOutputFilename);

    console.log(
      `${res}x webp ${prettyBytes(
        fs.readFileSync(webpOutputFilename).byteLength
      )}`
    );

    console.log(
      `${res}x jpg ${prettyBytes(
        fs.readFileSync(jpgOutputFilename).byteLength
      )}`
    );
  }
})();
