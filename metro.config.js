// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');

const getSourceExts = async () => [
  ...(await getDefaultConfig()).resolver.sourceExts,
  'gql',
];

const getConfig = async () => ({
  ...(process.env.CI === 'true' ? { maxWorkers: 2 } : {}),
  transformer: {
    babelTransformerPath: require.resolve(
      '@bam.tech/react-native-graphql-transformer',
    ),
  },
  resolver: {
    sourceExts: await getSourceExts(),
  },
});

module.exports = getConfig();
