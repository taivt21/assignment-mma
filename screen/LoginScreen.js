import { View, StyleSheet } from "react-native";
import * as React from "react";
import { Button, TextInput } from "react-native-paper";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={show}
        right={
          <TextInput.Icon
            onPress={() => setShow(!show)}
            icon={show ? "eye-off" : "eye"}
          />
        }
      />
      <Button
        style={{
          marginTop: 10,
          marginHorizontal: 50,
          padding: 5,
        }}
        icon="camera"
        mode="contained"
        onPress={() => navigation.navigate("home")}
      >
        Press me
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  inputText: {
    width: "90%",
    margin: 5,
  },
});

export default LoginScreen;
