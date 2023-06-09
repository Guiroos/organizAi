import { useUser } from "@hooks/useUser"
import { handleNavigate } from "@utils"
import { View } from "react-native"
import { Avatar, Button, TextInput } from "react-native-paper"

export default function Account({ navigation }) {
	const { user } = useUser()

	return (
		<View className="flex-1 mx-auto w-[90%]">
			<View className="items-center pt-2">
				<Avatar.Icon size={96} icon="camera" color="white" />
			</View>
			<TextInput
				label="Nome"
				value={user.displayName}
				editable={false}
			/>
			<TextInput
				label="Email"
				value={user.email}
				editable={false}
			/>
			<TextInput
				label="Telefone"
				value={user.phoneNumber}
				editable={false}
			/>
			<Button
				labelStyle={{ color: "white" }}
				mode="contained"
				onPress={() => handleNavigate(navigation, "UpdateUser")}
				className="mt-4"
			>
        Atualizar
			</Button>
		</View>
	)
}
