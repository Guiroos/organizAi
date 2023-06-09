import WhatsApp from "@assets/whatsApp.svg"
import { useUserContext } from "@contexts"
import { useGetStudent } from "@hooks/useGetStudent"
import { useStudent } from "@hooks/useStudent"
import { handleNavigate, sendWhatsApp } from "@utils"
import { useState } from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Avatar, Button, Modal, Portal, TextInput } from "react-native-paper"

export default function StudentInfo({ navigation, route }) {
	const {
		state: { user },
	} = useUserContext()
	const { studentKey } = route.params
	const { messages, setMessages } = useStudent({ studentKey })
	const {
		status,
		data: student,
		error,
		isLoading,
	} = useGetStudent(user.uid, studentKey)

	const [visible, setVisible] = useState(false)
	const showModal = () => setVisible(true)
	const hideModal = () => setVisible(false)

	const WhatsAppModal = () => {
		return (
			<Portal className="">
				<Modal
					visible={visible}
					onDismiss={hideModal}
					contentContainerStyle={{
						backgroundColor: "white",
						width: "80%",
						height: 360,
						alignItems: "center",
						justifyContent: "center",
						alignSelf: "center",
						borderRadius: 18,
						shadowColor: "gray",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.25,
						shadowRadius: 3.84,
					}}
				>
					<View className="w-[80%] gap-y-8">
						<TextInput
							name="customMessage"
							placeholder="Escreva aqui uma mensagem customizável"
							value={messages.customMessage}
							onChangeText={(text) =>
								setMessages({ ...messages, customMessage: text })
							}
							multiline
							right={
								<TextInput.Icon
									size={24}
									name="send"
									onPress={() =>
										sendWhatsApp(messages.customMessage, student.phoneNumber)
									}
								/>
							}
						/>
						<TextInput
							name="name"
							value={messages.busyMessage}
							multiline
							editable={false}
							right={
								<TextInput.Icon
									size={24}
									name="send"
									onPress={() =>
										sendWhatsApp(messages.busyMessage, student.phoneNumber)
									}
								/>
							}
						/>
						<TextInput
							name="name"
							value={messages.lateMessage}
							multiline
							editable={false}
							right={
								<TextInput.Icon
									size={24}
									name="send"
									onPress={() =>
										sendWhatsApp(messages.lateMessage, student.phoneNumber)
									}
								/>
							}
						/>
					</View>
				</Modal>
			</Portal>
		)
	}

	const textInputData = [
		{
			label: "Nome",
			name: "name",
			value: student?.name,
			editable: false,
		},
		{
			label: "CPF",
			name: "cpf",
			value: student?.cpf,
			editable: false,
		},
		{
			label: "Email",
			name: "email",
			value: student?.email,
			editable: false,
		},
		{
			label: "Telefone",
			name: "phoneNumber",
			value: student?.phoneNumber,
			editable: false,
			icon: (
				<TextInput.Icon
					size={24}
					name={() => <WhatsApp width={32} />}
					onPress={showModal}
				/>
			),
		},
		{
			label: "Idade",
			name: "age",
			value: student?.age,
			editable: false,
		},
		{
			label: "Peso",
			name: "weight",
			value: `${student?.weight} kg`,
			editable: false,
		},
		{
			label: "Altura",
			name: "height",
			value: `${student?.height} cm`,
			editable: false,
		},
	]

	return (
		<ScrollView className="flex-1 mx-auto w-[90%]">
			{WhatsAppModal()}
			<View className="items-center pt-2 mb-1">
				<Avatar.Icon size={96} icon="camera" color="white" />
			</View>

			{textInputData.map((textInput, index) => (
				<TextInput
					key={index}
					className="mb-1"
					label={textInput.label}
					name={textInput.name}
					value={textInput.value}
					editable={textInput.editable}
					right={textInput?.icon}
				/>
			))}

			<View className="flex-row pt-4 pb-4">
				<Button
					labelStyle={{ color: "white" }}
					mode="contained"
					className="flex-1 mr-10 p-1 bg-green-700"
					onPress={() =>
						handleNavigate(navigation, "StudentInfoIncome", { studentKey })
					}
				>
          GANHOS
				</Button>
				<Button
					labelStyle={{ color: "white" }}
					mode="contained"
					className="flex-1 p-1 bg-red-700"
					onPress={() =>
						handleNavigate(navigation, "StudentInfoExpense", { studentKey })
					}
				>
          GASTOS
				</Button>
			</View>
			<Button
				labelStyle={{ color: "white" }}
				mode="contained"
				className="mb-4"
				onPress={() =>
					handleNavigate(navigation, "UpdateStudent", { studentKey })
				}
			>
        Atualizar
			</Button>
		</ScrollView>
	)
}
