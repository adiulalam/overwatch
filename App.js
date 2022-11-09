import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const location = "OW2_Dva.png";
  return (
    <>
      <StatusBar hidden />
      <ScrollView>
        <View className="flex flex-row flex-wrap justify-around bg-white max-h-full py-2">
          <View className="bg-amber-500 h-96 w-72 m-2 rounded-xl">
            <Image
              className="object-contain h-full w-full rounded-xl"
              resizeMode="contain"
              source={require(`./assets/overwatch/${location}`)}
            />
          </View>
          <View className="bg-amber-500 h-96 w-72 m-2 rounded-xl"></View>
          <View className="bg-amber-500 h-96 w-72 m-2 rounded-xl"></View>
          <View className="bg-amber-500 h-96 w-72 m-2 rounded-xl"></View>
        </View>
      </ScrollView>
    </>
  );
}
