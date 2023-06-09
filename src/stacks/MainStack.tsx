import "react-native-gesture-handler"

import StudentDeleteButton from "@components/StudentDeleteButton"
import { createStackNavigator } from "@react-navigation/stack"
import {
	Account,
	CreateEvent,
	CreateStudent,
	CreateStudentInfoExpense,
	CreateStudentInfoIncome,
	Preload,
	SignIn,
	SignUp,
	StudentInfo,
	StudentInfoExpense,
	StudentInfoIncome,
	UpdateStudent,
	UpdateUser,
} from "@screens"

import MainTab from "./MainTab"

type RootStackParamList = {
  Preload: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainTab: undefined;
  CreateEvent: undefined;
  StudentInfo: undefined;
  StudentInfoExpense: undefined;
  StudentInfoIncome: undefined;
  CreateStudentInfoExpense: undefined;
  CreateStudentInfoIncome: undefined;
  CreateStudent: undefined;
  UpdateStudent: undefined;
  Account: undefined;
  UpdateUser: undefined;
};

const Stack = createStackNavigator<RootStackParamList>()

export default function MainStack() {
	return (
		<Stack.Navigator
			initialRouteName="Preload"
			screenOptions={{
				headerTintColor: "white",
				headerStyle: {
					backgroundColor: "#ff7323",
				},
			}}
		>
			<Stack.Group screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Preload" component={Preload} />
				<Stack.Screen name="SignIn" component={SignIn} />
				<Stack.Screen
					name="SignUp"
					component={SignUp}
					options={{
						title: "Cadastro",
						headerShown: true,
					}}
				/>
				<Stack.Screen name="MainTab" component={MainTab} />
			</Stack.Group>
			<Stack.Screen
				name="CreateEvent"
				component={CreateEvent}
				options={{ title: "Criar aula" }}
			/>
			<Stack.Group>
				<Stack.Screen
					name="StudentInfo"
					component={StudentInfo}
					options={({ route, navigation }) => ({
						title: "Informações",
						headerRight: () => (
							<StudentDeleteButton
								navigation={navigation}
								studentKey={route.params.studentKey}
							/>
						),
					})}
				/>
				<Stack.Screen
					name="StudentInfoExpense"
					component={StudentInfoExpense}
					options={{ title: "Gastos" }}
				/>
				<Stack.Screen
					name="StudentInfoIncome"
					component={StudentInfoIncome}
					options={{ title: "Ganhos" }}
				/>
				<Stack.Screen
					name="CreateStudentInfoExpense"
					component={CreateStudentInfoExpense}
					options={{ title: "Adicionar gastos" }}
				/>
				<Stack.Screen
					name="CreateStudentInfoIncome"
					component={CreateStudentInfoIncome}
					options={{ title: "Adicionar ganhos" }}
				/>
				<Stack.Screen
					name="CreateStudent"
					component={CreateStudent}
					options={{ title: "Adicionar aluno" }}
				/>
				<Stack.Screen
					name="UpdateStudent"
					component={UpdateStudent}
					options={{
						title: "Atualizar aluno",
					}}
				/>
			</Stack.Group>
			<Stack.Group>
				<Stack.Screen
					name="Account"
					component={Account}
					options={{
						title: "Conta",
					}}
				/>
				<Stack.Screen
					name="UpdateUser"
					component={UpdateUser}
					options={{
						title: "Atualizar usuário",
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	)
}
