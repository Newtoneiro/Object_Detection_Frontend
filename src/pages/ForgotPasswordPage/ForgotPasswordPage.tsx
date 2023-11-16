import { Pressable, Text, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { AlertField } from "../../components/Utils/AlertField/";
import { Background } from "../../components/Utils/Background";
import { CrossedFooter } from "../../components/Utils/CrossedFooter";
import { GradientButton } from "../../components/Utils/GradientButton";
import { UserInput } from "../../components/Utils/UserInput";
import { stylesConfig } from "../../config";
import { ForgotPasswordContext } from "../../contexts/ForgotPasswordContext";
import { forgotPasswordPageStyles } from "./ForgotPasswordPage.styles";
import { ForgotPasswordPageProps } from "./ForgotPasswordPage.types";

const ForgotPasswordPage = ({ navigation }: ForgotPasswordPageProps) => {
  const ForgotPasswordCon = useContext(ForgotPasswordContext);

  return (
    <Background handlePressFunction={() => navigation.navigate("LoginPage")}>
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
          <AlertField
            success={ForgotPasswordCon.response.success}
            text={ForgotPasswordCon.response.message}
          />
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
