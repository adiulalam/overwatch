import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Platform,
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import Carousel from "react-native-snap-carousel";
import { useRef } from "react";
import tw from "twrnc";
import { Web } from "./os/web/web";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const isCarousel = useRef(null);

  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

  const cardsData = [
    {
      name: "Ana",
      src: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/76/Ana.png",
    },
    {
      name: "Ashe",
      src: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4f/Ashe-portrait.png",
    },
    {
      name: "Baptiste",
      src: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/01/Baptiste-portrait.png",
    },
    {
      name: "Bastion",
      src: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d0/Bastion-portrait.png",
    },
  ];

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={tw`flex-1`} key={index}>
        <Text style={tw`text-3xl font-bold text-center`}>{item.name}</Text>

        <View style={tw`flex-1`}>
          <Pressable
            onPress={() => alert("Pressed!")}
            style={({ pressed }) =>
              tw`p-10 rounded-lg ${pressed ? "bg-slate-200" : "bg-white"}`
            }
          >
            <Image
              source={{
                uri: item.src,
              }}
              resizeMode="contain"
              style={tw`w-full h-full`}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return Platform.OS === "web" ? (
    <ScrollView>
      <Web />
    </ScrollView>
  ) : (
    <>
      <StatusBar hidden />
      <Carousel
        layout="default"
        // layoutCardOffset={9}
        ref={isCarousel}
        data={cardsData}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardContainer: {
//     width: "92%",
//     height: "70%",
//   },
//   card: {
//     width: "100%",
//     height: "100%",
//     shadowColor: "#000000",
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.07,
//     shadowRadius: 3.3,
//   },
//   cardImg: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 13,
//   },
// });
