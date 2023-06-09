import OrganizAi from "@assets/organizaiColored.svg"
import { auth, createInitialDatabase } from "@firebaseAPI"
import { firebaseErrorAuth } from "@utils"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"

export default function SignUp({ navigation }) {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleRegister = () => {
		setLoading(true)
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user
				updateProfile(auth.currentUser, {
					displayName: name,
				}).then(() => createInitialDatabase(user.uid, name, email))
			})
			.catch((error) => {
				console.log(
					"🚀 ~ file: SignUp.jsx:32 ~ handleRegister ~ error:",
					error
				)
				const errorCode = error.code
				setError(firebaseErrorAuth(errorCode))
			})
			.then(() => setLoading(false))
	}

	return (
		<View className="flex-col w-screen h-full items-center justify-center bg-white">
			<OrganizAi width="90%" height="100px" className="mb-5" />
			<View className="flex justify-center items-center w-[70%]">
				<View className="flex-row items-center mb-2 rounded">
					<TextInput
						mode="outlined"
						className="flex-1"
						placeholder="Digite seu nome"
						value={name}
						onChangeText={(text) => setName(text)}
						autoComplete="name"
						outlineColor="#ffab7b"
						left={
							<TextInput.Icon
								name="account"
								color="#e66820"
								disabled
								style={{ opacity: 1 }}
							/>
						}
					/>
				</View>
				<View className="flex-row items-center mb-2 rounded">
					<TextInput
						mode="outlined"
						className="flex-1"
						placeholder="Digite seu email"
						value={email}
						onChangeText={(text) => setEmail(text)}
						outlineColor="#ffab7b"
						left={
							<TextInput.Icon
								name="email"
								color="#e66820"
								disabled
								style={{ opacity: 1 }}
							/>
						}
					/>
				</View>

				<View className="flex-row items-center mb-2 rounded">
					<TextInput
						mode="outlined"
						className=" flex-1"
						placeholder="Digite sua senha"
						value={password}
						onChangeText={(text) => setPassword(text)}
						outlineColor="#ffab7b"
						secureTextEntry={!showPassword}
						left={
							<TextInput.Icon
								name="lock"
								color="#e66820"
								disabled
								style={{ opacity: 1 }}
							/>
						}
						right={
							<TextInput.Icon
								name={!showPassword ? "eye-off" : "eye"}
								color={!showPassword ? "#ffab7b" : "#e66820"}
								onPress={() => setShowPassword(!showPassword)}
							/>
						}
					/>
				</View>

				{error.length > 0 && (
					<View className="bg-red-500 rounded-lg">
						<Text className="text-white font-bold p-2">{error}</Text>
					</View>
				)}

				<Button
					onPress={handleRegister}
					mode="contained"
					loading={loading}
					className="mt-2"
					labelStyle={{ color: "white" }}
					contentStyle={{
						paddingVertical: 6,
						paddingHorizontal: 24,
						flexDirection: "row-reverse",
					}}
				>
          Registrar
				</Button>
			</View>
		</View>
	)
}
