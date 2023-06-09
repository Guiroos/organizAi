import { getStudentByKey } from "@firebaseAPI"
import { useQuery } from "@tanstack/react-query"

export const useGetStudent = (userUid: string, studentKey: string) => {
	return useQuery({
		queryKey: ["student", userUid, studentKey ],
		queryFn: async () => getStudentByKey(userUid, studentKey),
		enabled: !!userUid && !!studentKey
	})
}
