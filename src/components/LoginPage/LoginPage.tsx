import { Text, TextInput, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LoginContext } from "../../contexts/LoginContext/LoginContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginPageStyles } from "./LoginPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

const LoginPage = () => {
  const LoginCon = useContext(LoginContext);

  return (
    <SafeAreaView style={loginPageStyles.container}>
      <View style={loginPageStyles.form}>
        <Text style={loginPageStyles.formTitle}>Welcome back</Text>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome
            style={loginPageStyles.icon}
            name="envelope"
            size={24}
            color={stylesConfig.colors.default_color_1}
          />
          <TextInput
            style={loginPageStyles.textInput}
            placeholder="email"
            value={LoginCon.userInputs.email}
            onChangeText={(text) => LoginCon.setEmail(text)}
          />
        </View>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome
            style={loginPageStyles.icon}
            name="lock"
            size={30}
            color={stylesConfig.colors.default_color_1}
          />
          <TextInput
            style={loginPageStyles.textInput}
            secureTextEntry={true}
            placeholder="password"
            value={LoginCon.userInputs.password}
            onChangeText={(text) => LoginCon.setPassword(text)}
          />
        </View>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome
            style={loginPageStyles.icon}
            name="lock"
            size={30}
            color={stylesConfig.colors.default_color_1}
          />
          <TextInput
            style={loginPageStyles.textInput}
            secureTextEntry={true}
            placeholder="confirm password"
            value={LoginCon.userInputs.confirmPassword}
            onChangeText={(text) => LoginCon.setConfirmPassword(text)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
