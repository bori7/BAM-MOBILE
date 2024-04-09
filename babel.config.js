module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: './env/.env',
          safe: true,
          allowUndefined: false,
          verbose: false,
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './src/components',
            '@pages': './src/pages',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@navigation': './src/navigation',
            '@shared': './src/shared',
            '@store': './src/store',
            '@services': './src/services',
          },
        },
      ],
    ],
  };
};
