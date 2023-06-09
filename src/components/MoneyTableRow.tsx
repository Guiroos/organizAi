import { DataTable, IconButton } from "react-native-paper"

type MoneyTableRow = {
	handleDeleteRow: (moneyKey: string) => void,
	moneyKey: string
	moneyInfo: {
		value: string,
		description: string
		incomeDate: string
	}
}

export default function MoneyTableRow({
	handleDeleteRow,
	moneyKey,
	moneyInfo,
}: MoneyTableRow) {
	const formattedAmount = `R$ ${Number(moneyInfo.value).toFixed(2)}`
	return (
		<DataTable.Row style={{ display: "flex" }} key={moneyKey}>
			<DataTable.Cell style={{ flex: 0.5 }}>
				<IconButton
					icon="delete"
					size={20}
					onPress={() => handleDeleteRow(moneyKey)}
				/>
			</DataTable.Cell>
			<DataTable.Cell style={{ flex: 1.5 }}>
				{moneyInfo.description}
			</DataTable.Cell>
			<DataTable.Cell style={{ flex: 1 }}>
				{moneyInfo.incomeDate}
			</DataTable.Cell>
			<DataTable.Cell style={{ flex: 1 }} numeric>
				{formattedAmount}
			</DataTable.Cell>
		</DataTable.Row>
	)
}
