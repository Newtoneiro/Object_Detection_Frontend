import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Button } from "react-native";

type RootStackParamList = {
  LandingPage: undefined;
  CameraPage: undefined;
};

type Props = NativeStackScreenProps<
  RootStackParamList,
  "LandingPage",
  "CameraPage"
>;

export default function LandingPage({ navigation }: Props) {
  return (
    <>
      <Text>LandingPage</Text>
      <Button
        title="Camera test"
        onPress={() => navigation.navigate("CameraPage")}
      />
    </>
  );
}
