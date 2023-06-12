import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Platform,
} from "react-native";

// import { RNCamera } from "react-native-camera";

import config from "./config";
import { useEffect, useState } from "react";

const displayMessage = (message: message) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.title}>{message.title}</Text>
      <Text>{message.text}</Text>
    </View>
  );
};

export default function App() {
  const [text, setText] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  const sendData = async (text: String) => {
    const response = await fetch(config.api_path + "/sampleResponse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: text,
      }),
    });
    response.json().then((text) => {
      setText("");
      setBackendMessage(text.response);
    });
  };

  useEffect(() => {
    fetch(config.api_path + "/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setInitialMessage(response.response));
  }, []);

  // useEffect(() => {
  //   const requestCameraPermission = async () => {
  //     if (Platform.OS == "android") {
  //       const permissionAndroid = await PermissionsAndroid.check(
  //         "android.permission.CAMERA"
  //       );
  //       if (!permissionAndroid) {
  //         try {
  //           const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.CAMERA,
  //             {
  //               title: "Asking for camera permission.",
  //               message: "ObjectDetection needs your permission to record.",
  //               buttonNeutral: "Ask Me Later",
  //               buttonNegative: "Cancel",
  //               buttonPositive: "OK",
  //             }
  //           );
  //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //             console.log("You can use the camera");
  //           } else {
  //             console.log("Camera permission denied");
  //           }
  //         } catch (err) {
  //           console.warn(err);
  //         }
  //       } else {
  //         console.log("Camera permissions already granted.");
  //       }
  //     }
  //   };

  //   requestCameraPermission();
  // }, []);

  return (
    <View style={styles.container}>
      {initialMessage &&
        displayMessage({ text: initialMessage, title: "Initial Message" })}
      <View style={styles.form}>
        <Text>Please enter input text!</Text>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={"Your input."}
        />
        <Button title="Send!" onPress={() => sendData(text)} />
      </View>
      {backendMessage &&
        displayMessage({ text: backendMessage, title: "Backend Message" })}
      {/* <RNCamera
        // ref={(ref) => {
        //   this.camera = ref;
        // }}
        style={{ flex: 1 }}
        flashMode={RNCamera.Constants.FlashMode.off}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      ></RNCamera> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: config.colors.default_background_light,
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
    padding: 20,
  },
  form: {
    flex: 1,
    maxHeight: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  textInput: {
    backgroundColor: config.colors.default_background_dark,
    width: 200,
    height: 40,
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
    maxHeight: 200,
    width: "100%",
    backgroundColor: config.colors.default_background_light,
    alignItems: "center",
    justifyContent: "space-evenly",

    borderColor: config.colors.default_color,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
});

interface message {
  title: String;
  text: String;
}
