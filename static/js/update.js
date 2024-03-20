function sendData(selected_table, rowIndex) {
    var rowData = {
        table: selected_table
    };
    var inputs = document.querySelectorAll('#' + selected_table + ' tbody tr:nth-child(' + (rowIndex + 1) + ') input');
    inputs.forEach(function (input, index) {
        var columnName = document.querySelector('#' + selected_table + ' thead tr th:nth-child(' + (index + 1) + ')').textContent.trim();
        rowData[columnName] = input.value;
    });

    fetch("http://localhost:3000/update-process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rowData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent to the server successfully!');
        } else {
            console.error('An error occurred while communicating with the server:', response.statusText);
        }
    })
    .catch(error => {
        console.error('An error occurred during communication:', error);
    });
}
