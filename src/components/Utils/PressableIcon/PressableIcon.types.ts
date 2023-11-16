import { MaterialIcons } from "@expo/vector-icons";

export interface IPressableIconsProps {
  handlePress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  size: number;
}
