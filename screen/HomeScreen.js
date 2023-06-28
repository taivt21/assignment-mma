import { StyleSheet, SectionList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoriteScreen from "./FavoriteScreen";
import { Ionicons } from "react-native-vector-icons";
import ProfileScreen from "./ProfileScreen";
import { Text } from "react-native-paper";
import CardItem from "../components/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../redux/data/dataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="name"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Main") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Favorite") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "red",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
});

export default HomeScreen;

function MainScreen({ navigation }) {
  const { favList, data } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("items");

      const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : [];

      dispatch(setItem(parsedValue));
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <CardItem navigation={navigation} item={item} />
        )}
        // renderSectionHeader={({ section: { title } }) => (
        //   <Text
        //     style={{
        //       marginTop: 20,
        //       fontSize: 32,
        //       // backgroundColor: "red",
        //     }}
        //   >
        //     {title}
        //   </Text>
        // )}
      />
    </SafeAreaView>
  );
}
