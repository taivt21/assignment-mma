import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, IconButton, MD3Colors } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorities } from "../redux/data/dataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailScreen = ({ navigation, route }) => {
  const { name, plantId, like, imgUrl } = route.params;
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(like ? true : false);

  const { favList } = useSelector((state) => state.data);

  const handleAddToFav = async () => {
    try {
      dispatch(
        toggleFavorities({
          name: route.params.name,
          plantId: route.params.plantId,
        })
      );
      setIsLike(!isLike);

      await AsyncStorage.setItem("items", JSON.stringify(favList));
      const items = await AsyncStorage.getItem("items");
      console.log("items", items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()}>Back</Button>
      <Text>{name}</Text>
      <Text>{plantId}</Text>
      <IconButton
        icon={`${isLike ? "heart" : "heart-outline"}`}
        iconColor={MD3Colors.error50}
        size={20}
        onPress={handleAddToFav}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
