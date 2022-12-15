import { View, Text } from "react-native";

export const AbilitiesScreen = ({ route }) => {
	console.log(route);
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "white" }}>Settings!</Text>
		</View>
	);
};
