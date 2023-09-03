import { DashboardPageProps, GridItemProp } from "./DashboardPage.types";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Background from "../../components/Utils/Background/Background";
import { LinearGradient } from "expo-linear-gradient";
import { dashboardPageStyles } from "./DashboardPage.styles";
import stylesConfig from "../../config.styles";

export default function DashboardPage({ navigation }: DashboardPageProps) {
  const [gridItems, setGridItems] = useState<GridItemProp[]>([]);
  const AuthCon = useContext(AuthContext);

  useEffect(() => {
    const cameraPageGridItem: GridItemProp = {
      page: "CameraPage",
      name: "Picture mode",
      icon: "camera-alt",
      iconColor: "#de0030",
    };
    setGridItems([
      cameraPageGridItem,
      cameraPageGridItem,
      cameraPageGridItem,
      cameraPageGridItem,
      cameraPageGridItem,
      cameraPageGridItem,
      cameraPageGridItem,
    ]);
  }, []);

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
          {gridItems.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={dashboardPageStyles.widgetGridItem}
                onPress={() => navigation.navigate(item.page)}
              >
                <View
                  style={{
                    ...dashboardPageStyles.widgetGridIcon,
                    backgroundColor: item.iconColor.toString() + "15",
                  }}
                >
                  <MaterialIcons
                    style={{ color: item.iconColor, opacity: 1 }}
                    name={item.icon || "circle"}
                    size={stylesConfig.fontSize.subtitle}
                  />
                </View>
                <Text style={dashboardPageStyles.widgetGridItemText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={dashboardPageStyles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("SettingsPage")}>
            <MaterialIcons
              style={dashboardPageStyles.footerButton}
              name="settings"
              size={stylesConfig.fontSize.subtitle}
            />
          </TouchableOpacity>
          <MaterialIcons
            style={dashboardPageStyles.footerButton}
            name="bug-report"
            size={stylesConfig.fontSize.subtitle}
          />
          <MaterialIcons
            style={dashboardPageStyles.footerButton}
            name="bookmark-border"
            size={stylesConfig.fontSize.subtitle}
          />
          <MaterialIcons
            style={dashboardPageStyles.footerButton}
            name="assessment"
            size={stylesConfig.fontSize.subtitle}
          />
        </View>
      </View>
    </Background>
  );
}
