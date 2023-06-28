import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { clear } from "../redux/data/dataSlice";

const FavoriteScreen = ({ navigation }) => {
  const { favList } = useSelector((state) => state.data);
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setList(favList);
    // console.log(favList, list);
  }, [favList]);

  return (
    <View style={styles.container}>
      <Text>List</Text>

      {list.lenght > 0 ? (
        <>
          <Button
            onPress={async () => {
              await AsyncStorage.removeItem("items");
              dispatch(clear());
            }}
          >
            Clear all
          </Button>

          {list.map((c) => (
            <Text key={c.name + c.plantId}>{c.name}</Text>
          ))}
        </>
      ) : (
        <>
          <Text>No fav</Text>
          <Button onPress={() => navigation.navigate("Main")}>
            Back to home
          </Button>
        </>
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
