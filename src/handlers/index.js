export const handleBackPress = (webViewRef) => {
  if (webViewRef.current) {
    webViewRef.current.goBack();
    return true;
  } else {
    return false;
  }
};

export const onScroll = (e, setState) => {
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

export const onRefresh = (webViewRef, setState) => {
  webViewRef.current.reload();
  setState((state) => ({
    ...state,
    navState: { ...state.navState, loading: true },
  }));
};
