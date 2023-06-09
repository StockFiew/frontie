module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};

// (Delete below comments before submission!)
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//   };
// };
// ^ original code
