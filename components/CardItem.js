import {
  Button,
  Card,
  IconButton,
  MD3Colors,
  Text,
  TouchableRipple,
  Snackbar,
} from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorities } from "../redux/data/dataSlice";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardItem({ item, navigation }) {
  const { name, plantId } = item;

  const dispatch = useDispatch();

  const { favList } = useSelector((state) => state.data);

  const [like, setLike] = useState(
    favList.find((i) => i.name === name) ? true : false
  );

  useEffect(() => {
    setLike(favList.find((i) => i.name === name) ? true : false);
  }, [favList]);

  const handleAddToFav = async () => {
    dispatch(toggleFavorities(item));
    await AsyncStorage.setItem("items", JSON.stringify(favList));
    const items = await AsyncStorage.getItem("items");
    console.log("items", items);
  };
  // const handleAddToFav = async () => {
  //   await dispatch(toggleFavorities(item));
  //   await AsyncStorage.setItem("items", JSON.stringify(favList));
  //   const updatedFavList =
  //     JSON.parse(await AsyncStorage.getItem("items")) || [];
  //   setLike(updatedFavList.find((i) => i.name === name) ? true : false);
  // };

  const handleNavDetail = async () => {
    navigation.navigate("detail", {
      name,
      plantId,
      like,
      imgUrl:
        "https://images.unsplash.com/photo-1682695796795-cc287af78a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    });
  };

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showSnackbar = () => {
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };
  return (
    <TouchableRipple onPress={handleNavDetail} rippleColor="rgba(0, 0, 0, 0.1)">
      <Card mode="Elevated">
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: "https://images.unsplash.com/photo-1682695796795-cc287af78a2b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          }}
        />
        <View>
          <Card.Content style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text variant="titleLarge" style={styles.nameText}>
                {name}
              </Text>
              <Text variant="titleLarge" style={styles.priceText}>
                {plantId}
              </Text>
            </View>
            <Card.Actions style={styles.actionsContainer}>
              <IconButton
                icon={`${like ? "heart" : "heart-outline"}`}
                iconColor={MD3Colors.error50}
                size={20}
                onPress={() => {
                  handleAddToFav();
                  showSnackbar(); // Hiển thị Snackbar khi nhấn nút heart
                }}
              />
            </Card.Actions>
          </Card.Content>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={hideSnackbar}
            duration={3000} // Thời gian hiển thị của Snackbar (3 giây)
            action={{
              label: "Dismiss",
              onPress: () => {
                // Hành động khi nhấn nút "Dismiss" trên Snackbar
                hideSnackbar();
              },
            }}
            style={styles.snackbar} // Thêm kiểu cho Snackbar
          >
            {like ? "Add successfully" : "Remove successfully"}
          </Snackbar>
        </View>
      </Card>
    </TouchableRipple>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 8,
  },
  cardCover: {
    resizeMode: "cover",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  priceText: {
    fontSize: 16,
  },
  actionsContainer: {
    marginLeft: 10,
  },
});
