import { Pressable, Text, TextInput, View } from "react-native";

import Background from "../../components/Utils/Background/Background";
import CrossedFooter from "../../components/Utils/CrossedFooter/CrossedFooter";
import { FontAwesome } from "@expo/vector-icons";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext/ForgotPasswordContext";
import { ForgotPasswordPageProps } from "./ForgotPasswordPage.types";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import LoadingOverlay from "../../components/Utils/LoadingOverlay/LoadingOverlay";
import { forgotPasswordPageStyles } from "./ForgotPasswordPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

const ForgotPasswordPage = ({ navigation }: ForgotPasswordPageProps) => {
  const ForgotPasswordCon = useContext(ForgotPasswordContext);

  return (
    <Background handlePressFunction={() => navigation.navigate("LoginPage")}>
      {ForgotPasswordCon.loading && <LoadingOverlay />}
      <View style={forgotPasswordPageStyles.container}>
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
                    ...forgotPasswordPageStyles.alertMessageGreen,
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
          <GradientButton
            handlePressFunction={ForgotPasswordCon.handleSubmitData}
          >
            <Text style={forgotPasswordPageStyles.buttonText}>
              Reset password
            </Text>
          </GradientButton>
          <CrossedFooter>
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
          </CrossedFooter>
        </View>
      </View>
    </Background>
  );
};

export default ForgotPasswordPage;
