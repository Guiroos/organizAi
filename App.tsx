import "react-native-gesture-handler"

import { UserContextProvider } from "@contexts/UserContext"
import { NavigationContainer } from "@react-navigation/native"
import MainStack from "@stacks/MainStack"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"

const Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#ff7323",
		accent : "#23afff",
		background: "transparent",
	},
}

const queryClient = new QueryClient()

export default function App() {

	return (
		<QueryClientProvider client={queryClient} >
			<UserContextProvider>
				<NavigationContainer>
					<PaperProvider theme={Theme}>
						<MainStack navigation={undefined} />
					</PaperProvider>
				</NavigationContainer>
			</UserContextProvider>
		</QueryClientProvider>
	)
}
