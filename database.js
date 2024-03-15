/**
 * @author Neuvald Richárd (FGTV2E)
 * @description Adatbázis 
 */

// =========== Imports ===========
const sqlite3 = require("sqlite3").verbose()

module.exports = class Database {
    constructor(databasePath) {
        this.db = new sqlite3.Database(databasePath, sqlite3.OPEN_READWRITE, (e) => {
            if (e) return console.log("Error occured:", e.message)
            console.log(`Connected to ${databasePath}`)
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

    insert(query, callback) {
        this.db.run(query, function(err) {
            if (err) {
                console.error(err.message)
                callback(err, null)
                return
            }
            // A beszúrt sor ID-ját visszaadjuk
            callback(null, this.lastID)
        })
    }

    update(query, callback) {}

    delete(query, callback) {}

    close() {
        this.db.close((err) => {
            if (err) return console.error(err.message)
            console.log('Database connection closed.')
        })
    }
}