import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput, View } from "react-native";

import { useEffect, useState } from "react";

import config from "../../config";
import mainPageStyles from "./MainPageStyles";

interface message {
  title: String;
  text: String;
}

const displayMessage = (message: message) => {
  return (
    <View style={mainPageStyles.messageContainer}>
      <Text style={mainPageStyles.title}>{message.title}</Text>
      <Text>{message.text}</Text>
    </View>
  );
};

export default function MainPage({ navigation }) {
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

  return (
    <View style={mainPageStyles.container}>
      {initialMessage &&
        displayMessage({ text: initialMessage, title: "Initial Message" })}
      <View style={mainPageStyles.form}>
        <Text>Please enter input text!</Text>
        <TextInput
          style={mainPageStyles.textInput}
          value={text}
          onChangeText={(text) => setText(text)}
          placeholder={"Your input."}
        />
        <Button title="Send!" onPress={() => sendData(text)} />
      </View>
      {backendMessage &&
        displayMessage({ text: backendMessage, title: "Backend Message" })}
      <StatusBar style="auto" />
      <Button
        title="Camera test"
        onPress={() => navigation.navigate("Camera")}
      />
    </View>
  );
}
