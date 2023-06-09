const handleNavigate = (
	navigation,
	screen: string,
	params: { studentKey: string } = {
		studentKey: "",
	}
) => navigation.navigate(screen, params)

export default handleNavigate
