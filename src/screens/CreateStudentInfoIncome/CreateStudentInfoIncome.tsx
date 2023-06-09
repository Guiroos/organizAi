import { useUserContext } from "@contexts"
import { createIncome } from "@firebaseAPI"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { useState } from "react"
import { View } from "react-native"
import { Button, IconButton, TextInput } from "react-native-paper"

export default function CreateStudentInfoIncome({ navigation, route }) {
	const { state: data } = useUserContext()
	const { studentKey } = route.params

	const [description, setDescription] = useState("")
	const [value, setValue] = useState("")
	const [incomeDate, setIncomeDate] = useState(new Date())
	const [incomeTime, setIncomeTime] = useState(new Date())

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate
		setIncomeDate(currentDate)
	}

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime
		setIncomeTime(currentTime)
	}

	const showCalendar = () => {
		DateTimePickerAndroid.open({
			value: incomeDate,
			onChange: onChangeDate,
			mode: "date",
		})
	}

	const showTime = (value, onChange) => {
		DateTimePickerAndroid.open({
			value,
			onChange,
			mode: "time",
		})
	}

	const handleCreateIncome = () => {
		const formatIncomeTime = incomeTime.toLocaleTimeString().slice(0, 5)
		const formatIncomeDate = incomeDate.toLocaleDateString()

		const income = {
			description,
			value,
			incomeDate: formatIncomeDate,
			incomeTime: formatIncomeTime,
		}

		createIncome(data.user.uid, studentKey, income)
		navigation.goBack()
	}

	return (
		<View className="gap-2 flex-1 my-auto mx-auto w-[90%]">
			<TextInput
				label="Descrição"
				name="description"
				value={description}
				onChangeText={(value) => setDescription(value)}
				multiline
			/>
			<TextInput
				label="Valor"
				name="value"
				value={value}
				keyboardType="number-pad"
				onChangeText={(value) => setValue(value)}
			/>
			<View className="flex-row items-center bg-gray-200 rounded-md">
				<TextInput
					name="age"
					label="Data"
					value={incomeDate.toLocaleDateString()}
					className="flex-1"
					disabled
				/>
				<IconButton icon="calendar" className="mx-2" onPress={showCalendar} />
			</View>
			<View className="flex-row items-center bg-gray-200 rounded-md">
				<TextInput
					name="hour"
					label="Hora"
					value={`${
						(incomeTime.getHours() < 10 ? "0" : "") + incomeTime.getHours()
					}:${
						(incomeTime.getMinutes() < 10 ? "0" : "") + incomeTime.getMinutes()
					}`}
					className="flex-1"
					disabled
				/>
				<IconButton
					icon="clock"
					className="mx-2"
					onPress={() => showTime(incomeTime, onChangeTime)}
				/>
			</View>
			<Button className="py-2" onPress={handleCreateIncome}>
        Adicionar
			</Button>
		</View>
	)
}
