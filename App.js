import "react-native-gesture-handler";
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
import { cardsData } from "./os/phone/data/data";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	const Drawer = createDrawerNavigator();

	const isCarousel = useRef(null);

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
										key={i}
									/>
								))}
							</DrawerContentScrollView>
						);
					}}
				>
					<Drawer.Screen
						name="Heroes"
						component={PhoneVersion}
						initialParams={{ isCarousel }}
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
						// initialParams={{ cardsData: cardsData }}
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
