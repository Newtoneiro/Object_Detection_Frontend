import { ColorValue } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../components/Navigator/Navigator.types";

export type DashboardPageProps = NativeStackScreenProps<
  RootStackParamList,
  "DashboardPage"
>;

export type GridItemProp = {
  page: keyof RootStackParamList;
  name: String;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: ColorValue;
  isProtected?: boolean;
};
