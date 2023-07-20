import { IDetectedRectangleProps } from "./DetectedRectangle.types";
import { View } from "react-native";
import { detectedRectangleStyles } from "./DetectedRectangle.styles";
import { useState } from "react";

const DetectedRectangle = ({
  init_x,
  init_y,
  init_width,
  init_height,
}: IDetectedRectangleProps) => {
  const [x, setX] = useState<number>(init_x);
  const [y, setY] = useState<number>(init_y);
  const [width, setWidth] = useState<number>(init_width);
  const [height, setHeight] = useState<number>(init_height);
  return (
    <View
      style={{
        ...detectedRectangleStyles.container,
        top: `${y * 100}%`,
        right: `${x * 100}%`,
        width: 100,
        height: 100,
      }}
    ></View>
  );
};

export default DetectedRectangle;
