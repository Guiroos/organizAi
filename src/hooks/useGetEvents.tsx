import { getEvents } from "@firebaseAPI"
import { useQuery } from "@tanstack/react-query"

export const useGetEvents = (userUid: string | undefined ) => {
	return useQuery({
		queryKey: ["events", userUid],
		queryFn: async () => getEvents(userUid),
		enabled: !!userUid
	})
}
