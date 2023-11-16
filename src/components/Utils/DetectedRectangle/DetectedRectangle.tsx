import { Text, View } from "react-native";

import { detectedRectangleStyles } from "./DetectedRectangle.styles";
import { useState, useContext } from "react";
import { IDetectedRectangleProps } from "./DetectedRectangle.types";
import { LocationContext } from "../../../contexts/LocationContext/LocationContext";
import { IDangerLevel } from "../../../contexts/LocationContext/LocationContext.types";
import { stylesConfig } from "../../../config";

const DetectedRectangle = ({
  prediction,
  showDynamicDistance = false,
}: IDetectedRectangleProps) => {
  const [x, setX] = useState<number>(prediction.box.x);
  const [y, setY] = useState<number>(prediction.box.y);
  const [width, setWidth] = useState<number>(prediction.box.width);
  const [height, setHeight] = useState<number>(prediction.box.height);

  const LocationCon = useContext(LocationContext);

  const distanceDanger: IDangerLevel = showDynamicDistance
    ? LocationCon.calculateDangerLevelFromDistance(prediction.distance || 0)
    : "NONE";

  let rectangleColor =
    distanceDanger === "LOW"
      ? stylesConfig.colors.green_alert
      : distanceDanger === "MEDIUM"
      ? stylesConfig.colors.yellow_alert
      : distanceDanger === "HIGH"
      ? stylesConfig.colors.red_alert
      : stylesConfig.colors.default_color_1;

  return (
    <View
      style={{
        ...detectedRectangleStyles.container,
        left: x,
        top: y,
        width: width,
        height: height,
        transform: [{ translateX: -width / 2 }, { translateY: -height / 2 }],
        borderColor: rectangleColor,
      }}
    >
      <View
        style={{
          ...detectedRectangleStyles.label,
          backgroundColor: rectangleColor,
        }}
      >
        <Text style={detectedRectangleStyles.text}>{`${prediction.name}: ${(
          prediction.confidence * 100
        ).toFixed(2)}%`}</Text>
        {prediction.distance && (
          <Text style={detectedRectangleStyles.text}>
            {`dist: ${prediction.distance.toFixed(2)}m`}
          </Text>
        )}
      </View>
    </View>
  );
};

export default DetectedRectangle;
