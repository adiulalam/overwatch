import "react-native-gesture-handler";
import React from "react";
import { Heroes } from "./heroes";
import { Maps } from "../multi-platform/maps";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, Image, View } from "react-native";
import tw from "twrnc";
import { Admin } from "./admin/main";

const Drawer = createDrawerNavigator();

export const WebMain = () => {
	const linking = {
		config: {
			screens: {
				NotFound: "*",
				Heroes: "heroes",
				Maps: "maps",
				Admin: "admin",
			},
		},
	};
	return (
		<NavigationContainer theme={DarkTheme} linking={linking}>
			<Drawer.Navigator initialRouteName="Heroes">
				<Drawer.Screen
					name="Heroes"
					component={Heroes}
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
				<Drawer.Screen
					name="Maps"
					component={Maps}
					options={{
						headerTintColor: "white",
						drawerIcon: () => (
							<View>
								<Image
									style={tw`w-[${(Dimensions.get("window").width / 100) * 3}px] h-[${
										(Dimensions.get("window").width / 100) * 3
									}px]`}
									source={{
										uri: "https://cdn.dribbble.com/users/825214/screenshots/4212974/attachments/962927/kings_row-02.jpg",
									}}
								/>
							</View>
						),
					}}
				/>
				<Drawer.Screen
					name="Admin"
					component={Admin}
					options={{
						headerTintColor: "white",
						drawerItemStyle: {
							display: "none",
						},
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
