import { Image, Pressable, Text, TextInput, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LoginContext } from "../../contexts/LoginContext/LoginContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UnAuthProps } from "../UnAuthNavigator/UnAuthNavigator.types";
import { loginPageStyles } from "./LoginPage.styles";
import { useContext } from "react";

const LoginPage = ({ navigation }: UnAuthProps) => {
  const LoginCon = useContext(LoginContext);

  return (
    <SafeAreaView style={loginPageStyles.container}>
      <Pressable
        style={loginPageStyles.returnIconContainer}
        onPress={() => navigation.navigate("WelcomePage")}
      >
        <FontAwesome
          style={loginPageStyles.returnIcon}
          name="arrow-left"
          size={24}
        />
      </Pressable>
      <View style={loginPageStyles.form}>
        <Image
          style={loginPageStyles.logo}
          source={require("../../../assets/logo.png")}
        />
        <Text style={loginPageStyles.formTitle}>
          {LoginCon.isLoginMode ? "Welcome back" : "Sign up"}
        </Text>
        <Text style={loginPageStyles.formSubTitle}>
          {LoginCon.isLoginMode
            ? "Please sign in to continue."
            : "Please sign up to continue."}
        </Text>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome style={loginPageStyles.icon} name="envelope" size={24} />
          <TextInput
            style={loginPageStyles.textInput}
            placeholder="email"
            value={LoginCon.userInputs.email}
            onChangeText={(text) => LoginCon.setEmail(text)}
          />
        </View>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome style={loginPageStyles.icon} name="lock" size={30} />
          <TextInput
            style={loginPageStyles.textInput}
            secureTextEntry={true}
            placeholder="password"
            value={LoginCon.userInputs.password}
            onChangeText={(text) => LoginCon.setPassword(text)}
          />
        </View>
        {!LoginCon.isLoginMode && (
          <View style={loginPageStyles.inputContainer}>
            <FontAwesome style={loginPageStyles.icon} name="lock" size={30} />
            <TextInput
              style={loginPageStyles.textInput}
              secureTextEntry={true}
              placeholder="confirm password"
              value={LoginCon.userInputs.confirmPassword}
              onChangeText={(text) => LoginCon.setConfirmPassword(text)}
            />
          </View>
        )}
        <Pressable style={loginPageStyles.button}>
          <Text style={loginPageStyles.buttonText}>
            {LoginCon.isLoginMode ? "Log in" : "Sign up"}
          </Text>
        </Pressable>
        <Text style={loginPageStyles.socialMediaTitle}>Or Login with</Text>
        <View style={loginPageStyles.socialMedia}>
          <FontAwesome
            style={loginPageStyles.socialMediaIcon}
            name="google"
            size={30}
          />
          <FontAwesome
            style={loginPageStyles.socialMediaIcon}
            name="facebook"
            size={30}
          />
          <FontAwesome
            style={loginPageStyles.socialMediaIcon}
            name="linkedin"
            size={30}
          />
        </View>
      </View>
      <Pressable
        style={loginPageStyles.footer}
        onPress={() => LoginCon.switchLoginMode()}
      >
        <Text>
          {LoginCon.isLoginMode
            ? "Don't have an account yet?"
            : "Already have an account?"}
        </Text>
        <Text style={loginPageStyles.footerTextBold}>
          {LoginCon.isLoginMode ? "Sign up" : "Log in"}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default LoginPage;
