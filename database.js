/**
 * @author Neuvald Richárd (FGTV2E)
 * @description Adatbázis (Database), tartalmazza a select, insert, update és delete funkciókat
 */

// =========== Imports ===========
const sqlite3 = require("sqlite3").verbose()

module.exports = class Database {
    /**
     * Creates a new instance of the Database class.
     * @param {string} databasePath - The path to the database file.
     */
    constructor(databasePath) {
        this.db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (err) => {
            if (err) return console.log("Error occured:", err.message)
            console.log(`Connected to ${databasePath}`)
        })
    }

    /**
     * Display the specified data table
     * @param {string} tableName Name of the table
     * @param {function} callback Function to be called after the selection
     */
    select(tableName, callback) {
        const query = `SELECT * FROM ${tableName}`
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error("Error selecting data:", err.message)
                return callback(err, null)
            }
            // console.log(`Successfully selected ${rows.length} rows from ${tableName}`)
            callback(null, rows)
        })
    }

    /**
     * Insert new row into the specified table
     * @param {string} tableName Name of the table
     * @param {object} data Object of the data
     * @param {function} callback Function to be called after the insertion
     */
    insert(tableName, data, callback) {
        const keys = Object.keys(data)
        const values = Object.values(data)
        const placeholders = keys.map(() => "?").join(", ")
        const query = `INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${placeholders})`

        this.db.run(query, values, function (err) {
            if (err) {
                console.error("Error inserting data:", err.message)
                return callback(err, null)
            }
            console.log(`Successfully inserted data into ${tableName}`)
            callback(null, this.lastID)
        })
    }

    /**
     * Updates an existing row in the specified table based on a where clause.
     * @param {string} tableName - Name of the table to update data in.
     * @param {object} data - Object containing key-value pairs for the update.
     * @param {string} whereClause - SQL WHERE clause to identify the row to update.
     * @param {function} callback - Function to be called after the update.
     */
    update(tableName, data, whereClause, callback) {
        const updates = Object.keys(data).map((key) => `${key} = ?`)
        const values = Object.values(data)
        const query = `UPDATE ${tableName} SET ${updates.join(", ")} WHERE ${whereClause}`

        this.db.run(query, values, (err) => {
            if (err) {
                console.error("Error updating data:", err.message)
                return callback(err, null)
            }
            console.log(`Successfully updated data in ${tableName}`)
            callback(null, this.changes)
        })
    }

    /**
     * Deletes a row from a table in the database.
     * @param {string} tableName - Name of the table to delete the row from.
     * @param {number} rowIndex - Index of the row to delete.
     * @param {string} colName - Name of the column used as the row identifier.
     * @param {function} callback - Function to be called after the deletion.
     */
    delete(tableName, rowIndex, colName, callback) {
        const query = `DELETE FROM ${tableName} WHERE ${colName} = ?`

        this.db.run(query, [rowIndex], (err) => {
            if (err) {
                console.error("Error deleting data:", err.message)
                return callback(err, null)
            }
            console.log(`Successfully deleted row ${rowIndex} from ${tableName}`)
            callback(null, this.changes)
        })
    }

    /**
     * Closes the database connection.
     * @param {function} [callback] - A function to be called after the connection is closed.
     */
    close() {
        this.db.close((err) => {
            if (err) return console.error(err.message)
            console.log('Database connection closed.')
        })
    }
}
