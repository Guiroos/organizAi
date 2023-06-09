import Schedule from "@components/Schedule"
import { useUserContext } from "@contexts"

export default function Calendar({ navigation }) {
	const { state } = useUserContext()

	return <Schedule navigation={navigation} events={state.events} />
}
