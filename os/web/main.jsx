import "react-native-gesture-handler";
import React from "react";
import { WebVersion } from "./web";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, Image, View } from "react-native";
import tw from "twrnc";

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
						drawerIcon: () => (
							<View>
								<Image
									style={tw`w-[${(Dimensions.get("window").width / 100) * 3}px] h-[${
										(Dimensions.get("window").width / 100) * 3
									}px]`}
									source={require("../../assets/overwatch/icons/heroes_icon.png")}
								/>
							</View>
						),
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
