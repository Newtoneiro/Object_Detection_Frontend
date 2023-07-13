import { Pressable, TextInput, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { IUserInputProps } from "./UserInput.types";
import stylesConfig from "../../../config.styles";
import { useState } from "react";
import { userInputStyles } from "./UserInput.styles";

const UserInput = ({ value, changeValue, options }: IUserInputProps) => {
  const [visible, setVisible] = useState<boolean>(!options.isSecret);

  return (
    <View
      style={
        options.isAlert
          ? {
              ...userInputStyles.container,
              ...userInputStyles.containerAlert,
            }
          : userInputStyles.container
      }
    >
      {options.icon && (
        <FontAwesome
          style={userInputStyles.icon}
          name={options.icon}
          size={stylesConfig.fontSize.big_regular}
        />
      )}
      <TextInput
        secureTextEntry={!visible}
        style={userInputStyles.textInput}
        placeholder={options.placeholder}
        placeholderTextColor={stylesConfig.colors.default_font_subtitle}
        value={value}
        onChangeText={(text: string) => changeValue(text)}
      />
      {options.isSecret && (
        <Pressable onPress={() => setVisible((prev) => !prev)}>
          <FontAwesome
            style={userInputStyles.visibilityIcon}
            name={visible ? "eye-slash" : "eye"}
            size={stylesConfig.fontSize.regular}
          />
        </Pressable>
      )}
    </View>
  );
};

export default UserInput;