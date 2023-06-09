import moment from "moment"

const newDate = moment().format("YYYY-MM-DD")
const newHour = moment().format("HH")
const newMinute = moment().format("mm")
const newTime = `${newHour}:${newMinute}`

const initialEventDb = {}
initialEventDb[newDate] = [
	{
		name: "Você",
		initialHour: newTime,
		finalHour: newTime,
		description: "Bem vindo!!",
	},
]

export default initialEventDb
