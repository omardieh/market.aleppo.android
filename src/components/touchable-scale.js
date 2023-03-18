import React, { useState } from "react";
import { Animated, TouchableOpacity } from "react-native";

export default function TouchableScale(props) {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));

  // const handlePressIn = () => {
  //   if (!props.loading) {
  //     Animated.spring(animatedValue, {
  //       toValue: 0.9,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // };

  // const handlePressOut = () => {
  //   Animated.spring(animatedValue, {
  //     toValue: 1,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      // onPressIn={() => handlePressIn()}
      // onPressOut={() => handlePressOut()}
      // onPress={
      //   props.loading
      //     ? () => console.log("button disabled already loading")
      //     : props.onPress
      // }
    >
      <Animated.View {...props} style={[animatedStyle]}>
        {props.children}
      </Animated.View>
    </TouchableOpacity>
  );
}
