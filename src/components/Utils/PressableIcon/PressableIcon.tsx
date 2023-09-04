import { IPressableIconsProps } from "./PressableIcon.types";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { pressableIconStyles } from "./PressableIcon.styles";

function PressableIcon({ handlePress, icon, size }: IPressableIconsProps) {
  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <MaterialIcons style={pressableIconStyles.icon} name={icon} size={size} />
    </TouchableOpacity>
  );
}

export default PressableIcon;
