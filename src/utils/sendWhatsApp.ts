import { Alert, Linking } from "react-native"

const sendWhatsApp = (message: string, phoneNumber: string) => {
	// const phoneWithCountryCode = "xxxxxxxxxx"

	// let mobile =
	//   Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode

	// if (mobile) {
	if (message) {
		const url = "whatsapp://send?text=" + message + "&phone=" + phoneNumber
		Linking.openURL(url)
			.then((data) => {
				console.log("WhatsApp Opened")
			})
			.catch(() => {
				Alert.alert("Make sure WhatsApp installed on your device")
			})
	} else {
		Alert.alert("Please insert message to send")
	}
	// } else {
	// 	Alert("Please insert mobile no")
	// }
}

export default sendWhatsApp
