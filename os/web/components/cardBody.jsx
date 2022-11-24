import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
import randomColor from "randomcolor";
import { heroMap, weaponMap } from "../../imageMap";

export const CardBody = (props) => {
	return (
		<View style={tw`flex h-99 w-69`}>
			{props?.showTextKey === props?.index ? (
				<Text adjustsFontSizeToFit style={tw`text-l font-bold text-center`}>
					{props?.hero?.description}
				</Text>
			) : props.showHeroDetailKey === props.index ? (
				<View style={tw`flex flex-row flex-wrap justify-evenly h-full w-full`}>
					{props?.hero?.abilities?.map((ability, abilityIndex) => (
						<View style={tw`flex h-33 w-23 rounded-xl bg-[${randomColor({ luminosity: "dark" })}]`} key={abilityIndex}>
							<Text adjustsFontSizeToFit style={tw`text-sm font-bold text-white text-center`}>
								{ability?.name}
							</Text>
							<Text adjustsFontSizeToFit style={tw`text-xs text-white text-center`}>
								{`(${weaponMap[ability?.type] ?? ability?.type})`}
							</Text>
							<Image
								source={heroMap[ability?.ability_image]}
								resizeMode="contain"
								style={tw`${ability?.name?.split("").length > 10 ? "h-19 w-19" : "h-23 w-23"} rounded-lg`}
								key={abilityIndex}
							/>
						</View>
					))}
				</View>
			) : (
				<Image source={heroMap[props?.hero?.hero_image]} resizeMode="contain" style={tw`h-full w-full rounded-lg`} key={props?.index} />
			)}
		</View>
	);
};
