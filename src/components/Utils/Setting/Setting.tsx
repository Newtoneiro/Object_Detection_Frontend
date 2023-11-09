import { Modal, Pressable, Switch, Text, View } from "react-native";

import { ISettingsProps } from "./Setting.types";
import { MaterialIcons } from "@expo/vector-icons";
import { settingStyles } from "./Setting.styles";
import stylesConfig from "../../../config/config.styles";
import { useState } from "react";

function Setting<T>({
  value,
  name,
  possibleValues,
  handleChangeValue,
  icon = "settings",
}: ISettingsProps<T>) {
  const [toggleSetValue, setToggleSetValue] = useState<boolean>(false);

  function isBooleanValue() {
    return typeof value === "boolean";
  }

  return (
    <View style={settingStyles.container}>
      <View style={settingStyles.settingBox}>
        <MaterialIcons
          style={settingStyles.settingIcon}
          name={icon}
          size={stylesConfig.fontSize.title}
        />
        <View style={settingStyles.settingDescription}>
          <Text style={settingStyles.settingName}>{name}</Text>
          <Text style={settingStyles.settingValue}>{String(value)}</Text>
        </View>
        {isBooleanValue() ? (
          <Switch
            style={settingStyles.settingIcon2}
            trackColor={{
              false: stylesConfig.colors.default_font_subtitle,
              true: stylesConfig.colors.default_color_1,
            }}
            thumbColor={stylesConfig.colors.default_font}
            // @ts-ignore
            onValueChange={() => handleChangeValue(!value)}
            value={Boolean(value)}
          />
        ) : (
          <Pressable
            onPress={() => setToggleSetValue((prev) => !prev)}
            style={settingStyles.settingToggleSetValue}
          >
            <MaterialIcons
              style={settingStyles.settingIcon2}
              name={
                toggleSetValue ? "keyboard-arrow-down" : "keyboard-arrow-right"
              }
              size={stylesConfig.fontSize.title}
            ></MaterialIcons>
          </Pressable>
        )}
      </View>
      <Modal
        statusBarTranslucent={true}
        style={settingStyles.changeValueModal}
        animationType="fade"
        visible={toggleSetValue}
        transparent={true}
      >
        <View style={settingStyles.changeValueModalBackground}>
          <View style={settingStyles.changeValueModalBox}>
            <Text style={settingStyles.changeValueModalTitle}>{name}</Text>
            <View style={settingStyles.changeValueModalOptions}>
              {possibleValues.map((optionValue) => {
                return (
                  <Pressable
                    key={String(optionValue)}
                    onPress={() => {
                      handleChangeValue(optionValue);
                      setToggleSetValue(false);
                    }}
                    style={settingStyles.changeValueOption}
                  >
                    <MaterialIcons
                      style={settingStyles.optionIcon}
                      name={
                        optionValue === value
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={stylesConfig.fontSize.subtitle}
                    />
                    <Text style={settingStyles.changeValueOptionText}>
                      {String(optionValue)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default Setting;
