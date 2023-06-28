import { createSlice } from "@reduxjs/toolkit";
import { flower_data, plant_data } from "../../dummydata";

const initialState = {
  favList: [],
  data: plant_data,
  loading: false,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleFavorities: (state, { payload }) => {
      const existIndex = state.favList.findIndex(
        (i) => i.name === payload.name
      );
      if (existIndex >= 0) {
        state.favList = state.favList.filter((i) => i.name !== payload.name);
      } else {
        state.favList.push({
          name: payload.name,
          plantId: payload.plantId,
        });
      }
    },
    setItem: (state, { payload }) => {
      state.favList = payload;
    },
    clear: (state) => {
      state.favList = [];
      // await AsyncStorage.clear();
    },
  },
});

export const { addItem, deleteItem, toggleFavorities, clear, setItem } =
  dataSlice.actions;

export default dataSlice.reducer;
