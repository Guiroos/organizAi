import { handleNavigate } from "@utils"
import { View } from "react-native"
import { IconButton } from "react-native-paper"

export default function CustomTabBar({ navigation, state }) {
	const iconsTab = [
		{
			screenName: "Home",
			name: "home",
		},
		{
			screenName: "Calendar",
			name: "calendar-blank",
		},
		{
			screenName: "Students",
			name: "account-multiple",
		},
		{
			screenName: "Settings",
			name: "cogs",
		},
	]

	return (
		<View className="flex-row h-14 bg-primary">
			{iconsTab.map((icon, index) => (
				<IconButton
					onPress={() => handleNavigate(navigation, icon.screenName)}
					key={index}
					icon={icon.name}
					size={24}
					color="white"
					style={{
						opacity: state.index === index ? 1 : 0.5,
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				/>
			))}
		</View>
	)
}
