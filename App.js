import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MoviesScreen from "./screens/MoviesScreen";
import SearchScreen from "./screens/SearchScreen";
import TvScreen from "./screens/TvScreen";
import DetailsScreen from "./screens/DetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarIndicatorStyle: { backgroundColor: "black" },
      tabBarLabelStyle: { fontSize: 14 },
      tabBarStyle: { backgroundColor: "#fff" },
    }}
  >
    <Tab.Screen name="Movies" component={MoviesScreen} />
    <Tab.Screen name="Search Results" component={SearchScreen} />
    <Tab.Screen name="TV Shows" component={TvScreen} />
  </Tab.Navigator>
);

export default function App() {
  console.log("ok");

  return (
    // <SafeAreaProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "Movies App",
            headerStyle: { backgroundColor: "#000" },
            headerTitleStyle: { color: "#fff" },
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen name="Back to List" component={MainTabs} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({
              title: route.params?.title || "",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { color: "#000" },
              headerBackTitle: "Back to List",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
