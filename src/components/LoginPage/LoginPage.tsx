import { Image, Pressable, Text, TextInput, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { LoginContext } from "../../contexts/LoginContext/LoginContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { UnAuthProps } from "../UnAuthNavigator/UnAuthNavigator.types";
import { loginPageStyles } from "./LoginPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

const LoginPage = ({ navigation }: UnAuthProps) => {
  const LoginCon = useContext(LoginContext);

  return (
    <SafeAreaView style={loginPageStyles.container}>
      <LinearGradient
        start={{ x: 0.3, y: 0.6 }}
        end={{ x: 0.7, y: 0.2 }}
        colors={[
          stylesConfig.colors.default_color_1,
          stylesConfig.colors.default_color_2,
        ]}
        style={loginPageStyles.decorativeBall}
      />
      <View style={loginPageStyles.header}>
        <Pressable onPress={() => navigation.navigate("WelcomePage")}>
          <FontAwesome
            style={loginPageStyles.returnIcon}
            name="arrow-left"
            size={24}
          />
        </Pressable>
        <Image
          style={loginPageStyles.logo}
          source={require("../../../assets/logo.png")}
        />
      </View>
      <View style={loginPageStyles.form}>
        <Text style={loginPageStyles.formTitle}>
          {LoginCon.isLoginMode ? "Sign in." : "Sign up."}
        </Text>
        <Text style={loginPageStyles.formSubTitle}>
          {LoginCon.isLoginMode
            ? "Please sign in to continue."
            : "Please sign up to continue."}
        </Text>
        <View style={loginPageStyles.gap}></View>
        <View style={loginPageStyles.inputContainer}>
          <FontAwesome style={loginPageStyles.icon} name="envelope" size={24} />
          <TextInput
            style={loginPageStyles.textInput}
            placeholder="Email"
            placeholderTextColor={stylesConfig.colors.default_font_subtitle}
            value={LoginCon.userInputs.email}
            onChangeText={(text) => LoginCon.setEmail(text)}
          />
        </View>
        <View style={loginPageStyles.inputContainer}>
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
          <View style={loginPageStyles.inputContainer}>
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
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[
            stylesConfig.colors.default_color_1,
            stylesConfig.colors.default_color_2,
          ]}
          style={loginPageStyles.button}
        >
          <Pressable>
            <Text style={loginPageStyles.buttonText}>
              {LoginCon.isLoginMode ? "Sign in" : "Sign up"}
            </Text>
          </Pressable>
        </LinearGradient>
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
        <Text style={loginPageStyles.footerText}>
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
