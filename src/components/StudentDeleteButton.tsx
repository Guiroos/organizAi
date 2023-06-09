import { useUserContext } from "@contexts/UserContext"
import { deleteStudent, getStudents } from "@firebaseAPI"
import { Alert } from "react-native"
import { Button } from "react-native-paper"

type StudentDeleteButton = {
	navigation: undefined,
	studentKey: string
}

export default function StudentDeleteButton({ navigation, studentKey }) {
	const { state, dispatch } = useUserContext()

	const handleDeleteStudent = async (studentKey: string) => {
		return Alert.alert("Deletar usuário?", "As informações serão apagadas", [
			{
				text: "Não",
				style: "cancel",
			},
			{
				text: "Sim",
				style: "destructive",
				onPress: async () => {
					await deleteStudent(state.user.uid, studentKey)
						.then(() => getStudents(state.user.uid))
						.then((students) =>
							dispatch({
								type: "SET_STUDENTS",
								payload: { students },
							})
						)
					navigation.goBack()
				},
			},
		])
	}

	return (
		<Button
			color="white"
			icon="delete"
			className="p-2"
			onPress={() => handleDeleteStudent(studentKey)}
		> </Button>
	)
}
