import MoneyTableRow from "@components/MoneyTableRow"
import { useUserContext } from "@contexts"
import { deleteExpense, getExpenses } from "@firebaseAPI"
import { useFocusEffect } from "@react-navigation/native"
import { handleNavigate } from "@utils"
import { useCallback, useState } from "react"
import { Alert, View, VirtualizedList } from "react-native"
import { Button, DataTable } from "react-native-paper"

const numberOfItemsPerPageList = [5, 7, 10]

export default function StudentInfoExpense({ navigation, route }) {
	const { state: data } = useUserContext()
	const { studentKey } = route.params

	const [expenses, setExpenses] = useState([])
	const [page, setPage] = useState(0)
	const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(
		numberOfItemsPerPageList[2]
	)

	const from = page * numberOfItemsPerPage
	const to = Math.min((page + 1) * numberOfItemsPerPage, expenses.length)
	const dataPerPage = expenses.slice(
		page * numberOfItemsPerPage,
		page * numberOfItemsPerPage + numberOfItemsPerPage
	)

	useFocusEffect(
		useCallback(() => {
			const getExpensesFB = async () => {
				const expensesB = await getExpenses(data.user.uid, studentKey)
				const expensesInfo = expensesB
					? Object.keys(expensesB).map((key) => {
						const newObj = Object.create({ key, moneyInfo: {} })
						newObj.key = key
						newObj.moneyInfo = expensesB[key]
						return newObj
					})
					: []
				setExpenses(expensesInfo)
			}
			getExpensesFB()
		}, [data.user.uid, studentKey, expenses])
	)

	const handleTotalValue = () => {
		let totalValue = 0
		expenses.map((income) => {
			totalValue += +income.moneyInfo.value
		})
		return totalValue.toFixed(2)
	}

	const getItem = (data, index) => {
		return data[index]
	}

	const handleDeleteRow = (incomeKey) => {
		return Alert.alert("Deletar fileira?", "As informações serão apagadas", [
			{
				text: "Não",
				style: "cancel",
			},
			{
				text: "Sim",
				style: "destructive",
				onPress: async () => {
					deleteExpense(data.user.uid, studentKey, incomeKey)
				},
			},
		])
	}

	return (
		<View className="flex items-center h-screen">
			<DataTable className="">
				<DataTable.Header>
					<DataTable.Title style={{ flex: 0.5 }}></DataTable.Title>
					<DataTable.Title style={{ flex: 1.5 }}>Atividade</DataTable.Title>
					<DataTable.Title style={{ flex: 1 }}>Data</DataTable.Title>
					<DataTable.Title style={{ flex: 1 }} numeric>
            Valor
					</DataTable.Title>
				</DataTable.Header>
				{expenses && (
					<VirtualizedList
						data={dataPerPage}
						renderItem={({ item }) => (
							<MoneyTableRow
								handleDeleteRow={handleDeleteRow}
								moneyKey={item.key}
								moneyInfo={item.moneyInfo}
							/>
						)}
						initialNumToRender={numberOfItemsPerPage}
						keyExtractor={(item) => item.key}
						getItemCount={(data) => data.length}
						getItem={getItem}
					/>
				)}
				<DataTable.Row className="">
					<DataTable.Cell></DataTable.Cell>
					<DataTable.Cell
						className="pl-16"
						textStyle={{
							color: "rgb(185, 28, 28)",
							fontWeight: "bold",
							fontSize: 16,
							paddingLeft: 20,
						}}
					>
            Total:
					</DataTable.Cell>
					<DataTable.Cell
						numeric
						className="mr-[-8]"
						textStyle={{
							color: "rgb(185, 28, 28)",
							fontWeight: "bold",
							fontSize: 16,
							paddingRight: 8,
						}}
					>
						{`R$ ${handleTotalValue()}`}
					</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Pagination
					page={page}
					numberOfPages={Math.ceil(expenses.length / numberOfItemsPerPage)}
					onPageChange={(page) => setPage(page)}
					label={`${from + 1}-${to} de ${expenses.length}`}
					showFastPaginationControls
					numberOfItemsPerPageList={numberOfItemsPerPageList}
					numberOfItemsPerPage={numberOfItemsPerPage}
					onItemsPerPageChange={setNumberOfItemsPerPage}
					selectPageDropdownLabel={"Items por página"}
				/>
			</DataTable>
			<Button
				mode="text"
				onPress={() =>
					handleNavigate(navigation, "CreateStudentInfoExpense", { studentKey })
				}
			>
        CRIAR
			</Button>
		</View>
	)
}
