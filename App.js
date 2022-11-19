import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebVersion } from "./os/web/web";
import { PhoneMain } from "./os/phone/main";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

NativeWindStyleSheet.setOutput({
	default: "native",
});

const Drawer = createDrawerNavigator();

export default function App() {
	return Platform.OS === "web" ? (
		<NavigationContainer theme={DarkTheme}>
			<Drawer.Navigator screenOptions={{ swipeEnabled: true }} initialRouteName="Heroes">
				<Drawer.Screen
					name="Heroes"
					component={WebVersion}
					options={{
						headerTintColor: "white",
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	) : (
		<PhoneMain />
	);
}
