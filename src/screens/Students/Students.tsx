import StudentsCards from "@components/StudentsCards"
import { useUserContext } from "@contexts/UserContext"
import { SafeAreaView } from "react-native"


export default function Students({ navigation }) {
	const {
		state: { students },
	} = useUserContext()
	
	return (
		<SafeAreaView className="m-2 flex-1 justify-center">
			<StudentsCards navigation={navigation} students={students} />
		</SafeAreaView>
	)
}
