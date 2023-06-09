import moment from "moment"
import localization from "moment/locale/pt"

export const getMoment = () => {
	moment.updateLocale("pt", localization)
	const now = moment().format("ddd - DD/MM/YYYY")
	return now
}

export const getCurrentDate = () => {
	const dt = new Date()
	const date = dt.getDate()
	const month = dt.getMonth() + 1
	const year = dt.getFullYear()
}

const getDayName = () => {
	const weekNumber = new Date().getDay()
	switch (weekNumber) {
		case 1:
			return "Segunda"
		case 2:
			return "Terça"
		case 3:
			return "Quarta"
		case 4:
			return "Quinta"
		case 5:
			return "Sexta"
		case 6:
			return "Sábado"
		case 7:
			return "Domingo"
	}
}

const getMonthName = () => {
	const monthNumber = new Date().getMonth() + 1
	switch (monthNumber) {
		case 1:
			return "Janeiro"
		case 2:
			return "Fevereiro"
		case 3:
			return "Março"
		case 4:
			return "Abril"
		case 5:
			return "Maio"
		case 6:
			return "Junho"
		case 7:
			return "Julho"
		case 8:
			return "Agosto"
		case 9:
			return "Setembro"
		case 10:
			return "Outubro"
		case 11:
			return "Novembro"
		case 12:
			return "Dezembro"
	}
}
