export default {
  slug: "aleppomarket",
  android: {
    package: "market.aleppo.apk",
  },
  ios: {
    bundleIdentifier: "market.aleppo.apk",
  },
  plugins: [
    [
      "onesignal-expo-plugin",
      {
        mode: "production",
      },
    ],
  ],
};
