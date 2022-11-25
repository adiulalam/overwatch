import "react-native-gesture-handler";
import React, { useContext } from "react";
import { Dimensions, Image, View } from "react-native";
import { Heroes } from "./heroes";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useRef } from "react";
import tw from "twrnc";
import { HeroesDetail } from "./components/heroesDetail";
import { LogBox } from "react-native";
import { HeroesContext } from "./../../connection/client";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const Drawer = createDrawerNavigator();

export const PhoneMain = () => {
	const isCarousel = useRef(null);
	const currentIndex = useRef(0);

	const { overwatch_heroes } = useContext(HeroesContext);

	return (
		<NavigationContainer theme={DarkTheme}>
			<Drawer.Navigator
				useLegacyImplementation
				initialRouteName="Heroes"
				drawerContent={(props) => {
					return (
						<DrawerContentScrollView {...props}>
							<DrawerItemList {...props} />
							{props.state.index === 0 || props.state.index === 1
								? overwatch_heroes.map((e, i) => (
										<DrawerItem
											label={e.name}
											onPress={() => {
												isCarousel?.current?.scrollTo({ index: i });
												currentIndex.current = i;
												props.navigation.closeDrawer();
												props.navigation.navigate("Heroes");
											}}
											activeTintColor="#f32121"
											focused={i === isCarousel?.current?.getCurrentIndex()}
											key={i}
										/>
								  ))
								: null}
						</DrawerContentScrollView>
					);
				}}
			>
				<Drawer.Screen
					name="Heroes"
					component={Heroes}
					initialParams={{ isCarousel, currentIndex }}
					options={{
						headerTintColor: "white",
						drawerIcon: () => (
							<View>
								<Image
									style={tw`w-[${(Dimensions.get("window").width / 100) * 10}px] h-[${
										(Dimensions.get("window").width / 100) * 10
									}px]`}
									source={require("../../assets/overwatch/icons/heroes_icon.png")}
								/>
							</View>
						),
					}}
				/>
				<Drawer.Screen
					name="Heroes Detail"
					component={HeroesDetail}
					options={({ route }) => ({
						title: route?.params?.name,
						headerTintColor: "white",
						drawerItemStyle: {
							display: "none",
						},
					})}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
