import { StyleSheet, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate("login")}>Logout</Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
