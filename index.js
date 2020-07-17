const fs = require('fs');
const conventionalChangelog = require('conventional-changelog');

const config = require('./conventional-changelog-nk');

// set of required data
const gitFormat = {
  '': 'B',
  hash: 'H',
  gitTags: 'd',
  committerDate: 'ci',
  authorName: 'an',
  committerUnix: 'ct',
};

const format = Object.entries(gitFormat)
  .map(([k, v]) => `-${k}-%n%${v}`)
  .join('%n')
  .replace('--%n', '');

const options = {
  append: false,
  releaseCount: 0,
  skipUnstable: false,
  outputUnreleased: true,
  // lernaPackage: false,
  // tagPrefix: "v",
  config,
};
const changelogStream = conventionalChangelog(options, undefined, {
  format,
}).on('error', function (err) {
  console.error(err.stack);
  // if (true) {

  // } else {
  //   console.error(err.toString());
  // }
  process.exit(1);
});

const inFile = 'CHANGELOG.MD';
const outFile = inFile;
const sameFile = true;
const releaseCount = 0;

function noInputFile() {
  if (outFile) {
    outStream = fs.createWriteStream(outFile);
  } else {
    outStream = process.stdout;
  }

  changelogStream.pipe(outStream);
}

if (inFile && releaseCount !== 0) {
  let readStream = fs.createReadStream(inFile).on('error', function () {
    if (flags.verbose) {
      console.warn('inFile does not exist.');
    }

    if (sameFile) {
      noInputFile();
    }
  });

  if (sameFile) {
    if (options.append) {
      changelogStream.pipe(
        fs.createWriteStream(outFile, {
          flags: 'a',
        })
      );
    } else {
      // let tmp = tempfile();
      // changelogStream
      //   .pipe(addStream(readStream))
      //   .pipe(fs.createWriteStream(tmp))
      //   .on('finish', function () {
      //     fs.createReadStream(tmp).pipe(fs.createWriteStream(outFile));
      //   });
    }
  } else {
    if (outFile) {
      outStream = fs.createWriteStream(outFile);
    } else {
      outStream = process.stdout;
    }

    let stream;

    if (options.append) {
      stream = readStream.pipe(addStream(changelogStream));
    } else {
      stream = changelogStream.pipe(addStream(readStream));
    }

    stream.pipe(outStream);
  }
} else {
  noInputFile();
}
