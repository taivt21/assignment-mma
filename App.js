import * as React from "react";
import { PaperProvider } from "react-native-paper";
import Layout from "./Layout";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Layout />
      </PaperProvider>
    </Provider>
  );
}
