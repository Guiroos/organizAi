// Import the functions you need from the SDKs you need
import {
	FIREBASE_API_KEY,
	FIREBASE_APP_ID,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_DATABASE_URL,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
} from "@env"
import { initialEventDb } from "@utils"
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
	child,
	get,
	getDatabase,
	push,
	ref,
	remove,
	set,
	update,
} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: FIREBASE_AUTH_DOMAIN,
	databaseURL: FIREBASE_DATABASE_URL,
	projectId: FIREBASE_PROJECT_ID,
	storageBucket: FIREBASE_STORAGE_BUCKET,
	messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
	appId: FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

export function createInitialDatabase(userId, name, email) {
	set(ref(db, `users/${userId}`), {
		username: name,
		email: email,
		events: initialEventDb,
	})
}

export async function getEvents(userId) {
	const dbRef = ref(db)
	const snapshot = await get(child(dbRef, `users/${userId}/events`))
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return {}
}

export async function getEventsByKey(userId, eventKey) {
	const dbRef = ref(db)
	const snapshot = await get(
		child(dbRef, `users/${userId}/events/${eventKey}`)
	)
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return
}

export async function createEvent(userId, event, eventKey) {
	const events = await getEventsByKey(userId, eventKey)
	if (events) {
		const length = Object.keys(events).length
		const eventsListRef = ref(
			db,
			`users/${userId}/events/${eventKey}/${length}`
		)
		set(eventsListRef, event)
		return
	}
	const eventsListRef = ref(db, `users/${userId}/events/${eventKey}/0`)
	set(eventsListRef, event)
	return
}

export function updateEvents(userId, event) {
	const updates = {}
	updates[`users/${userId}/events`] = event
	return update(ref(db), updates)
}

export async function getStudents(userId) {
	const dbRef = ref(db)
	const snapshot = await get(child(dbRef, `users/${userId}/students`))
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return []
}

export async function getStudentByKey(userId, studentKey) {
	const dbRef = ref(db)
	const snapshot = await get(
		child(dbRef, `users/${userId}/students/${studentKey}`)
	)
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return {}
}

export async function createStudents(userId, student) {
	const studentListRef = ref(db, `users/${userId}/students`)
	const newStudentRef = push(studentListRef)
	await set(newStudentRef, student)
}

export function updateStudent(userId, studentKey, student) {
	const studentListRef = ref(db, `users/${userId}/students/${studentKey}`)
	return update(studentListRef, student)
}

export function deleteStudent(userId, studentKey) {
	const studentListRef = ref(db, `users/${userId}/students/${studentKey}`)
	return remove(studentListRef)
}

export async function getIncomes(userId, studentKey) {
	const dbRef = ref(db)
	const snapshot = await get(
		child(dbRef, `users/${userId}/students/${studentKey}/incomes`)
	)
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return []
}

export function createIncome(userId, studentKey, income) {
	const incomeListRef = ref(
		db,
		`users/${userId}/students/${studentKey}/incomes`
	)
	const newIncomeRef = push(incomeListRef)
	set(newIncomeRef, income)
}

export function deleteIncome(userId, studentKey, incomeKey) {
	const studentListRef = ref(
		db,
		`users/${userId}/students/${studentKey}/incomes/${incomeKey}`
	)
	remove(studentListRef)
}

export async function getExpenses(userId, studentKey) {
	const dbRef = ref(db)
	const snapshot = await get(
		child(dbRef, `users/${userId}/students/${studentKey}/expenses`)
	)
	if (snapshot.exists()) {
		return snapshot.val()
	}
	return []
}

export function createExpense(userId, studentKey, expense) {
	const incomeListRef = ref(
		db,
		`users/${userId}/students/${studentKey}/expenses`
	)
	const newIncomeRef = push(incomeListRef)
	set(newIncomeRef, expense)
}

export function deleteExpense(userId, studentKey, expenseKey) {
	const studentListRef = ref(
		db,
		`users/${userId}/students/${studentKey}/expenses/${expenseKey}`
	)
	remove(studentListRef)
}

export { auth, db }
