export default {
  android: {
    package: "eu.alepposhop.apk",
  },
  ios: {
    bundleIdentifier: "eu.alepposhop.apk",
  },
  plugins: [
    [
      "onesignal-expo-plugin",
      {
        mode: "development",
      },
    ],
  ],
};
