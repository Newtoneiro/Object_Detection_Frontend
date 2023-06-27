import { Text, Button } from "react-native";
import { Props } from "./LandingPage.types";

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
