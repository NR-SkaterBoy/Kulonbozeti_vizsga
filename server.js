/**
 * @author Neuvald Richárd (FGTV2E)
 * @description 2023/2024-es tanév Web programozás II. tantárgy különbözeti vizsgája
 */

// =========== Imports ===========
const express = require("express")
const Database = require("./database")
const bodyParser = require("body-parser")
const helmet = require("helmet")
const morgan = require("morgan")
require("dotenv").config()

// =========== App Setup ===========
const app = express()
const db = new Database("./chinook.db")
app.set("view engine", "pug")
app.set("views", __dirname + "/frontend")
app.use(express.static("./static"))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(helmet())
app.use(morgan("dev"))

// =========== App routes ===========
// Render the index page
app.get("/", (req, res) => { res.render("index", { page_title: "Home" }) })

// Render the select page
app.get("/select", (req, res) => {
    let { table } = req.query
    if (!table) table = "albums"
    db.select(table, (err, rows) => {
        if (err) return console.log(`Error occured: ${err}`)
        res.render("select", { page_title: "Request data", selected_table: table, rows: rows })
    })
})

// Render the insert page
app.get("/insert", (req, res) => { res.render("insert", { page_title: "Lekérdezés" }) })
app.post("/insert-data/:table", (req, res) => {
    const table = req.params.table
    console.log(req.body)
    if (!req.body || Object.values(req.body).some(v => v === "")) return
    if (table === undefined || table === null) return
    db.insert(table, req.body, (err, lid) => {
        if (err) return console.error(`Error occurred during insertion: ${err}`)
        console.log(`Data inserted successfully. Data inserted to: ${table}, Data: ${Object.values(req.body)}, Last ID: ${lid}`)
    })
})

// Render the update page
app.get("/update", (req, res) => {
    let { table } = req.query
    if (!table) table = "albums"
    db.select(table, (err, rows) => {
        if (err) return console.log(`Error occured: ${err}`)
        res.render("update", { page_title: "Rekord frissítése", selected_table: table, rows: rows })
    })
})
app.post("/update-process", (req, res) => {
    const { table, ...updateData } = req.body
    const where = Object.keys(req.body).find(key => key !== "table")
    const val = req.body[where]
    const whereClause = `${where} = ${val}`
    db.update(table, updateData, whereClause, (err, changes) => {
        if (err) return res.status(500).json({ error: "Error updating data" })
        return res.json({ message: `Successfully updated data in ${table}`, changes })
    })
})

// Render the delete page
app.get("/delete", (req, res) => {
    let { table } = req.query
    if (!table) table = "albums"
    db.select(table, (err, rows) => {
        if (err) return console.log(`Error occured: ${err}`)
        res.render("delete", { page_title: "Rekordok törlése", selected_table: table, rows: rows })
    })
})
app.post("/delete-process", (req, res) => {
    const { table, rowIndex, colName } = req.body
    console.log(req.body)
    db.delete(table, rowIndex, colName, (err) => {
        if (err) return console.log(`Error occured: ${err}`)
        return res.json({ message: `Successfully deleted data in ${table}` })
    })
})

// =========== Server Setup ===========
const port = process.env.PORT || 3000
app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`)
})