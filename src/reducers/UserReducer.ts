export const initialState = {
	user: {},
	students: {},
	events: {},
	todayEvents: {},
}

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload.user,
			}
		case "SET_STUDENTS":
			return {
				...state,
				students: action.payload.students,
			}
		case "SET_EVENTS":
			return {
				...state,
				events: action.payload.events,
			}
		case "SET_TODAY_EVENTS":
			return {
				...state,
				todayEvents: action.payload.todayEvents,
			}
		default:
			return state
	}
}
