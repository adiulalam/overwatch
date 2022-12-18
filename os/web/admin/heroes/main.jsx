import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HeroesScreen } from "./heroesScreen";

const HeroesTab = createMaterialTopTabNavigator();
export const MutateHeroes = ({ route }) => {
	const heroes = [...route?.params?.Heroes];
	return (
		<HeroesTab.Navigator
			screenOptions={{ tabBarItemStyle: { width: 80 }, tabBarScrollEnabled: true, swipeEnabled: false }}
		>
			<HeroesTab.Screen
				name="Add Hero"
				component={HeroesScreen}
				options={{
					tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
				}}
				initialParams={{
					hero: {
						name: "",
						hero_image: "",
						type: null,
						difficulty: null,
						description: "",
					},
				}}
			/>

			{heroes.map((e, i) => (
				<HeroesTab.Screen
					name={e?.name}
					key={i}
					component={HeroesScreen}
					initialParams={{ hero: e, heroTabIndex: i }}
				/>
			))}
		</HeroesTab.Navigator>
	);
};
