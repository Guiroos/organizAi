const firebaseErrorAuth = (errorCode: string) => {
	switch (errorCode) {
		case "auth/user-not-found":
			return "Usuário não encontrado..."
		case "auth/missing-password":
			return "Insira uma senha..."
		case "auth/wrong-password":
			return "Senha inválida."
		case "auth/invalid-email":
			return "Email inválido."
		case "auth/weak-password":
			return "Senha deve ter no mínimo 6 caracteres."
		case "auth/email-already-in-use":
			return "Email já está em uso."
		case "auth/too-many-requests":
			return "Conta temporariamente desativada devido a muitas tentativas de login malsucedidas."
		default:
			return "Algo inesperado ocorreu"
	}
}

export default firebaseErrorAuth
