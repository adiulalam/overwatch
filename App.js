import React from "react";
import { Button, Dimensions, Image, Platform, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebVersion } from "./os/web/web";
import { PhoneVersion } from "./os/phone/phone";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useRef } from "react";
import tw from "twrnc";
import { HeroesDetail } from "./os/phone/components/heroesDetail";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	const Drawer = createDrawerNavigator();
	const isCarousel = useRef(null);

	const cardsData = [
		{
			name: "Ana",
			hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/7/76/Ana.png",
			difficulty: 3,
			type: "support",
		},
		{
			name: "Ashe",
			hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/4/4f/Ashe-portrait.png",
			difficulty: 2,
			type: "damage",
		},
		{
			name: "Baptiste",
			hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/0/01/Baptiste-portrait.png",
			difficulty: 1,
			type: "tank",
		},
		{
			name: "Bastion",
			hero_image: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d0/Bastion-portrait.png",
			difficulty: 1,
			type: "damage",
		},
	];

	return Platform.OS === "web" ? (
		<WebVersion />
	) : (
		<>
			<NavigationContainer>
				<Drawer.Navigator
					useLegacyImplementation
					initialRouteName="Heroes"
					drawerContent={(props) => {
						// console.log(props.state.routeNames);
						return (
							<DrawerContentScrollView {...props}>
								<DrawerItemList {...props} />
								{cardsData.map((e, i) => (
									<DrawerItem
										label={e.name}
										onPress={() => {
											isCarousel?.current?.snapToItem(i);
											props.navigation.closeDrawer();
											props.navigation.navigate("Heroes");
										}}
										activeTintColor="#f32121"
										focused={i === isCarousel?.current?.currentIndex}
									/>
								))}
							</DrawerContentScrollView>
						);
					}}
				>
					<Drawer.Screen
						name="Heroes"
						component={PhoneVersion}
						initialParams={{ isCarousel: isCarousel, cardsData: cardsData }}
						options={{
							drawerIcon: () => (
								<View>
									<Image
										style={tw`w-[${(Dimensions.get("window").width / 100) * 10}px] h-[${
											(Dimensions.get("window").width / 100) * 10
										}px]`}
										source={require("./assets/overwatch/icons/heroes_icon.png")}
									/>
								</View>
							),
						}}
					/>
					<Drawer.Screen
						name="Heroes Detail"
						component={HeroesDetail}
						initialParams={{ cardsData: cardsData }}
						options={({ route }) => ({
							title: route?.params?.name,
							drawerItemStyle: {
								display: "none",
							},
						})}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</>
	);
}
