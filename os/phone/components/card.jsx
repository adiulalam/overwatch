import React from "react";
import { Button, Dimensions, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

export const CarouselCardItem = ({ item, index }, navigation) => {
	const SLIDER_WIDTH = Dimensions.get("window").width;

	const roleIcon = {
		damage: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1c/New_Damage_Icon.png",
		support: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f7/New_Support_Icon.png",
		tank: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d4/New_Tank_Icon.png",
	};
	return (
		<View style={tw`flex-1`} key={index}>
			<Text style={tw`text-3xl font-bold text-center`}>{item.name}</Text>
			<View style={tw`flex flex-row flex-wrap justify-around bg-white max-h-full`}>
				<Image
					source={{
						uri: roleIcon[item?.type],
					}}
					resizeMode="contain"
					style={tw`w-[${(SLIDER_WIDTH / 100) * 10}px] h-[${(SLIDER_WIDTH / 100) * 10}px]`}
				/>
				<View style={tw`flex flex-row justify-around bg-white max-h-full`}>
					{[...Array(item.difficulty)].map((e, i) => (
						<Ionicons name="star" size={(SLIDER_WIDTH / 100) * 10} color="orange" key={i} />
					))}
				</View>
			</View>

			<View style={tw`flex-1`}>
				<Pressable
					onPress={() => alert("Pressed!")}
					style={({ pressed }) => tw`p-5 rounded-lg ${pressed ? "bg-slate-200" : "bg-white"}`}
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
			<Button
				onPress={() => {
					navigation.navigate("Heroes Detail", {
						item: item,
						index: index,
						name: item.name,
					});
				}}
				title="Learn More"
				color="#841584"
			/>
		</View>
	);
};
