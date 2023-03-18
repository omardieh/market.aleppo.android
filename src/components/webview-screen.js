import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  BackHandler,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import Loader from "./loader";
import { LOADING_IMAGE } from "../config";

export default function WebviewScreen({
  CACHE_ENABLED,
  PRIMARY_COLOR,
  WEBSITE_URL,
}) {
  const [state, setState] = useState({
    isPullToRefreshEnabled: false,
    scrollViewHeight: 0,
    loading: true,
    navState: {},
  });
  const { scrollViewHeight, isPullToRefreshEnabled, loading, navState } = state;

  const webViewRef = useRef(null);

  useEffect(() => {
    let backHandler;
    if (navState.canGoBack) {
      backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }
  }, [navState.canGoBack]);

  console.log(navState.canGoBack);

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  const onScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 6) {
      setState((state) => ({
        ...state,
        isPullToRefreshEnabled: false,
      }));
    } else if (e.nativeEvent.contentOffset.y <= 6) {
      setState((state) => ({
        ...state,
        isPullToRefreshEnabled: true,
      }));
    }
  };

  const onLoadStart = () => {
    setState((state) => ({ ...state, loading: true }));
  };

  const onLoadEnd = () => {
    setState((state) => ({ ...state, loading: false }));
  };

  const onRefresh = () => {
    onLoadStart();
    webViewRef.current.reload();
  };

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
            onRefresh={onRefresh}
          />
        }
      >
        {loading && (
          <View style={styles.view}>
            <Loader color="olive" image={LOADING_IMAGE} />
          </View>
        )}
        <WebView
          onNavigationStateChange={(navState) =>
            setState((state) => ({ ...state, navState: navState }))
          }
          onScroll={onScroll}
          ref={webViewRef}
          bounce={false}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
          originWhiteList={["*"]}
          style={{
            flex: 1,
            height: scrollViewHeight,
          }}
          useWebKit={true}
          cacheEnabled={CACHE_ENABLED}
          renderError={(e) => console.log(e)}
          source={{ uri: WEBSITE_URL }}
          javaScriptEnabled={true}
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
