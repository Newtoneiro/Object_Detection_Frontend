import { MaterialIcons } from "@expo/vector-icons";

export type IPressableIconsProps = {
  handlePress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  size: number;
};
