import { StatusBar } from "expo-status-bar";
import { useRef } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export const PhoneVersion = () => {
  const cardsData = [
    {
      name: "Ana",
      hero_image:
        "https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/76/Ana.png",
      difficulty: 3,
      type: "support",
    },
    {
      name: "Ashe",
      hero_image:
        "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4f/Ashe-portrait.png",
      difficulty: 2,
      type: "damage",
    },
    {
      name: "Baptiste",
      hero_image:
        "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/01/Baptiste-portrait.png",
      difficulty: 1,
      type: "tank",
    },
    {
      name: "Bastion",
      hero_image:
        "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d0/Bastion-portrait.png",
      difficulty: 1,
      type: "damage",
    },
  ];

  const isCarousel = useRef(null);

  const SLIDER_WIDTH = Dimensions.get("window").width;

  const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

  const roleIcon = {
    damage:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1c/New_Damage_Icon.png",
    support:
      "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f7/New_Support_Icon.png",
    tank: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d4/New_Tank_Icon.png",
  };

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={tw`flex-1`} key={index}>
        <Text style={tw`text-3xl font-bold text-center`}>{item.name}</Text>
        <View
          style={tw`flex flex-row flex-wrap justify-around bg-white max-h-full`}
        >
          <Image
            source={{
              uri: roleIcon[item?.type],
            }}
            resizeMode="contain"
            style={tw`w-[${(SLIDER_WIDTH / 100) * 10 + "px"}] h-[${
              (SLIDER_WIDTH / 100) * 10 + "px"
            }]`}
          />
          <View style={tw`flex flex-row justify-around bg-white max-h-full`}>
            {[...Array(item.difficulty)].map((e, i) => (
              <Ionicons
                name="star"
                size={(SLIDER_WIDTH / 100) * 10}
                color="orange"
                key={i}
              />
            ))}
          </View>
        </View>

        <View style={tw`flex-1`}>
          <Pressable
            onPress={() => alert("Pressed!")}
            style={({ pressed }) =>
              tw`p-5 rounded-lg ${pressed ? "bg-slate-200" : "bg-white"}`
            }
          >
            <Image
              source={{
                uri: item.hero_image,
              }}
              resizeMode="contain"
              style={tw`w-full h-full`}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar hidden />
      <Carousel
        layout="default"
        ref={isCarousel}
        data={cardsData}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
        loop={true}
      />
    </>
  );
};
