import { Pressable, Text, TextInput, View } from "react-native";

import Background from "../../components/Utils/Background/Background";
import CrossedFooter from "../../components/Utils/CrossedFooter/CrossedFooter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import LoadingOverlay from "../../components/Utils/LoadingOverlay/LoadingOverlay";
import { LoginContext } from "../../contexts/LoginContext/LoginContext";
import { LoginPageProps } from "./LoginPage.types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { loginPageStyles } from "./LoginPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

const LoginPage = ({ navigation }: LoginPageProps) => {
  const LoginCon = useContext(LoginContext);

  return (
    <Background handlePressFunction={() => navigation.navigate("WelcomePage")}>
      {LoginCon.loading && <LoadingOverlay />}
      <View style={loginPageStyles.container}>
        <View style={loginPageStyles.form}>
          <Text style={loginPageStyles.formTitle}>
            {LoginCon.isLoginMode ? "Sign in." : "Sign up."}
          </Text>
          <Text style={loginPageStyles.formSubTitle}>
            {LoginCon.isLoginMode
              ? "Please sign in to continue."
              : "Please sign up to continue."}
          </Text>
          <Text style={loginPageStyles.alertMessage}>
            {LoginCon.userInputsAlert.cause}
          </Text>
          <View
            style={
              LoginCon.userInputsAlert.inputsIssue.email
                ? {
                    ...loginPageStyles.inputContainer,
                    ...loginPageStyles.inputContainerAlert,
                  }
                : loginPageStyles.inputContainer
            }
          >
            <FontAwesome
              style={loginPageStyles.icon}
              name="envelope"
              size={24}
            />
            <TextInput
              style={loginPageStyles.textInput}
              placeholder="Email"
              placeholderTextColor={stylesConfig.colors.default_font_subtitle}
              value={LoginCon.userInputs.email}
              onChangeText={(text) => LoginCon.setEmail(text)}
            />
          </View>
          <View
            style={
              LoginCon.userInputsAlert.inputsIssue.password
                ? {
                    ...loginPageStyles.inputContainer,
                    ...loginPageStyles.inputContainerAlert,
                  }
                : loginPageStyles.inputContainer
            }
          >
            <FontAwesome style={loginPageStyles.icon} name="lock" size={30} />
            <TextInput
              style={loginPageStyles.textInput}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={stylesConfig.colors.default_font_subtitle}
              value={LoginCon.userInputs.password}
              onChangeText={(text) => LoginCon.setPassword(text)}
            />
          </View>
          {!LoginCon.isLoginMode && (
            <View
              style={
                LoginCon.userInputsAlert.inputsIssue.confirmPassword
                  ? {
                      ...loginPageStyles.inputContainer,
                      ...loginPageStyles.inputContainerAlert,
                    }
                  : loginPageStyles.inputContainer
              }
            >
              <FontAwesome style={loginPageStyles.icon} name="lock" size={30} />
              <TextInput
                style={loginPageStyles.textInput}
                secureTextEntry={true}
                placeholder="Confirm password"
                placeholderTextColor={stylesConfig.colors.default_font_subtitle}
                value={LoginCon.userInputs.confirmPassword}
                onChangeText={(text) => LoginCon.setConfirmPassword(text)}
              />
            </View>
          )}
          {LoginCon.isLoginMode && (
            <Pressable
              style={loginPageStyles.forgotPasswordFooter}
              onPress={() => navigation.navigate("ForgotPasswordPage")}
            >
              <Text style={loginPageStyles.forgotPasswordText}>
                Forgot password?
              </Text>
            </Pressable>
          )}
        </View>
        <GradientButton handlePressFunction={LoginCon.handleSubmitData}>
          <Text style={loginPageStyles.buttonText}>
            {LoginCon.isLoginMode ? "Sign in" : "Sign up"}
          </Text>
        </GradientButton>
        <CrossedFooter>
          <Text style={loginPageStyles.socialMediaTitle}>Or</Text>
        </CrossedFooter>
        <View style={loginPageStyles.socialMedia}>
          <Pressable
            onPress={() => LoginCon.loginGoogle()}
            style={loginPageStyles.socialMediaContainer}
          >
            <FontAwesome
              style={loginPageStyles.socialMediaIcon}
              name="google"
              size={30}
            />
            <Text style={loginPageStyles.socialMediaText}>
              Sign in with Google
            </Text>
          </Pressable>
          <Pressable
            onPress={() => LoginCon.loginAnonymous()}
            style={loginPageStyles.socialMediaContainer}
          >
            <MaterialCommunityIcons
              style={loginPageStyles.socialMediaIcon}
              name="incognito"
              size={30}
            />
            <Text style={loginPageStyles.socialMediaText}>
              Sign in anonymously
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={loginPageStyles.footer}
          onPress={() => LoginCon.switchLoginMode()}
        >
          <Text style={loginPageStyles.footerText}>
            {LoginCon.isLoginMode
              ? "Don't have an account yet?"
              : "Already have an account?"}
          </Text>
          <Text style={loginPageStyles.footerTextBold}>
            {LoginCon.isLoginMode ? "Sign up" : "Log in"}
          </Text>
        </Pressable>
      </View>
    </Background>
  );
};

export default LoginPage;
