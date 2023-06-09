import { Students } from "@contexts/UserContext"
import { FlashList } from "@shopify/flash-list"
import { View } from "react-native"

import StudentCard from "./StudentCard"

type StudentsCards = {
	navigation: undefined,
	students: Students[]
}

export default function StudentsCards({ navigation, students }: StudentsCards) {
	const studentsInfo = students
		? Object.keys(students).map((key) => {
			const newObj = Object.create({ key, studentInfo: {} })
			newObj.key = key
			newObj.studentInfo = students[key]
			return newObj
		})
		: []
		
	const renderItem = ({ item }) => (
		<StudentCard
			navigation={navigation}
			studentKey={item.key}
			studentInfo={item.studentInfo}
		/>
	)
	
	return (
		<View className="flex-1 align-middle justify-center">
			{studentsInfo && (
				<FlashList
					data={studentsInfo}
					estimatedItemSize={10}
					keyExtractor={(item) => item.key}
					renderItem={renderItem}
				/>
			)}
		</View>
	)
}
