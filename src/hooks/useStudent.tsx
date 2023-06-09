import { useUserContext } from "@contexts"
import { getStudentByKey, updateStudent } from "@firebaseAPI"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { Alert } from "react-native"

export const useStudent = ({ studentKey }: {studentKey: string}) => {
	const { state } = useUserContext()

	const navigation = useNavigation()

	const [student, setStudent] = useState({
		name: "",
		cpf: "",
		email: "",
		phoneNumber: "",
		age: 0,
		birthDate: "",
		gender: "",
		weight: "",
		height: "",
	})

	const [messages, setMessages] = useState({
		customMessage: "",
		busyMessage: "",
		lateMessage: "",
	})

	const currentUser = state.user.uid

	useFocusEffect(
		useCallback(() => {
			const getStudentByKeyFB = async () => {
				const studentByKeyFB = await getStudentByKey(currentUser, studentKey)
				setStudent({
					name: studentByKeyFB.name,
					cpf: studentByKeyFB.cpf,
					email: studentByKeyFB.email,
					phoneNumber: studentByKeyFB.phoneNumber,
					age: studentByKeyFB.age,
					birthDate: studentByKeyFB.birthDate,
					gender: studentByKeyFB.gender,
					weight: studentByKeyFB.weight,
					height: studentByKeyFB.height,
				})
			}
			getStudentByKeyFB()
		}, [currentUser, studentKey])
	)

	useFocusEffect(
		useCallback(() => {
			setMessages((prevState) => {
				return {
					...prevState,
					busyMessage: `Desculpe ${
						student.name.split(" ")[0]
					}, mas hoje não conseguirei dar aula...`,
					lateMessage: `Desculpe ${
						student.name.split(" ")[0]
					}, chegarei um pouco atrasado...`,
				}
			})
		}, [student.name])
	)

	const handleUpdateStudent = () => {
		if (!student.name) {
			Alert.alert("Insira um nome")
			return
		}

		updateStudent(currentUser, studentKey, student)

		navigation.goBack()
	}

	return {
		student,
		setStudent,
		messages,
		setMessages,
		handleUpdateStudent,
	}
}
