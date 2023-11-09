import { IProps } from "../../../config/config.types";
import { View } from "react-native";
import { crossedFooterStyle } from "./CrossedFooter.styles";

const CrossedFooter = ({ children }: IProps) => {
  return (
    <View style={crossedFooterStyle.container}>
      <View style={crossedFooterStyle.line}></View>
      {children && (
        <View style={crossedFooterStyle.childrenBox}>{children}</View>
      )}
    </View>
  );
};

export default CrossedFooter;
