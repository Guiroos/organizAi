import { useUserContext } from "@contexts"
import { auth } from "@firebaseAPI"
import { useGetEvents } from "@hooks/useGetEvents"
import { useGetStudents } from "@hooks/useGetStudents"
import { onAuthStateChanged } from "firebase/auth"
import moment from "moment"
import { useEffect } from "react"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

import OrganizAi from "../../assets/organizai.svg"

export default function Preload({ navigation }) {
	const {
		state: { user },
		dispatch,
	} = useUserContext()

	const { data: events } = useGetEvents(user.uid)
	const { data: students } = useGetStudents(user.uid)

	const today = moment().format("Y-MM-DD")

	useEffect(() => {
		try {
			onAuthStateChanged(auth, async (currentUser) => {
				if (currentUser) {
					dispatch({
						type: "SET_USER",
						payload: { user: currentUser },
					})
				} else {
					navigation.navigate("SignIn")
				}
			})
		} catch (e) {
			console.log("🚀 ~ file: Preload.jsx:37 ~ useCallback ~ e:", e)
		}
	}, [dispatch, navigation])

	useEffect(() => {
		if (user) {
			dispatch({
				type: "SET_EVENTS",
				payload: { events },
			})
			dispatch({
				type: "SET_STUDENTS",
				payload: { students },
			})
			// dispatch({
			// 	type: "SET_TODAY_EVENTS",
			// 	payload: { todayEvents: todayEventsFB },
			// })
		}
		if (events)
			navigation.reset({
				routes: [{ name: "MainTab" }],
			})
	}, [dispatch, events, navigation, students, user])

	return (
		<View className="flex-1 flex-col justify-center items-center bg-primary">
			<OrganizAi width="80%" height="100px" />
			<ActivityIndicator
				size={36}
				animating={true}
				color="white"
				className="mt-4"
			/>
		</View>
	)
}
