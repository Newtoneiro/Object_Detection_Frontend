import { AuthContext } from "../../contexts/Authcontext/AuthContext";
import Navigator from "../Navigator/Navigator";
import { Text } from "react-native";
import { useContext } from "react";

const AuthGate = () => {
  const AuthCon = useContext(AuthContext);
  return AuthCon.isAuthenticated() ? <Navigator /> : <Text>No</Text>;
};

export default AuthGate;
