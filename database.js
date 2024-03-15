/**
 * @author Neuvald Richárd (FGTV2E)
 * @description Adatbázis 
 */

// =========== Imports ===========
const sqlite3 = require("sqlite3").verbose()

module.exports = class Database {
	constructor() {
		this.db = new sqlite3.Database("./chinook.db", sqlite3.OPEN_READWRITE, (e) => {
			if (e) return console.log("Error occured:", e.message)
			console.log("Connected to chinook.db")
		})
	}

	select(query, callback) {
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error(err.message)
                callback(err, null)
                return
            }
            callback(null, rows)
        })
    }

	close() {
        this.db.close((e) => {
            if (e) return console.error(err.message)
            console.log('Close the database connection.')
        })
    }
}