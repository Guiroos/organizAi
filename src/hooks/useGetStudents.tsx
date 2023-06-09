import { getStudents } from "@firebaseAPI"
import { useQuery } from "@tanstack/react-query"

export const useGetStudents = (userUid: string) => {
	return useQuery({
		queryKey: ["students", userUid],
		queryFn: async () => getStudents(userUid),
		enabled: !!userUid,
	})
}
