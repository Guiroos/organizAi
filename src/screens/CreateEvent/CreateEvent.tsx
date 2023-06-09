import { useUserContext } from "@contexts"
import { createEvent, getStudents } from "@firebaseAPI"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { Picker } from "@react-native-picker/picker"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { View } from "react-native"
import { Button, IconButton, TextInput } from "react-native-paper"

export default function CreateEvent({ navigation }) {
	const { state: data } = useUserContext()
	const [students, setStudents] = useState("")
	const [description, setDescription] = useState("")
	const [eventDate, setEventDate] = useState(new Date())
	const [eventITime, setEventITime] = useState(new Date())
	const [eventFTime, setEventFTime] = useState(new Date())
	const [selectedStudent, setSelectedStudent] = useState("")

	useFocusEffect(
		useCallback(() => {
			const getStudentsFB = async () => {
				const studentsFB = await getStudents(data.user.uid)
				setStudents(studentsFB)
			}
			getStudentsFB()
		}, [data.user.uid])
	)

	const onChangeDate = (event, selectedDate) => {
		const currentDate = selectedDate
		setEventDate(currentDate)
	}

	const onChangeITime = (event, selectedTime) => {
		const currentTime = selectedTime
		setEventITime(currentTime)
	}

	const onChangeFTime = (event, selectedTime) => {
		const currentTime = selectedTime
		setEventFTime(currentTime)
	}

	const showCalendar = () => {
		DateTimePickerAndroid.open({
			value: eventITime,
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

	const handleCreateEvent = async () => {
		const initialHour = eventITime.toLocaleTimeString().slice(0, 5)
		const finalHour = eventFTime.toLocaleTimeString().slice(0, 5)

		const newEvent = {
			description,
			initialHour,
			finalHour,
			student: selectedStudent,
		}

		const dateKeyYear = eventDate.getFullYear()
		const dateKeyDay =
      (eventDate.getDate() < 10 ? "0" : "") + eventDate.getDate()
		const dateKeyMonth =
      (eventDate.getMonth() < 10 ? "0" : "") + (eventDate.getMonth() + 1)

		const dateKeyEvent = `${dateKeyYear}-${dateKeyMonth}-${dateKeyDay}`

		await createEvent(data.user.uid, newEvent, dateKeyEvent)
		navigation.goBack()
	}

	return (
		<View className="gap-2 flex-1 my-auto mx-auto w-[90%]">
			<TextInput
				label="Descrição"
				value={description}
				onChangeText={(value) => setDescription(value)}
			/>
			<View className="flex-row items-center bg-gray-200 rounded-md">
				<TextInput
					label="Data"
					value={eventDate.toLocaleDateString()}
					className="flex-1"
					disabled
				/>
				<IconButton icon="calendar" className="mx-2" onPress={showCalendar} />
			</View>
			<View className="flex-row items-center bg-gray-200 rounded-md">
				<TextInput
					name="initialHour"
					label="Início"
					value={`${
						(eventITime.getHours() < 10 ? "0" : "") + eventITime.getHours()
					}:${
						(eventITime.getMinutes() < 10 ? "0" : "") + eventITime.getMinutes()
					}`}
					className="flex-1"
					disabled
				/>
				<IconButton
					icon="clock"
					className="mx-2"
					onPress={() => showTime(eventITime, onChangeITime)}
				/>
				<TextInput
					name="finalHour"
					label="Fim"
					value={`${
						(eventFTime.getHours() < 10 ? "0" : "") + eventFTime.getHours()
					}:${
						(eventFTime.getMinutes() < 10 ? "0" : "") + eventFTime.getMinutes()
					}`}
					className="flex-1"
					disabled
				/>
				<IconButton
					icon="clock"
					className="mx-2"
					onPress={() => showTime(eventFTime, onChangeFTime)}
				/>
			</View>
			<Picker
				selectedValue={selectedStudent}
				onValueChange={(itemValue, itemIndex) => setSelectedStudent(itemValue)}
				style={{ backgroundColor: "#e5e7eb" }}
			>
				<Picker.Item
					label={students ? "Escolha um aluno" : "Nenhum aluno cadastrado"}
					key=""
					value=""
				/>
				{!!students &&
          Object.entries(students).map((student) => (
          	<Picker.Item
          		key={student[0]}
          		label={student[1].name}
          		value={student[1].name}
          	/>
          ))}
			</Picker>
			<Button className="py-2" onPress={handleCreateEvent}>
        Cria aula{" "}
			</Button>
		</View>
	)
}
