import { Text, View } from "react-native";

import { IPrediction } from "../../../contexts/CameraContext/CameraContext.types";
import { detectedRectangleStyles } from "./DetectedRectangle.styles";
import { useState } from "react";

const DetectedRectangle = ({ name, confidence, box }: IPrediction) => {
  const [x, setX] = useState<number>(box.x);
  const [y, setY] = useState<number>(box.y);
  const [width, setWidth] = useState<number>(box.width);
  const [height, setHeight] = useState<number>(box.height);

  return (
    <View
      style={{
        ...detectedRectangleStyles.container,
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }],
      }}
    >
      <View style={detectedRectangleStyles.label}>
        <Text>{name}</Text>
        <Text>{confidence.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default DetectedRectangle;
