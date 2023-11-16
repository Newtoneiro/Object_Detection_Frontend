/**
 * @file AnimatedLoadingCard.tsx
 * @description AnimatedLoadingCard component.
 */

import { Modal, View, Animated, Text } from "react-native";
import { animatedLoadingCardStyles } from "./AnimatedLoadingCard.styles";
import { useContext, useEffect, useRef } from "react";
import { LoadingContext } from "../../../contexts/LoadingContext/LoadingContext";

const logo = "../../../../assets/logo.png";

/**
 * @component
 *
 * AnimatedLoadingCard component.
 *
 * @description
 *
 * This component is used to display a loading card with a rotating logo.
 * Mainly used for smaller loading times.
 *
 * @returns {JSX.Element} Rendered component.
 *
 * @example
 * // Usage within another component or file:
 * import React from 'react';
 *
 * const SomeComponent = () => {
 *  return (
 *    <>
 *      <AnimatedLoadingCard />
 *    </>
 *  );
 * };
 *
 * @see {@link animatedLoadingCardStyles} for the style object.
 */
const AnimatedLoadingCard = () => {
  const box_rotate = useRef(new Animated.Value(0)).current;
  const inner_box_move = useRef(new Animated.Value(0)).current;

  const LoadingCon = useContext(LoadingContext);

  useEffect(() => {
    const centerBoxAnimation = () => {
      return Animated.sequence([
        Animated.spring(box_rotate, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(inner_box_move, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(box_rotate, {
          toValue: 2,
          useNativeDriver: true,
        }),
        Animated.spring(inner_box_move, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(centerBoxAnimation()).start();
  }, []);

  return (
    <>
      {LoadingCon.displayLoadingCard && (
        <Modal
          animationType="fade"
          statusBarTranslucent={true}
          style={animatedLoadingCardStyles.container}
          transparent={true}
          visible={LoadingCon.displayLoadingCard}
        >
          <View style={animatedLoadingCardStyles.container}>
            <Animated.View
              style={{
                ...animatedLoadingCardStyles.outerLoadingBox,
                transform: [
                  {
                    rotate: box_rotate.interpolate({
                      inputRange: [0, 2],
                      outputRange: ["0deg", "360deg"],
                    }),
                  },
                ],
              }}
            >
              <Animated.Image
                style={{
                  ...animatedLoadingCardStyles.outerLogo,
                  transform: [
                    {
                      rotate: box_rotate.interpolate({
                        inputRange: [0, 2],
                        outputRange: ["0deg", "-360deg"],
                      }),
                    },
                  ],
                }}
                source={require(logo)}
              />
              <Animated.View
                style={{
                  ...animatedLoadingCardStyles.innerLoadingBox,
                  transform: [
                    {
                      translateY: inner_box_move.interpolate({
                        inputRange: [0, 1],
                        outputRange: [
                          0,
                          animatedLoadingCardStyles.outerLoadingBox.height,
                        ],
                      }),
                    },
                  ],
                }}
              >
                <Animated.Image
                  source={require(logo)}
                  style={{
                    ...animatedLoadingCardStyles.innerLogo,
                    transform: [
                      {
                        rotate: box_rotate.interpolate({
                          inputRange: [0, 2],
                          outputRange: ["0deg", "-360deg"],
                        }),
                      },
                    ],
                  }}
                />
              </Animated.View>
            </Animated.View>
            <Text style={animatedLoadingCardStyles.loadingText}>{`${
              LoadingCon.loadingCardText || "loading"
            } . . .`}</Text>
          </View>
        </Modal>
      )}
    </>
  );
};

export default AnimatedLoadingCard;
