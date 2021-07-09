/**
 * To convert any object keys from any case to lower case
 *
 * @param targetObject
 * @returns {{}}
 */
function toLowerCase(targetObject) {
    let newObject = {}

    Object.keys(targetObject).forEach((key) => {
        newObject[key.toLowerCase()] = targetObject[key]
    })

    return newObject
}

module.exports = {
    toLowerCase
}
