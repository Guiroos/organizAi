import { Pressable } from "react-native"
import { Card, Text } from "react-native-paper"

type AgendaEventDate = {
	item: {
		initialHour: string,
		finalHour: string
		student: string
		description: string
	},
	firstItemInDay: number
}

export default function AgendaEventDate({ item, firstItemInDay }: AgendaEventDate) {
	return (
		<Pressable style={{ marginRight: 10, marginTop: 17 }}>
			<Card>
				<Card.Content>
					<Text>{`${item.initialHour} - ${item.finalHour}`}</Text>
					<Text>{item.student}</Text>
					<Text>{item.description}</Text>
				</Card.Content>
			</Card>
		</Pressable>
	)
}
