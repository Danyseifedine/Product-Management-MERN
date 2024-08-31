

/**
 * ArrayUtils - A utility class for array operations
 * 
 * This class provides static methods to perform common array operations
 * such as removing items, updating items, and adding items to arrays.
 * It's particularly useful for managing arrays of objects, especially
 * when working with data that has unique identifiers.
 * 
 * @class
 * 
 * Available functions and usage:
 * 
 * @example removeItemFromArray(array, id, idField = "_id")
 *    Removes an item from an array based on its ID.
 *    Usage: ArrayUtils.removeItemFromArray(products, "123", "_id")
 * 
 * @example updateItemInArray(array, id, newData, idField = "_id")
 *    Updates an item in an array based on its ID.
 *    Usage: ArrayUtils.updateItemInArray(products, "123", { name: "New Name" }, "_id")
 * 
 * @example addItemToArray(array, newItem)
 *    Adds a new item to an array.
 *    Usage: ArrayUtils.addItemToArray(products, newProduct)
 * 
 * @example findItemInArray(array, id, idField = "_id")
 *    Finds an item in an array based on its ID.
 *    Usage: ArrayUtils.findItemInArray(products, "123", "_id")
 * 
 * @example sortArrayByField(array, field, ascending = true)
 *    Sorts an array of objects based on a specified field.
 *    Usage: ArrayUtils.sortArrayByField(products, "price", false)
 * 
 * @example groupArrayByField(array, field)
 *    Groups an array of objects by a specified field.
 *    Usage: ArrayUtils.groupArrayByField(products, "category")
 */
export default class ArrayUtils {
    /**
     * Removes an item from an array based on its ID
     * 
     * @param {Array} array - The array to remove the item from
     * @param {*} id - The ID of the item to remove
     * @param {string} [idField="_id"] - The field name to use as the ID (default: "_id")
     * @returns {Array} A new array with the item removed
     */
    static removeItemFromArray = (array, id, idField = "_id") =>
        array.filter((item) => item[idField] !== id);

    /**
     * Updates an item in an array based on its ID
     * 
     * @param {Array} array - The array containing the item to update
     * @param {*} id - The ID of the item to update
     * @param {Object} newData - The new data to apply to the item
     * @param {string} [idField="_id"] - The field name to use as the ID (default: "_id")
     * @returns {Array} A new array with the updated item
     */
    static updateItemInArray = (array, id, newData, idField = "_id") =>
        array.map((item) => (item[idField] === id ? { ...item, ...newData } : item));

    /**
     * Adds a new item to an array
     * 
     * @param {Array} array - The array to add the item to
     * @param {*} newItem - The new item to add to the array
     * @returns {Array} A new array with the added item
     */
    static addItemToArray = (array, newItem) => [...array, newItem];

    /**
 * Finds an item in an array based on its ID
 * 
 * @param {Array} array - The array to search
 * @param {*} id - The ID of the item to find
 * @param {string} [idField="_id"] - The field name to use as the ID (default: "_id")
 * @returns {*} The found item or undefined if not found
 */
    static findItemInArray = (array, id, idField = "_id") =>
        array.find((item) => item[idField] === id);

    /**
     * Sorts an array of objects based on a specified field
     * 
     * @param {Array} array - The array to sort
     * @param {string} field - The field to sort by
     * @param {boolean} [ascending=true] - Whether to sort in ascending order
     * @returns {Array} A new sorted array
     */
    static sortArrayByField = (array, field, ascending = true) =>
        [...array].sort((a, b) => {
            if (a[field] < b[field]) return ascending ? -1 : 1;
            if (a[field] > b[field]) return ascending ? 1 : -1;
            return 0;
        });

    /**
     * Groups an array of objects by a specified field
     * 
     * @param {Array} array - The array to group
     * @param {string} field - The field to group by
     * @returns {Object} An object with keys as group names and values as arrays of items
     */
    static groupArrayByField = (array, field) =>
        array.reduce((groups, item) => {
            const key = item[field];
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
            return groups;
        }, {});
}
