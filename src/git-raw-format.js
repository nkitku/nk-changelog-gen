// set of required data
const gitFormat = {
  '': 'B',
  hash: 'H',
  gitTags: 'd',
  committerDate: 'ci',
  authorName: 'an',
  committerUnix: 'ct',
};

const gitRawCommitsFormat = Object.entries(gitFormat)
  .map(([k, v]) => `-${k}-%n%${v}`)
  .join('%n')
  .replace('--%n', '');

module.exports = { gitRawCommitsFormat };
