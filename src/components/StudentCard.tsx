import { handleNavigate } from "@utils"
import { Avatar, Card, IconButton } from "react-native-paper"

type StudentCard = {
	navigation: undefined,
	studentKey: string,
	studentInfo: {
		name: string
		age: string
	}
}

export default function StudentCard({ navigation, studentKey, studentInfo }: StudentCard) {
	return (
		<Card key={studentKey} mode="outlined" className="flex flex-1 justify-center mb-2">
			<Card.Title
				className="flex justify-center"
				title={studentInfo.name}
				subtitle={`${studentInfo.age} anos`}
				left={() => <Avatar.Icon size={32} icon="camera" color="white" />}
				right={() => (
					<IconButton
						size={32}
						style={{ marginHorizontal: 2 }}
						icon="chevron-right"
						onPress={() =>
							handleNavigate(navigation, "StudentInfo", { studentKey })
						}
					/>
				)}
			/>
		</Card>
	)
}
