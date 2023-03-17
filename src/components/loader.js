import React, { useState, useEffect } from "react";
import { Animated, Image, View, Text } from "react-native";
import TouchableScale from "./touchable-scale";
import { useStateIfMounted } from "use-state-if-mounted";

const DEFAULT_SIZE = 200;
const INTERVAL = 1000;
const ANIMATION_DURATION = 3000;

export default function Loader({ size, color, image }) {
  const [state, setState] = useStateIfMounted({
    circles: [],
  });

  useEffect(() => {
    timedCircles();
  }, []);

  const timedCircles = () => {
    setInterval(() => {
      addMoreCircles();
    }, INTERVAL);
  };

  const addMoreCircles = () => {
    const SIZE = size || DEFAULT_SIZE;
    animatedA = new Animated.Value(0.2);
    opacityA = new Animated.Value(1);
    const circle = (
      <Animated.View
        style={{
          height: SIZE,
          zIndex: 999,
          width: SIZE,
          position: "absolute",
          borderRadius: SIZE / 2,
          borderColor: color || "red",
          borderWidth: 2,
          backgroundColor: color || "rgba(230,69,121,0.5)",
          opacity: opacityA,
          transform: [
            {
              scale: animatedA,
            },
          ],
        }}
      />
    );

    const { circles } = state;
    circles.push(circle);
    setState({ circles });
    Animated.parallel([
      Animated.timing(animatedA, {
        toValue: 1,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(opacityA, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      circles.shift();
      setState({ circles });
    });
  };

  const onPress = () => {
    addMoreCircles();
    if (onPress) {
      onPress();
    }
  };

  const SIZE = size || DEFAULT_SIZE;
  const IMAGE = image;
  const IMAGE_SIZE = (SIZE / 100) * 30;

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{ height: 300, alignItems: "center", justifyContent: "center" }}
      >
        {state.circles.map((item, index) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
              key={index}
            >
              {item}
            </View>
          );
        })}

        <View style={{ zIndex: 1000, position: "absolute" }}>
          <TouchableScale onPress={() => onPress()}>
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 4.65,
                elevation: 6,
              }}
            >
              <View
                style={{
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: IMAGE_SIZE / 2,
                  borderColor: "#FFF",
                  borderWidth: IMAGE_SIZE / 12,
                  backgroundColor: "#FFF",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    height: "100%",
                    width: "100%",
                    borderColor: "#FFF",
                  }}
                  source={IMAGE}
                  resizeMode={"cover"}
                />
              </View>
            </View>
          </TouchableScale>
        </View>
      </View>
    </View>
  );
}
