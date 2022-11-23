import "react-native-gesture-handler";
import React from "react";
import { WebVersion } from "./web";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const WebMain = () => {
	return (
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
	);
};
