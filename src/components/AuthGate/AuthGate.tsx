import { AuthContext } from "../../contexts/Authcontext/AuthContext";
import Navigator from "../Navigator/Navigator";
import UnAuthNavigator from "../UnAuthNavigator/UnAuthNavigator";
import { useContext } from "react";

const AuthGate = () => {
  const AuthCon = useContext(AuthContext);
  return AuthCon.isAuthenticated() ? <Navigator /> : <UnAuthNavigator />;
};

export default AuthGate;
