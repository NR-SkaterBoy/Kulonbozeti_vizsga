/**
 * Returns a new object that contains all the properties of the original object except for the first one.
 * @param {Object} obj - The object to extract properties from.
 * @returns {Object} A new object that contains all the properties of the original object except for the first one.
 */
module.exports.getAllButFirst = function getAllButFirst(obj) {
    const newObj = {}
    let isFirst = true

    for (const key in obj) {
        if (isFirst) {
            isFirst = false
            continue
        }
        newObj[key] = obj[key]
    }

    return newObj
}

/**
 * Returns the name of the only property in the object that is not 'table'.
 * @param {Object} obj - The object to search.
 * @returns {string} The name of the only property in the object that is not 'table'.
 */
module.exports.getPropertyName = function getPropertyName(obj) {
    for (const key in obj) {
        if (key !== 'table') {
            return key;
        }
    }
}
