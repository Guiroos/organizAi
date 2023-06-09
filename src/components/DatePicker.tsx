import { useUserContext } from "@contexts/UserContext"
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"
import { useState } from "react"
import { Platform } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"

export default function DatePicker({ setItems, btnShow, setBtnShow }) {
	// const { state } = useUserContext();
	const [date, setDate] = useState(new Date())
	const [mode, setMode] = useState("date")
	// const [mode2, setMode2] = useState("date");
	const [show, setShow] = useState(false)
	const [show2, setShow2] = useState(false)
	const [text, setText] = useState("")
	const [text2, setText2] = useState("")
	const [student, setStudent] = useState("")
	const [description, setDescription] = useState("")

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShow(Platform.OS === "ios")
		setDate(currentDate)

		const tempDate = new Date(currentDate)
		const fHour = tempDate.getHours().toString().padStart(2, "0")
		const fMin = tempDate.getMinutes().toString().padStart(2, "0")
		const fTime = `${fHour}:${fMin}`
		setText(fTime)
	}

	const showMode = (currentMode) => {
		setShow(true)
		setMode(currentMode)
	}

	const onChange2 = (event, selectedDate) => {
		const currentDate = selectedDate || date
		setShow2(Platform.OS === "ios")

		const tempDate = new Date(currentDate)
		const fHour = tempDate.getHours().toString().padStart(2, "0")
		const fMin = tempDate.getMinutes().toString().padStart(2, "0")
		const fTime = `${fHour}:${fMin}`
		setText2(fTime)
	}

	const showMode2 = (currentMode) => {
		setShow2(true)
		setMode(currentMode)
	}

	const handleCreateEvent = () => {
		const data = [
			{
				date: moment(date).format("YYYY-MM-DD"),
				name: student,
				initialHour: text,
				finalHour: text2,
				description,
			},
		]

		const reduced = data.reduce((acc, curr) => {
			const { date, ...coolItem } = curr

			acc[date] = [coolItem]
			return acc
		}, {})

		// items = { ...items, ...reduced };
		setItems(reduced)
		setBtnShow(!btnShow)
	}

	return (
		<SafeAreaView>
			<Button mode="contained" onPress={() => showMode("date")}>
				{"$"}
			</Button>
			<Button mode="contained" onPress={() => showMode("time")}>
        Horário inicial
			</Button>
			<Button mode="contained" onPress={() => showMode2("time")}>
        Horário Final
			</Button>

			{/* <Picker
        selectedValue={student}
        onValueChange={(itemValue, itemIndex) => setStudent(itemValue)}
      >
        {!!state.students
          ? Object.keys(state.students).map((key) => {
              const studentInfo = state.students[key];
              return (
                <Picker.Item
                  key={key}
                  label={studentInfo.name}
                  value={studentInfo.name}
                />
              );
            })
          : null}
      </Picker> */}

			<TextInput
				label="Descrição"
				value={description}
				onChangeText={(e) => setDescription(e)}
			/>

			<Button onPress={handleCreateEvent}>Adicionar</Button>

			{show && (
				<DateTimePicker
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange}
				/>
			)}

			{show2 && (
				<DateTimePicker
					value={date}
					mode={mode}
					is24Hour={true}
					display="default"
					onChange={onChange2}
				/>
			)}
		</SafeAreaView>
	)
}
