import React from "react";
import { Button, Image, Pressable, View } from "react-native";
import tw from "twrnc";
import { CardHeader } from "./cardHeader";

export const CarouselCardItem = ({ item, index }, navigation) => {
	return (
		<View style={tw`flex-1`} key={index}>
			<CardHeader {...item} />

			<View style={tw`flex-1`}>
				<Pressable
					onPress={() => {
						navigation.navigate("Heroes Detail", {
							item: item,
							index: index,
							name: item.name,
						});
					}}
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
		</View>
	);
};
