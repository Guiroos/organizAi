import { auth } from "@firebaseAPI"
import { handleNavigate } from "@utils"
import { signOut } from "firebase/auth"
import { View } from "react-native"
import { List } from "react-native-paper"

export default function Settings({ navigation }) {
	const handleSignOut = () => {
		signOut(auth).then(navigation.replace("SignIn"))
	}

	return (
		<View className="w-[100%] flex">
			<View className="w-[85%] mx-auto h-[80%] my-auto justify-center">
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Conta"
					titleStyle={{ left: -20, fontSize: 18 }}
					left={() => <List.Icon className="-left-2" icon="account-outline" />}
					right={() => <List.Icon className="-right-4" icon="chevron-right" />}
					onPress={() => handleNavigate(navigation, "Account")}
				/>
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Notificações"
					titleStyle={{ left: -20, fontSize: 18 }}
					left={() => <List.Icon className="-left-2" icon="bell-outline" />}
					right={() => <List.Icon className="-right-4" icon="chevron-right" />}
					onPress={() => handleNavigate(navigation, "Notifications")}
				/>
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Aparência"
					titleStyle={{ left: -20, fontSize: 18 }}
					titleNumberOfLines={3}
					left={() => <List.Icon className="-left-2" icon="eye-outline" />}
					right={() => <List.Icon className="-right-4" icon="chevron-right" />}
					onPress={() => handleNavigate(navigation, "Appearance")}
				/>
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Privacidade"
					titleStyle={{ left: -20, fontSize: 18 }}
					left={() => <List.Icon className="-left-2" icon="lock-outline" />}
					right={() => <List.Icon className="-right-4" icon="chevron-right" />}
					onPress={() => handleNavigate(navigation, "Privacy")}
				/>
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Sobre"
					titleStyle={{ left: -20, fontSize: 18 }}
					left={() => (
						<List.Icon className="-left-2" icon="help-circle-outline" />
					)}
					right={() => <List.Icon className="-right-4" icon="chevron-right" />}
					onPress={() => handleNavigate(navigation, "Support")}
				/>
				<List.Item
					className="flex justify-center h-16 border-b-2 border-gray-200"
					title="Logout"
					titleStyle={{ left: -20, fontSize: 18, color: "red" }}
					left={() => (
						<List.Icon color="red" className="-left-2" icon="logout" />
					)}
					onPress={handleSignOut}
				/>
			</View>
		</View>
	)
}
