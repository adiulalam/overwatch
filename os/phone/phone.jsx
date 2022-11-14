import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Pressable, Text, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export const PhoneVersion = ({ route }) => {
  // console.log(route.params.cardsData);
  const [index, setIndex] = useState(0);

  const cardsData = route.params.cardsData;
  const isCarousel = route.params.isCarousel;
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
            style={tw`w-[${(SLIDER_WIDTH / 100) * 10}px] h-[${
              (SLIDER_WIDTH / 100) * 10
            }px]`}
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
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={cardsData.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 8,
          height: 8,
          borderRadius: 2,
          marginHorizontal: -3,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      />
      {/* <Button
        onPress={() => {
          isCarousel.current.snapToItem(1);
          console.log(isCarousel.current.currentIndex);
          navigation.openDrawer();
        }}
        title="Learn More"
        color="#841584"
      /> */}
    </>
  );
};
