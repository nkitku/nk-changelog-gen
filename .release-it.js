const { gitRawCommitsFormat } = require('./src/git-raw-format');

module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
    requireCleanWorkingDir: true,
  },
  github: { release: true },
  npm: { publish: false },
  plugins: {
    '@release-it/conventional-changelog': {
      options: {
        config: require('./conventional-changelog-nk'),
        infile: 'CHANGELOG.md',
      },
      context: {},
      gitRawCommitsOpts: { format: gitRawCommitsFormat },
    },
  },
};
