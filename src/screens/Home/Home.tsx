import { getMoment } from "@constants/getCurrentDate"
import { useUserContext } from "@contexts/UserContext"
import { removeEmptyObjects } from "@utils"
import { useMemo } from "react"
import { View } from "react-native"
import { Avatar, IconButton, Text } from "react-native-paper"

export default function Home() {
	const {
		state: { user, todayEvents, events, students },
	} = useUserContext()

	const memoTotalIncomes = useMemo(() => {
		if (!students) return 0

		const incomesValues = Object.values(students)
			.map((studentValues) => studentValues)
			.map((student) => student.incomes)
			.map((incomeValues) => incomeValues)

		if (!incomesValues[0]) return 0

		const totalIncomes = Object.values(removeEmptyObjects(incomesValues))
			.map((incomes) =>
				Object.values(incomes)
					.map((income) => income.value)
					.reduce((acc, cur) => +acc + +cur)
			)
			.reduce((acc, cur) => +acc + +cur)

		return totalIncomes
	}, [students])

	const memoTotalExpenses = useMemo(() => {
		if (!students) return 0

		const expensesValues = Object.values(students)
			.map((studentValues) => studentValues)
			.map((student) => student.expenses)
			.map((expensesValues) => expensesValues)

		if (!expensesValues[0]) return 0

		const totalExpenses = Object.values(removeEmptyObjects(expensesValues))
			.map((expenses) =>
				Object.values(expenses)
					.map((expense) => expense.value)
					.reduce((acc, cur) => +acc + +cur)
			)
			.reduce((acc, cur) => +acc + +cur)

		return totalExpenses
	}, [students])

	const memoTotalProfit = useMemo(() => {
		if (!memoTotalIncomes || !memoTotalExpenses) return 0

		return memoTotalIncomes - memoTotalExpenses
	}, [memoTotalIncomes, memoTotalExpenses])

	const handleColorProfit = (value) => {
		switch (true) {
			case value < 0:
				return "#ff0000"
			case value > 0:
				return "#15a83d"
			default:
				return "black"
		}
	}

	const date = getMoment()

	// const uniqueStudentsToday = () => {
	//   if (!todayEvents) return 0;
	//   return new Set(todayEvents.map((event) => event.student)).size;
	// };

	return (
		<View className="flex h-screen w-screen items-center bg-white">
			<Text className="mt-2">Bem vindo</Text>
			<Text className="text-2xl font-bold mb-2">
				{user.displayName || user.email}
			</Text>

			<View className="mb-3">
				{user.photoURL ? (
					<Avatar.Image source={{ uri: user.photoURL }} size={90} />
				) : (
					<Avatar.Icon icon="account" size={90} color="white" />
				)}
			</View>
			<Text className="text-xl font-bold mb-1">{date}</Text>
			{/* <Text className="text-base">{`Alunos hoje: ${uniqueStudentsToday()}`}</Text> */}
			<View className="flex w-[90%] mx-auto mt-4">
				<View className="flex flex-row justify-around items-center bg-white rounded-lg shadow-lg shadow-black">
					<IconButton
						size={56}
						icon="cash-multiple"
						color={handleColorProfit(memoTotalProfit)}
						style={{ backgroundColor: "white" }}
					/>
					<View className="flex justify-center items-center ">
						<View className="flex flex-row gap-x-2">
							<View className="flex justify-center items-center p-2 ">
								<Text className="text-base ">Ganhos Totais</Text>
								<Text className="text-base font-bold ">{`R$ ${memoTotalIncomes}`}</Text>
							</View>
							<View className="flex justify-center items-center p-2 ">
								<Text className="text-base ">Gastos Totais</Text>
								<Text className="text-base font-bold ">{`R$ ${memoTotalExpenses}`}</Text>
							</View>
						</View>
						<View className="flex flex-row gap-x-2">
							<View className="flex justify-center items-center p-2">
								<Text className="text-lg ">Lucro Total</Text>
								<Text
									style={{ color: handleColorProfit(memoTotalProfit) }}
									className="text-lg font-bold "
								>{`R$ ${memoTotalProfit}`}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}
