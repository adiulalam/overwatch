import React from "react";
import { Image, Pressable, View } from "react-native";
import tw from "twrnc";
import { CardHeader } from "./cardHeader";
import { heroMap } from "../../imageMap";
import randomColor from "randomcolor";

export const CarouselCardItem = ({ item, index }, navigation) => {
	return (
		<View style={tw`flex-1`} key={index}>
			<CardHeader {...item} />

			<View style={tw`flex-1 rounded-lg bg-[${randomColor({ luminosity: "light" })}]`}>
				<Pressable
					onPress={() => {
						navigation.navigate("Heroes Detail", {
							item: item,
							index: index,
							name: item.name,
						});
					}}
					// style={({ pressed }) => tw`p-5 rounded-lg ${pressed ? "bg-slate-200" : `bg-[${randomColor({ luminosity: "light" })}]`}`}
				>
					<Image source={heroMap[item?.hero_image]} resizeMode="contain" style={tw`w-full h-full`} />
				</Pressable>
			</View>
		</View>
	);
};
