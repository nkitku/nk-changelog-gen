module.exports = {
  git: {
    commitMessage: 'chore: release v${version}',
    requireCleanWorkingDir: true,
  },
  github: { release: true },
  npm: { publish: false },
  plugins: {
    '@release-it/conventional-changelog': {
      config: require('./conventional-changelog-nk'),
      infile: 'CHANGELOG.md',
    },
  },
};
