import AgendaEmptyDate from "@components/AgendaEmptyDate"
import AgendaEventDate from "@components/AgendaEventDate"
import { Events } from "@contexts/UserContext"
import moment from "moment"
import { Agenda, LocaleConfig } from "react-native-calendars"

LocaleConfig.locales["br"] = {
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthNamesShort: [
		"Jan.",
		"Fev.",
		"Mar.",
		"Abr.",
		"Maio",
		"Jun",
		"Jul.",
		"Ago",
		"Set.",
		"Out.",
		"Nov.",
		"Dez.",
	],
	dayNames: [
		"Domingo",
		"Segunda",
		"Terça",
		"Quarta",
		"Quinta",
		"Sexta",
		"Sábado",
	],
	dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
	today: "Hoje",
}

LocaleConfig.defaultLocale = "br"

export default function Schedule({ navigation, events }) {
	const renderItem = (item, firstItemInDay) => {
		return <AgendaEventDate item={item} firstItemInDay={firstItemInDay} />
	}

	const renderEmptyDate = () => {
		return <AgendaEmptyDate navigation={undefined} />
	}

	return (
		<Agenda
			items={events}
			selected={moment().format("YYYY-MM-DD")}
			minDate={"2020-01-01"}
			hideExtraDays={true}
			renderEmptyDate={renderEmptyDate}
			renderItem={renderItem}
			showClosingKnob={true}
			pastScrollRange={12}
			futureScrollRange={12}
			theme={{
				selectedDayBackgroundColor: "#ff7323",
				todayTextColor: "#ff7323",
				indicatorColor: "#ff7323",
				agendaTodayColor: "#ff7323",
				dotColor: "#ff7323",
			}}
		/>
	)
}
