import { useUserContext } from "@contexts"
import { createStudents, getStudents } from "@firebaseAPI"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { getAge } from "@utils"
import { useState } from "react"
import { Alert, View } from "react-native"
import { Button, TextInput } from "react-native-paper"

export default function CreateStudent({ navigation }) {
	const { state: data, dispatch } = useUserContext()
	const [birthDate, setBirthDate] = useState(new Date())
	const [newStudent, setNewStudent] = useState({
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

	const handleUpdateStudents = async () => {
		if (!newStudent.name) {
			Alert.alert("Insira um nome")
			return
		}

		await createStudents(data.user.uid, newStudent)
			.then(() => getStudents(data.user.uid))
			.then((students) =>
				dispatch({
					type: "SET_STUDENTS",
					payload: { students },
				})
			)

		navigation.goBack()
	}

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate
		const currentDateJSON = selectedDate.toJSON()

		const studentAge = getAge(currentDate)

		setBirthDate(currentDate)
		setNewStudent({
			...newStudent,
			age: studentAge,
			birthDate: currentDateJSON,
		})
	}

	const showMode = () => {
		DateTimePickerAndroid.open({
			value: birthDate,
			onChange,
			mode: "date",
		})
	}

	return (
		<View className="gap-2 flex-1 my-auto mx-auto w-[90%]">
			<TextInput
				label="Nome"
				name="name"
				value={newStudent.name}
				onChangeText={(value) => setNewStudent({ ...newStudent, name: value })}
			/>
			<TextInput
				label="CPF"
				name="cpf"
				value={newStudent.cpf}
				onChangeText={(value) => setNewStudent({ ...newStudent, cpf: value })}
			/>
			<TextInput
				label="Email"
				name="email"
				value={newStudent.email}
				onChangeText={(value) => setNewStudent({ ...newStudent, email: value })}
			/>
			<TextInput
				label="Telefone"
				name="phoneNumber"
				keyboardType="number-pad"
				value={newStudent.phoneNumber}
				onChangeText={(value) =>
					setNewStudent({ ...newStudent, phoneNumber: value })
				}
			/>
			<TextInput
				className="border-[#c7c7c7] border-b-[1.4px]"
				value={`${newStudent.age} anos`}
				name="age"
				disabled
				right={<TextInput.Icon icon="calendar" onPress={showMode} />}
			/>
			<TextInput
				label="Peso (kg)"
				name="weight"
				keyboardType="decimal-pad"
				value={newStudent.weight}
				onChangeText={(value) =>
					setNewStudent({ ...newStudent, weight: value })
				}
			/>
			<TextInput
				label="Altura (cm)"
				name="height"
				keyboardType="decimal-pad"
				value={newStudent.height}
				onChangeText={(value) =>
					setNewStudent({ ...newStudent, height: value })
				}
			/>
			<Button className="py-2" onPress={handleUpdateStudents}>
        Adicionar aluno
			</Button>
		</View>
	)
}
