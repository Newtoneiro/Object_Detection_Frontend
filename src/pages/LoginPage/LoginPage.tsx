import { Pressable, Text, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useContext } from "react";
import { AlertField } from "../../components/Utils/AlertField";
import { Background } from "../../components/Utils/Background";
import { CrossedFooter } from "../../components/Utils/CrossedFooter";
import { GradientButton } from "../../components/Utils/GradientButton";
import { UserInput } from "../../components/Utils/UserInput";
import { stylesConfig } from "../../config";
import { LoginContext } from "../../contexts/LoginContext";
import { loginPageStyles } from "./LoginPage.styles";
import { LoginPageProps } from "./LoginPage.types";

export const LoginPage = ({ navigation }: LoginPageProps) => {
  const LoginCon = useContext(LoginContext);

  return (
    <Background handlePressFunction={() => navigation.navigate("WelcomePage")}>
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
          <AlertField success={false} text={LoginCon.userInputsAlert.cause} />
          <UserInput
            value={LoginCon.userInputs.email}
            changeValue={LoginCon.setEmail}
            options={{
              isSecret: false,
              isAlert: LoginCon.userInputsAlert.inputsIssue.email,
              icon: "envelope",
              placeholder: "Email",
            }}
          />
          <UserInput
            value={LoginCon.userInputs.password}
            changeValue={LoginCon.setPassword}
            options={{
              isSecret: true,
              isAlert: LoginCon.userInputsAlert.inputsIssue.password,
              icon: "lock",
              placeholder: "Password",
            }}
          />
          {!LoginCon.isLoginMode && (
            <UserInput
              value={LoginCon.userInputs.confirmPassword}
              changeValue={LoginCon.setConfirmPassword}
              options={{
                isSecret: true,
                isAlert: LoginCon.userInputsAlert.inputsIssue.confirmPassword,
                icon: "lock",
                placeholder: "Confirm Password",
              }}
            />
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
              size={stylesConfig.fontSize.subtitle}
            />
            <Text style={loginPageStyles.socialMediaText}>
              Sign in with Google
            </Text>
          </Pressable>
          <Pressable
            onPress={() => LoginCon.loginAnonymous()}
            style={loginPageStyles.socialMediaContainer}
          >
            <FontAwesome
              style={loginPageStyles.socialMediaIcon}
              name="user-secret"
              size={stylesConfig.fontSize.subtitle}
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
