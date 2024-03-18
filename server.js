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
    db.select(table, (err, rows) => {
        if (err) return console.log(`Error occured: ${err}`)
        res.render("select", {
            page_title: "Lekérdezés",
            selected_table: table,
            rows: rows
        })
    })
})

app.post("/insert-data", (req, res) => {
    if (!req.body || Object.values(req.body).some(value => value === "")) {
        return res.status(400).send({ message: "Empty request body. Please provide data to insert." });
    }

    db.insert("albums", req.body, (err, lid) => {
        if (err) {
            console.error(`Error occurred during insertion: ${err}`);
            return res.status(500).send({ message: "Internal server error. Please try again later." });
        }

        console.log(`Data inserted successfully. Lid: ${lid}`);
        res.redirect("/insert");
    });
});


app.get("/insert", (req, res) => {
    res.render("insert", {
        page_title: "Lekérdezés",
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
    console.log(`Server is running on http://localhost:${port}`)
})