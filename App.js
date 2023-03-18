import React, { useEffect } from "react";
import WebviewScreen from "./src/components/webview-screen";
import OneSignal from "react-native-onesignal";

import {
  CACHE_ENABLED,
  ONE_SIGNAL_APP_ID,
  PRIMARY_COLOR,
  WEBSITE_URL,
} from "./src/config";
import { LogBox } from "react-native";

export default function App() {
  useEffect(() => {
    OneSignal.setAppId(ONE_SIGNAL_APP_ID);
    LogBox.ignoreLogs(["Warning: ..."]);
  }, []);

  return (
    <>
      <WebviewScreen
        CACHE_ENABLED={CACHE_ENABLED}
        PRIMARY_COLOR={PRIMARY_COLOR}
        WEBSITE_URL={WEBSITE_URL}
      />
    </>
  );
}
