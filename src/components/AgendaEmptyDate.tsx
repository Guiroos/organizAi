import { handleNavigate } from "@utils"
import { View } from "react-native"
import { Card, IconButton } from "react-native-paper"

export default function AgendaEmptyDate({ navigation }) {
	return (
		<View className="m-2">
			<Card>
				<Card.Title
					title="Dia Livre!"
					subtitle="Adicione uma aula para começar"
					right={() => (
						<IconButton
							icon="plus"
							size={24}
							onPress={() => handleNavigate(navigation, "CreateEvent")}
						/>
					)}
				/>
			</Card>
		</View>
	)
}
