import { AuthContext } from "../../contexts/Authcontext/AuthContext";
import LoginPage from "../LoginPage/LoginPage";
import Navigator from "../Navigator/Navigator";
import { useContext } from "react";

const AuthGate = () => {
  const AuthCon = useContext(AuthContext);
  return AuthCon.isAuthenticated() ? <Navigator /> : <LoginPage />;
};

export default AuthGate;
