{
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "production": {
      "plugins": ["transform-remove-console", "transform-react-remove-prop-types", "@babel/plugin-transform-react-inline-elements"],
    }
  },
  "sourceMaps": true
}