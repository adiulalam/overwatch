import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebVersion } from "./os/web/web";
import { PhoneMain } from "./os/phone/data/main";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

NativeWindStyleSheet.setOutput({
	default: "native",
});

const Stack = createStackNavigator();

export default function App() {
	return Platform.OS === "web" ? (
		// <WebVersion />
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={WebVersion} />
			</Stack.Navigator>
		</NavigationContainer>
	) : (
		<PhoneMain />
	);
}
