export default {
  expo: {
    slug: "aleppomarket",
    extra: {
      eas: {
        projectId: "5498de54-f9bc-4b65-bc5b-f04c1ee8a627",
      },
    },
    name: "Aleppo Market",
    slug: "aleppomarket",
    version: "2.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
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
  },
};
