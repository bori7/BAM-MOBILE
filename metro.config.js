const { getDefaultConfig } = require("@expo/metro-config");
// const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  // const {
  //   resolver: { sourceExts, assetExts },
  // } = await getDefaultConfig(__dirname);

  const defaultConfig = await getDefaultConfig(__dirname);
  const { transformer, resolver } = defaultConfig;

  return {
    transformer: {
      ...transformer,
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...resolver,
      assetExts: [...resolver.assetExts.filter((ext) => ext !== "svg"), 'ttf', 'otf'],
      sourceExts: [...resolver.sourceExts, "svg"],
    },
  };
})();



// const { getDefaultConfig } = require("metro-config")
//
// metroConfig = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig()
//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       assetExts: assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//     },
//   }
// })()

//
// const { getDefaultConfig: getDefaultExpoConfig } = require("@expo/metro-config")
//
// metroConfig = (() => {
//   const config = getDefaultExpoConfig(__dirname)
//
//   const { transformer, resolver } = config
//
//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   }
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourceExts: [...resolver.sourceExts, "svg"],
//   }
//
//   return config
// })()

// const jsoMetroPlugin = require('obfuscator-io-metro-plugin')(
//     {
//       compact: true,
//       sourceMap: false,
//       controlFlowFlattening: true,
//       controlFlowFlatteningThreshold: 0.75,
//       deadCodeInjection: true,
//       deadCodeInjectionThreshold: 0.4,
//       debugProtection: false,
//       debugProtectionInterval: 0,
//       disableConsoleOutput: true,
//       identifierNamesGenerator: 'hexadecimal',
//       log: false,
//       numbersToExpressions: true,
//       renameGlobals: false,
//       selfDefending: true,
//       simplify: true,
//       splitStrings: true,
//       splitStringsChunkLength: 10,
//       stringArray: true,
//       stringArrayEncoding: ['none'],
//       stringArrayIndexShift: true,
//       stringArrayRotate: true,
//       stringArrayShuffle: true,
//       stringArrayWrappersCount: 2,
//       stringArrayWrappersChainedCalls: true,
//       stringArrayWrappersParametersMaxCount: 4,
//       stringArrayWrappersType: 'function',
//       stringArrayThreshold: 0.75,
//       unicodeEscapeSequence: false,
//     },
//     {
//       runInDev: false /* optional */,
//       logObfuscatedFiles: false /* optional generated files will be located at ./.jso */,
//     },
// );

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
//   // ...jsoMetroPlugin,
// };
