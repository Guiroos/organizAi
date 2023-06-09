import { initialState, userReducer } from "@reducers/UserReducer"
import { createContext, useContext, useReducer } from "react"

export const DEFAULT_VALUE = {
	user: {},
	students: {},
	events: {},
	todayEvents: {},
}

export type User = {
  _redirectEventId: string;
  apiKey: string;
  appName: string;
  createdAt: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  phoneNumber: string;
  photoURL: string;
  tenantId: string;
  uid: string;
  providerData: [string[]];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
};

export type Students = {
  [key: string]: {
    age: number;
    birthDate: string;
    cpf: string;
    email: string;
    gender: string;
    height: string;
    name: string;
    phoneNumber: string;
    weight: string;
  };
};

export type Events = {
  [key: string]: {
    description: string;
    name: string;
    initialHour: string;
    finalHours: string;
  };
};

type UserContextType = {
  user: User | undefined;
  students: Students[] | undefined;
  events: Events[] | undefined;
  todayEvents: Events[] | undefined;
};

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialState)

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => useContext(UserContext)
