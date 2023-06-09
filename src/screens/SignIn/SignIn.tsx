import OrganizAi from "@assets/organizai.svg"
import { auth } from "@firebaseAPI"
import { firebaseErrorAuth } from "@utils"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Pressable, View } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"

export default function SignIn({ navigation }) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")

	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleLoginClick = async () => {
		setLoading(true)
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				navigation.reset({
					routes: [{ name: "Preload" }],
				})
			})
			.catch((error) => {
				console.log(
					"🚀 ~ file: SignIn.jsx:59 ~ handleLoginClick ~ error:",
					error
				)
				const errorCode = error.code
				setError(firebaseErrorAuth(errorCode))
			})
			.then(() => setLoading(false))
	}

	const handleSignUp = () => {
		navigation.navigate("SignUp")
	}

	return (
		<View className="flex-col w-screen h-full justify-center items-center bg-primary">
			<OrganizAi width="90%" height="100px" className="mb-5" />
			<View className="flex justify-center items-center w-[70%]">
				<View className="flex-row items-center bg-white mb-2 rounded">
					<TextInput
						className="bg-white flex-1"
						placeholder="Digite seu email"
						value={email}
						onChangeText={(text) => setEmail(text)}
						keyboardType="email-address"
						autoComplete="email"
						selectionColor="black"
						underlineColor="white"
						activeUnderlineColor="white"
						left={
							<TextInput.Icon name="email" disabled style={{ opacity: 1 }} />
						}
					/>
				</View>

				<View className="flex-row items-center bg-white mb-2 rounded">
					<TextInput
						className="bg-white flex-1"
						placeholder="Digite sua senha"
						value={password}
						onChangeText={(text) => setPassword(text)}
						selectionColor="black"
						underlineColor="white"
						activeUnderlineColor="white"
						secureTextEntry={!showPassword}
						left={
							<TextInput.Icon name="lock" disabled style={{ opacity: 1 }} />
						}
						right={
							<TextInput.Icon
								name={!showPassword ? "eye-off" : "eye"}
								onPress={() => setShowPassword(!showPassword)}
							/>
						}
					/>
				</View>

				{!!error && (
					<View className="bg-red-500 rounded-lg mb-2">
						<Text className="text-white font-bold p-2">{error}</Text>
					</View>
				)}

				<Button
					onPress={handleLoginClick}
					mode="contained"
					color="white"
					loading={loading}
					className="mt-2"
					contentStyle={{
						paddingVertical: 6,
						paddingHorizontal: 24,
						flexDirection: "row-reverse",
					}}
				>
          Login
				</Button>
			</View>

			<Pressable
				onPress={handleSignUp}
				className="flex-row justify-center mt-5"
			>
				<Text className="text-white text-base ">Ainda nao possui conta?</Text>
				<Text className="text-white text-base font-extrabold ml-2">
          Cadastre-se
				</Text>
			</Pressable>
		</View>
	)
}
