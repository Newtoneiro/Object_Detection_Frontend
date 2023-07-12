import { Pressable, Text, TextInput, View } from "react-native";

import Background from "../../components/Background/Background";
import { FontAwesome } from "@expo/vector-icons";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext/ForgotPasswordContext";
import { ForgotPasswordPageProps } from "./ForgotPasswordPage.types";
import { LinearGradient } from "expo-linear-gradient";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { forgotPasswordPageStyles } from "./ForgotPasswordPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

const ForgotPasswordPage = ({ navigation }: ForgotPasswordPageProps) => {
  const ForgotPasswordCon = useContext(ForgotPasswordContext);

  return (
    <Background>
      {ForgotPasswordCon.loading && <LoadingOverlay />}
      <View style={forgotPasswordPageStyles.container}>
        <View style={forgotPasswordPageStyles.header}>
          <Pressable
            onPress={() => navigation.navigate("LoginPage")}
            style={forgotPasswordPageStyles.pressable}
          >
            <FontAwesome
              style={forgotPasswordPageStyles.returnIcon}
              name="arrow-left"
              size={24}
            />
          </Pressable>
        </View>
        <View style={forgotPasswordPageStyles.form}>
          <FontAwesome
            style={forgotPasswordPageStyles.titleImage}
            name="unlock"
            size={60}
          />
          <Text style={forgotPasswordPageStyles.formTitle}>
            Forgot password?
          </Text>
          <Text style={forgotPasswordPageStyles.formSubTitle}>
            No worries, we'll send you reset instructions.
          </Text>
          <Text
            style={
              ForgotPasswordCon.response.success
                ? {
                    ...forgotPasswordPageStyles.alertMessage,
                    color: stylesConfig.colors.green_alert,
                  }
                : forgotPasswordPageStyles.alertMessage
            }
          >
            {ForgotPasswordCon.response.message}
          </Text>
          <View style={forgotPasswordPageStyles.inputContainer}>
            <TextInput
              style={forgotPasswordPageStyles.textInput}
              placeholder="Email"
              placeholderTextColor={stylesConfig.colors.default_font_subtitle}
              value={ForgotPasswordCon.email}
              onChangeText={(text) => ForgotPasswordCon.setEmail(text)}
            />
          </View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[
              stylesConfig.colors.default_color_1,
              stylesConfig.colors.default_color_2,
            ]}
            style={forgotPasswordPageStyles.button}
          >
            <Pressable
              onPress={() => ForgotPasswordCon.handleSubmitData()}
              style={forgotPasswordPageStyles.button_pressable}
            >
              <Text style={forgotPasswordPageStyles.buttonText}>
                Reset password
              </Text>
            </Pressable>
          </LinearGradient>
          <View style={forgotPasswordPageStyles.lineboxFooter}>
            <View style={forgotPasswordPageStyles.lineboxFooterLine}></View>
            <Pressable
              onPress={() => navigation.navigate("LoginPage")}
              style={forgotPasswordPageStyles.footer}
            >
              <FontAwesome
                style={forgotPasswordPageStyles.footerIcon}
                name="arrow-left"
                size={24}
              />
              <Text style={forgotPasswordPageStyles.footerText}>
                Back to login
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ForgotPasswordPage;
