const conventionalChangelog = require('./conventional-changelog');
const parserOpts = require('./parser-opts');
const recommendedBumpOpts = require('./conventional-recommended-bump');
const writerOpts = require('./writer-opts');

module.exports = Promise.all([
  conventionalChangelog,
  parserOpts,
  recommendedBumpOpts,
  writerOpts,
]).then(
  ([conventionalChangelog, parserOpts, recommendedBumpOpts, writerOpts]) => {
    return {
      conventionalChangelog,
      parserOpts,
      recommendedBumpOpts,
      writerOpts,
    };
  }
);
