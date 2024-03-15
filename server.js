/**
 * @author Neuvald Richárd (FGTV2E)
 * @description 2023/2024-es tanév Web programozás II. tantárgy különbözeti vizsgája
 */

// =========== Imports ===========
const express = require("express")
require('dotenv').config()
const Database = require("./database")

// =========== App Setup ===========
const app = express()
const db = new Database("./chinook.db")
app.set("view engine", "pug")
app.set("views", __dirname + "/frontend")
app.use(express.static("./static"))
app.use(express.urlencoded({ extended: true }));

// =========== App routes ===========
app.get("/", (req, res) => {
    res.render("index", { page_title: "Home" })
})

app.get("/select", (req, res) => {
    let { table } = req.query
    if (!table) table = "albums"
    db.select(`SELECT * FROM ${table}`, (e, rows) => {
        if (e) {
            console.error(e.message)
            res.status(500).send("Internal Server error")
            return
        }
        res.render("select", {
            page_title: "Lekérdezés",
            selected_table: table,
            rows: rows
        })
    })
	
})
app.get("/insert", (req, res) => {
    let { table } = req.query
    if (!table) table = "albums"
    db.insert(`INSERT INTO ${table}`, (e) => {
        if (e) return console.log(`Error occured: ${e}`)
    })
})
app.get("/update", (req, res) => {
	res.render({
		page_title: "Rekord frissítése"
	})
})
app.get("/del", (req, res) => {
	res.render({
		page_title: "Rekord törlése"
	})
})

// =========== Server Setup ===========
const port = process.env.PORT || 3000
app.listen(port, async () => {
	console.log(`Server is running on https://localhost:${port}`)
})