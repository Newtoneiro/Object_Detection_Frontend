import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import LoadingOverlay from "../Utils/LoadingOverlay/LoadingOverlay";
import Navigator from "../Navigator/Navigator";
import UnAuthNavigator from "../UnAuthNavigator/UnAuthNavigator";
import { useContext } from "react";

const AuthGate = () => {
  const AuthCon = useContext(AuthContext);

  return AuthCon.isAuthenticated !== null ? (
    AuthCon.isAuthenticated ? (
      <Navigator />
    ) : (
      <UnAuthNavigator />
    )
  ) : (
    <LoadingOverlay />
  );
};

export default AuthGate;
