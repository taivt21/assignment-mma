// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as React from "react";

// const AuthContext = React.createContext();

// function AuthProvider(props, children) {
//   const [user, setUser] = React.useState(null);

//   React.useEffect(async () => {
//     const data = await AsyncStorage.getItem("user");
//     if (data) {
//       setUser(data);
//     }
//   }, []);

//   const value = { user, setUser };
//   return (
//     <AuthContext.Provider value={value} {...props}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = React.useContext(AuthContext);
//   if (typeof context === "undefined")
//     throw new Error("useAuth must be use in AuthProvider");
//   return context;
// }

// export { useAuth, AuthProvider };
