const path = require('path');

module.exports = {
  reactNativePath: './node_modules/react-native',
  dependencies: {},
  project: {
    ios: {},
    android: {},
  },
  codegenConfig: {
    ios: {
      outputDirectory: path.resolve(__dirname, 'ios/ReactCodegen/generated'),
      components: [],
    },
    android: {
      outputDirectory: path.resolve(__dirname, 'android/app/src/main/java/com/upkyc/generated'),
      components: [],
      packageName: 'com.upkyc.generated',
    },
  },
};
