import { Text } from "react-native";
import { useContext } from "react";

import { AuthContext } from "../../contexts/Authcontext/AuthContext";

import MainPage from "../MainPage/MainPage";

const Router = () => {
  const AuthCon = useContext(AuthContext);
  return AuthCon.isAuthenticated() ? <MainPage /> : <Text>No</Text>;
};

export default Router;
