import { View, Text } from "react-native";
import tw from "twrnc";
import { dimensionsMap } from "../../../imageMap";

export const Label = ({ element }) => {
	return (
		<View style={tw`flex justify-center min-w-28`}>
			<Text
				style={tw`text-white font-bold ${dimensionsMap.lg ? "text-right" : "text-center"} px-4`}
			>{`${element}:`}</Text>
		</View>
	);
};
