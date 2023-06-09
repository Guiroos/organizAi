import { useStudent } from "@hooks/useStudent"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { useState } from "react"
import { View } from "react-native"
import { Button, TextInput } from "react-native-paper"

export default function UpdateStudent({ route, navigation }) {
	const { studentKey } = route.params

	const { student, setStudent, handleUpdateStudent } = useStudent({
		studentKey,
	})

	const [birthDate, setBirthDate] = useState(new Date())

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate

		setBirthDate(selectedDate)

		const today = new Date().getFullYear()
		const birthYear = currentDate.getFullYear()
		const studentAge = Number(today) - Number(birthYear)

		setStudent({ ...student, age: studentAge })
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
				value={student.name}
				onChangeText={(value) => setStudent({ ...student, name: value })}
			/>
			<TextInput
				label="CPF"
				value={student.cpf}
				onChangeText={(value) => setStudent({ ...student, cpf: value })}
			/>
			<TextInput
				label="Email"
				value={student.email}
				onChangeText={(value) => setStudent({ ...student, email: value })}
			/>
			<TextInput
				label="Telefone"
				value={student.phoneNumber}
				onChangeText={(value) => setStudent({ ...student, phoneNumber: value })}
			/>
			<TextInput
				style={{ borderBottomWidth: 1.4, borderColor: "#c7c7c7" }}
				value={`${student.age} anos`}
				right={<TextInput.Icon icon="calendar" onPress={showMode} />}
				disabled
			/>
			<TextInput
				label="Peso (kg)"
				keyboardType="decimal-pad"
				value={student.weight}
				onChangeText={(value) => setStudent({ ...student, weight: value })}
			/>
			<TextInput
				label="Altura (cm)"
				keyboardType="decimal-pad"
				value={student.height}
				onChangeText={(value) => setStudent({ ...student, height: value })}
			/>
			<Button className="py-2" onPress={handleUpdateStudent}>
        Atualizar aluno
			</Button>
		</View>
	)
}
