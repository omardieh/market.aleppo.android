import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  BackHandler,
  Dimensions,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import Loader from "./loader";
import { LOADING_IMAGE } from "../config";
import { handleBackPress, onScroll, onRefresh } from "./../handlers";

export default function WebviewScreen({
  CACHE_ENABLED,
  PRIMARY_COLOR,
  WEBSITE_URL,
}) {
  const [state, setState] = useState({
    isPullToRefreshEnabled: false,
    scrollViewHeight: 0,
    navState: {},
  });

  const { scrollViewHeight, isPullToRefreshEnabled, navState } = state;
  const webViewRef = useRef(null);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#212F45");
    let backHandler;
    if (navState.canGoBack) {
      backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
        handleBackPress(webViewRef)
      );
      return () => backHandler.remove();
    }
  }, [navState.canGoBack]);

  return (
    <View style={{ flex: 1, backgroundColor: PRIMARY_COLOR }}>
      <SafeAreaView style={{ flex: 0 }} />
      <ScrollView
        style={{
          flex: 1,
          height: "100%",
        }}
        onLayout={(e) => {
          e.persist();
          setState((state) => ({
            ...state,
            scrollViewHeight: e.nativeEvent.layout.height,
          }));
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            enabled={isPullToRefreshEnabled}
            onRefresh={() => onRefresh(webViewRef, setState)}
          />
        }
      >
        {navState.loading && (
          <View style={styles.view}>
            <Loader color="olive" image={LOADING_IMAGE} />
          </View>
        )}
        <WebView
          startInLoadingState={true}
          onNavigationStateChange={(navState) =>
            setState((state) => ({ ...state, navState: navState }))
          }
          onScroll={(e) => onScroll(e, setState)}
          ref={webViewRef}
          bounce={false}
          originWhitelist={["https://*", "git://*"]}
          style={{
            flex: 1,
            height: scrollViewHeight,
          }}
          useWebKit={true}
          cacheEnabled={CACHE_ENABLED}
          renderError={(e) => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>An error occurred:</Text>
              <Text style={styles.errorText}>{e.nativeEvent.description}</Text>
            </View>
          )}
          source={{ uri: WEBSITE_URL }}
          javaScriptEnabled={true}
          thirdPartyCookiesEnabled={true}
          userAgent={
            "Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36"
          }
          androidHardwareAccelerationDisabled={false}
        />
      </ScrollView>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = {
  view: {
    position: "absolute",
    bottom: 0,
    top: 0,
    zIndex: 9999999,
    minHeight: height,
    minWidth: width,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};
