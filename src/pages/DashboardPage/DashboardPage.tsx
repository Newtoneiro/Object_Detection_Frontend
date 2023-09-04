import { DashboardPageProps, GridItemProp } from "./DashboardPage.types";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Background from "../../components/Utils/Background/Background";
import { ErrorContext } from "../../contexts/ErrorContext/ErrorContext";
import { LinearGradient } from "expo-linear-gradient";
import PressableIcon from "../../components/Utils/PressableIcon/PressableIcon";
import { dashboardPageStyles } from "./DashboardPage.styles";
import stylesConfig from "../../config.styles";
import { useContext } from "react";

export default function DashboardPage({ navigation }: DashboardPageProps) {
  const AuthCon = useContext(AuthContext);
  const ErrorCon = useContext(ErrorContext);

  const DashboardGridItem = ({
    page,
    iconColor,
    icon,
    name,
    isProtected = false,
  }: GridItemProp) => {
    return (
      <TouchableOpacity
        style={dashboardPageStyles.widgetGridItem}
        onPress={() => {
          if (!isProtected || !AuthCon.authState.userInfo?.isAnonymous) {
            navigation.navigate(page);
          } else {
            ErrorCon.displayError(
              "This function is available for registered users only.",
              "notification"
            );
          }
        }}
      >
        {isProtected && AuthCon.authState.userInfo?.isAnonymous && (
          <View style={dashboardPageStyles.widgetGridItemProtected} />
        )}
        <View
          style={{
            ...dashboardPageStyles.widgetGridIcon,
            backgroundColor: iconColor.toString() + "15",
          }}
        >
          <MaterialIcons
            style={{ color: iconColor, opacity: 1 }}
            name={icon || "circle"}
            size={stylesConfig.fontSize.subtitle}
          />
        </View>
        <Text style={dashboardPageStyles.widgetGridItemText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Background handlePressFunction={null}>
      <View style={dashboardPageStyles.container}>
        <View style={dashboardPageStyles.accountDetails}>
          <LinearGradient
            start={{ x: 0.3, y: 0.6 }}
            end={{ x: 0.7, y: 0.2 }}
            colors={[
              stylesConfig.colors.default_color_1,
              stylesConfig.colors.default_color_2,
            ]}
            style={dashboardPageStyles.userIconOuter}
          >
            <View style={dashboardPageStyles.userIconInner}>
              {AuthCon.authState.userInfo?.picture ? (
                <Image
                  style={dashboardPageStyles.userImage}
                  source={{
                    uri: AuthCon.authState.userInfo.picture,
                  }}
                />
              ) : (
                <FontAwesome
                  style={dashboardPageStyles.userIcon}
                  name="user-circle"
                  size={stylesConfig.fontSize.title_icon}
                />
              )}
            </View>
          </LinearGradient>
          <Text style={dashboardPageStyles.username}>
            {AuthCon.authState.userInfo?.isAnonymous
              ? "Anonymous"
              : AuthCon.authState.userInfo?.name}
          </Text>
          <Text style={dashboardPageStyles.userGreeting}>
            {AuthCon.authState.userInfo?.isAnonymous
              ? "Register / Login to fully use the app."
              : "Welcome again!"}
          </Text>
          <TouchableOpacity
            onPress={() => AuthCon.logout()}
            style={dashboardPageStyles.logoutButton}
          >
            <Text style={dashboardPageStyles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={dashboardPageStyles.widgetGrid}
          contentContainerStyle={dashboardPageStyles.widgetGridInner}
        >
          <DashboardGridItem
            page="CameraPage"
            name="Picture mode"
            icon="camera-alt"
            iconColor="#de0030"
          />
          <DashboardGridItem
            page="CameraPage"
            name="Your stats"
            icon="insert-chart"
            iconColor="#a29c1d"
            isProtected={true}
          />
          <DashboardGridItem
            page="CameraPage"
            name="Live mode"
            icon="live-tv"
            iconColor="#8cde18"
            isProtected={true}
          />
          <DashboardGridItem
            page="CameraPage"
            name="Friends"
            icon="groups"
            iconColor="#433beb"
            isProtected={true}
          />
        </ScrollView>
        <View style={dashboardPageStyles.footer}>
          <PressableIcon
            handlePress={() => navigation.navigate("SettingsPage")}
            icon="settings"
            size={stylesConfig.fontSize.subtitle}
          />
          <PressableIcon
            handlePress={() => navigation.navigate("SettingsPage")}
            icon="bug-report"
            size={stylesConfig.fontSize.subtitle}
          />
          <PressableIcon
            handlePress={() => navigation.navigate("SettingsPage")}
            icon="assessment"
            size={stylesConfig.fontSize.subtitle}
          />
          <PressableIcon
            handlePress={() => navigation.navigate("SettingsPage")}
            icon="local-pizza"
            size={stylesConfig.fontSize.subtitle}
          />
        </View>
      </View>
    </Background>
  );
}
