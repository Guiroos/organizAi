import { useUser } from "@hooks/useUser"
import { View } from "react-native"
import { Avatar, Button, TextInput } from "react-native-paper"

export default function UpdateUser({ navigation }) {
	const { user, setUser, loading, handleUpdateUser } = useUser()

	return (
		<View className="flex-1 mx-auto w-[90%]">
			<View className="items-center pt-2">
				<Avatar.Icon size={96} icon="camera" color="white" />
			</View>
			<TextInput
				label="Nome"
				value={user.displayName}
				onChangeText={(value) => setUser({ ...user, displayName: value })}
			/>
			<TextInput
				label="Email"
				value={user.email}
				disabled
				onChangeText={(value) => setUser({ ...user, email: value })}
			/>
			<TextInput
				label="Telefone"
				value={user.phoneNumber}
				onChangeText={(value) => setUser({ ...user, phoneNumber: value })}
			/>
			<Button className="mt-4" onPress={handleUpdateUser} loading={loading}>
        Atualizar
			</Button>
		</View>
	)
}
