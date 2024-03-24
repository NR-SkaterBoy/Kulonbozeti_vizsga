// =========== External Sources ===========
const notyf = new Notyf()


/**
 * Sorts a table based on the values of the nth column in either ascending or descending order.
 * @param {number} n - The index of the column to sort by.
 */
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0
    table = document.getElementById("myTable")
    switching = true
    dir = "asc"
    while (switching) {
        switching = false
        rows = table.rows
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false
            x = rows[i].getElementsByTagName("td")[n]
            y = rows[i + 1].getElementsByTagName("td")[n]
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true
                    break
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true
                    break
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i])
            switching = true
            switchcount++
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc"
                switching = true
            }
        }
    }
}

/**
 * Filters the table rows based on the search input.
 * @function
 */
function filterTable() {
    var input, filter, table, tr, td, i, txtValue
    input = document.getElementById("searchInput")
    filter = input.value.toUpperCase()
    table = document.getElementById("myTable")
    tr = table.getElementsByTagName("tr")
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")
        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = ""
                    break;
                } else {
                    tr[i].style.display = "none"
                }
            }
        }
    }
}

/**
 * Adds an event listener to the search input element that triggers the filterTable function whenever the input value changes.
 */
const path = window.location.pathname.split("/")[1]
if (path.includes("select") || path.includes("delete")) document.getElementById("searchInput").addEventListener("input", filterTable)

/**
 * Sends the data from the given table row to the server.
 * @param {string} selectedTable - The name of the table that contains the given row.
 * @param {number} rowIndex - The index of the row to send.
 */
function sendData(selectedTable, rowIndex) {
    const rowData = { table: selectedTable }
    const inputs = document.querySelectorAll(`#${selectedTable} tbody tr:nth-child(${rowIndex + 1}) input`)
    inputs.forEach((input, index) => {
        const columnName = document.querySelector(`#${selectedTable} thead tr th:nth-child(${index + 1})`).textContent.trim()
        rowData[columnName] = input.value
    })
    fetch("/update-process", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rowData) })
        .then(response => { response.ok ? notyf.success('Data has been updated successfully!') : notyf.error('An error occured!') })
        .catch(err => { console.error('An error occurred during communication:', err) })
}

if (path.includes("insert")) {
    $(document).ready(function () {
        $("#options").change(function () {
            $(".content").addClass("hidden")
            $("#content-" + $(this).val()).removeClass("hidden")
        })
    })

    /**
     * This function is used to insert data into the database.
     * @param {FormData} form - The form element that contains the data to be inserted.
     */
    const form = document.querySelector("form")
    const fd = new FormData(form)
    const urlencoded = new URLSearchParams(fd).toString()
    const hasEmptyValue = Array.from(urlencoded.values()).some(value => value === "")
    if (!hasEmptyValue) fetch("/insert-data", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: urlencoded}).then(response => { response.ok ? notyf.success("Data successfully inserted!") && setTimeout(() => { window.location.reload() }, 2000) : notyf.error("Error occured!") })
}

/**
 * Deletes data from the database.
 * @param {string} table - The name of the table.
 * @param {number} rowIndex - The index of the row to delete.
 */
function deleteData(table, rowIndex,) {
    let colName = ""
    switch (table) {
        case "sqlite_sequence":
            colName = "name"
            break;
        case "artists":
            colName = "ArtistId"
            break;
        case "customers":
            colName = "customerId"
            break;
        case "employees":
            colName = "EmployeeId"
            break;
        case "genres":
            colName = "GenreId"
            break;
        case "invoices":
            colName = "InvoiceId"
            break;
        case "invoice_items":
            colName = "InvoiceLineId"
            break;
        case "media_types":
            colName = "MediaTypeId"
            break;
        case "playlists":
            colName = "PlaylistId"
            break;
        case "playlist_track":
            colName = "PlaylistId"
            break;
        case "tracks":
            colName = "TrackId"
            break;
        case "sqlite_stat1":
            colName = "tbl"
            break;
        default:
            colName = "AlbumId"
            break;
    }
    fetch('/delete-process', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ table: table, colName: colName, rowIndex: rowIndex }) })
        .then(response => { response.ok ? notyf.success("Data has been deleted successfully!") : notyf.error("An error occurred during data deletion.") })
        .then(() => setTimeout(() => { window.location.reload() }, 1200))
}
