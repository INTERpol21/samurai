export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(user => {
        if (user[newObjProps] === itemId) {
            return {...user, ...newObjProps}
        }
        return user
    })
}