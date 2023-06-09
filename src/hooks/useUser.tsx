import { useUserContext } from "@contexts"
import { auth } from "@firebaseAPI"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { updateEmail, updateProfile } from "firebase/auth"
import { useCallback, useState } from "react"
import { Alert } from "react-native"

export const useUser = () => {
	const { dispatch } = useUserContext()
	const navigation = useNavigation()

	const [user, setUser] = useState({
		displayName: "",
		email: "",
		phoneNumber: "",
		photoURL: "",
	})
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const currentUser = auth.currentUser

	useFocusEffect(
		useCallback(() => {
			setUser({
				displayName: currentUser.displayName,
				email: currentUser.email,
				phoneNumber: currentUser.phoneNumber,
				photoURL: currentUser.photoURL,
			})
			dispatch({
				type: "SET_USER",
				payload: { user: currentUser },
			})
		}, [currentUser, dispatch])
	)

	const handleUpdateUser = async () => {
		setLoading(true)
		if (!user.displayName) {
			Alert.alert("Insira um nome")
			return
		}

		if (!user.email) {
			Alert.alert("Insira um email")
			return
		}

		await updateProfile(currentUser, {
			displayName: user.displayName,
			email: user.email,
			phoneNumber: user.phoneNumber,
		})
			.then(() => {
				// Profile updated!
				// ...
			})
			.catch((error) => {
				console.log(
					"🚀 ~ file: useUser.jsx:52 ~ handleUpdateUser ~ error:",
					error
				)
				// An error occurred
				// ...
			})

		// await updateEmail(currentUser, user.email)
		// 	.then(() => {
		// 		// Email updated!
		// 		// ...
		// 	})
		// 	.catch((error) => {
		// 		console.log("🚀 ~ file: useUser.jsx:62 ~ handleUpdateUser ~ error:", error)
		// 		// An error occurred
		// 		// ...
		// 	})

		setLoading(false)

		navigation.goBack()
	}

	return { user, setUser, loading, handleUpdateUser }
}
