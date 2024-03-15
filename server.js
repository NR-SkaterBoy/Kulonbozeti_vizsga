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
const db = new Database()
app.set("view engine", "pug")
app.set("views", __dirname + "/frontend")
app.use(express.urlencoded({ extended: true }));

// =========== App routes ===========
app.get("/", (req, res) => {
    res.render("index", { page_title: "Home" })
})

app.get("/select", (req, res) => {
	res.render({
		page_title: "Lekérdezés"
	})
})
app.get("/insert", (req, res) => {
	res.render({
		page_title: "Új rekord"
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