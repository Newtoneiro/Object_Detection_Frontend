import { Button, Text } from "react-native";

import { Props } from "../../components/Navigator/Navigator.types";

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
