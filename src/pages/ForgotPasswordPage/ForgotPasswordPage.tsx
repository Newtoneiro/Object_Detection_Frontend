import { Pressable, Text, View } from "react-native";

import Background from "../../components/Utils/Background/Background";
import CrossedFooter from "../../components/Utils/CrossedFooter/CrossedFooter";
import { FontAwesome } from "@expo/vector-icons";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext/ForgotPasswordContext";
import { ForgotPasswordPageProps } from "./ForgotPasswordPage.types";
import GradientButton from "../../components/Utils/GradientButton/GradientButton";
import LoadingOverlay from "../../components/Utils/LoadingOverlay/LoadingOverlay";
import UserInput from "../../components/Utils/UserInput/UserInput";
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
            size={stylesConfig.fontSize.title_icon}
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
          <UserInput
            value={ForgotPasswordCon.email}
            changeValue={ForgotPasswordCon.setEmail}
            options={{
              isSecret: false,
              isAlert: !ForgotPasswordCon.response.success,
              icon: null,
              placeholder: "Email",
            }}
          />
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
                size={stylesConfig.fontSize.big_regular}
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
