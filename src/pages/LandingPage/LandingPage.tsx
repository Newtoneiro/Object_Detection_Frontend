import { Button, Text } from "react-native";

import { AuthContext } from "../../contexts/Authcontext/AuthContext";
import { Props } from "../../components/Navigator/Navigator.types";
import { useContext } from "react";

export default function LandingPage({ navigation }: Props) {
  const AuthCon = useContext(AuthContext);

  return (
    <>
      <Text>LandingPage | Welcome {AuthCon.authState.userInfo.email}</Text>
      <Button
        title="Camera test"
        onPress={() => navigation.navigate("CameraPage")}
      />
      <Button title="Log out" onPress={() => AuthCon.logout()} />
    </>
  );
}
