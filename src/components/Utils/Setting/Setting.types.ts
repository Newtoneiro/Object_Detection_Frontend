import { MaterialIcons } from "@expo/vector-icons";

export type ISettingsProps<T> = {
  value: T;
  name: string;
  possibleValues: T[];
  handleChangeValue: (_: T) => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
};
