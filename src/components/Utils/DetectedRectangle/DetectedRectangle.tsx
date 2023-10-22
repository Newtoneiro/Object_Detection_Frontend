import { Text, View } from "react-native";

import { IPrediction } from "../../../contexts/CameraContext/CameraContext.types";
import { detectedRectangleStyles } from "./DetectedRectangle.styles";
import { useState } from "react";

const DetectedRectangle = ({
  name,
  confidence,
  box,
  distance = null,
}: IPrediction) => {
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
        <Text style={detectedRectangleStyles.text}>{`${name}: ${(
          confidence * 100
        ).toFixed(2)}%`}</Text>
        {distance && (
          <Text style={detectedRectangleStyles.text}>
            {`dist: ${distance.toFixed(2)}m`}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DetectedRectangle;
