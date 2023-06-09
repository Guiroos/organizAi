import CustomTabBar from "@components/CustomTabBar"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Calendar, Home, Settings, Students } from "@screens"
import { Button } from "react-native-paper"

const Tab = createBottomTabNavigator()

export default function MainTab({ navigation }) {
	return (
		<Tab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: "#ff7323" },
				headerTintColor: "white",
			}}
			tabBar={(props) => <CustomTabBar {...props} />}
		>
			<Tab.Screen name="Home" component={Home} options={{ title: "Início" }} />
			<Tab.Screen
				name="Calendar"
				component={Calendar}
				options={{
					title: "Calendário",
					headerRight: () => (
						<Button
							color="white"
							className="p-2"
							icon="plus"
							onPress={() => navigation.navigate("CreateEvent")}
						>
              Nova Aula
						</Button>
					),
				}}
			/>
			<Tab.Screen
				name="Students"
				component={Students}
				options={{
					title: "Alunos",
					headerRight: () => (
						<Button
							color="white"
							icon="shape-oval-plus"
							className="p-2"
							onPress={() => navigation.navigate("CreateStudent")}
						>
              Adicionar
						</Button>
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{ title: "Opções" }}
			/>
		</Tab.Navigator>
	)
}
