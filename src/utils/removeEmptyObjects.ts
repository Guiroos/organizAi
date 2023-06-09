const removeEmptyObjects = (obj: object) =>
	Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null))

export default removeEmptyObjects
