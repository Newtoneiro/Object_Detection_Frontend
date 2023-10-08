import { Modal, Image, View, Animated } from "react-native";
import { animatedLoadingCardStyles } from "./AnimatedLoadingCard.styles";
import { useEffect, useRef } from "react";

const logo = "../../../../assets/logo.png";

const AnimatedLoadingCard = () => {
  const left_move_x = useRef(new Animated.Value(0)).current;
  const left_move_y = useRef(new Animated.Value(250)).current;
  const left_opacity = useRef(new Animated.Value(0)).current;

  const right_move_x = useRef(new Animated.Value(0)).current;
  const right_move_y = useRef(new Animated.Value(250)).current;
  const right_opacity = useRef(new Animated.Value(0)).current;

  const center_move_y = useRef(new Animated.Value(250)).current;
  const center_opacity = useRef(new Animated.Value(0)).current;
  const center_logo_opacity = useRef(new Animated.Value(0)).current;
  const center_scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const leftBallAnimation = () => {
      return Animated.sequence([
        Animated.parallel([
          Animated.spring(left_opacity, { toValue: 1, useNativeDriver: true }),
          Animated.spring(left_move_y, { toValue: 0, useNativeDriver: true }),
        ]),
        Animated.delay(700),
        Animated.parallel([
          Animated.spring(left_opacity, { toValue: 0, useNativeDriver: true }),
          Animated.spring(left_move_x, {
            toValue: -150,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    const rightBallAnimation = () => {
      return Animated.sequence([
        Animated.delay(500),
        Animated.parallel([
          Animated.spring(right_opacity, { toValue: 1, useNativeDriver: true }),
          Animated.spring(right_move_y, { toValue: 0, useNativeDriver: true }),
        ]),
        Animated.delay(200),
        Animated.parallel([
          Animated.spring(right_opacity, { toValue: 0, useNativeDriver: true }),
          Animated.spring(right_move_x, {
            toValue: 150,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    const centerBallAnimation = () => {
      return Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.spring(center_opacity, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(center_move_y, { toValue: 0, useNativeDriver: true }),
        ]),
        Animated.delay(400),
        Animated.parallel([
          Animated.spring(center_logo_opacity, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.spring(center_scale, {
            toValue: 15,
            useNativeDriver: true,
          }),
        ]),
      ]);
    };

    Animated.loop(
      Animated.parallel([
        leftBallAnimation(),
        rightBallAnimation(),
        centerBallAnimation(),
      ])
    ).start();
  }, []);

  return (
    <Modal
      statusBarTranslucent={true}
      style={animatedLoadingCardStyles.container}
      transparent={true}
      visible={true}
    >
      <View style={animatedLoadingCardStyles.container}>
        <View style={animatedLoadingCardStyles.loadingDots}>
          <Animated.View
            style={{
              ...animatedLoadingCardStyles.loadingDot,
              opacity: left_opacity,
              transform: [
                {
                  translateX: left_move_x,
                },
                {
                  translateY: left_move_y,
                },
              ],
            }}
          />
          <Animated.View
            style={{
              ...animatedLoadingCardStyles.loadingDot,
              ...animatedLoadingCardStyles.logoContainer,
              opacity: center_opacity,
              transform: [
                {
                  translateY: center_move_y,
                },
                {
                  scale: center_scale,
                },
              ],
            }}
          >
            <Image
              style={animatedLoadingCardStyles.logo}
              source={require(logo)}
            />
          </Animated.View>
          <Animated.View
            style={{
              ...animatedLoadingCardStyles.loadingDot,
              opacity: right_opacity,
              transform: [
                {
                  translateX: right_move_x,
                },
                {
                  translateY: right_move_y,
                },
              ],
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AnimatedLoadingCard;
