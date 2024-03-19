$(document).ready(function () {
    $("#options").change(function () {
        $(".content").addClass("hidden");
        $("#content-" + $(this).val()).removeClass("hidden")
    })
})

const notyf = new Notyf()

const form = document.querySelector("form")
const fd = new FormData(form)
const urlencoded = new URLSearchParams(fd).toString()
fetch("http://localhost:3000/insert-data", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: urlencoded
}).then(response => {
        if (!response.ok) {
            notify.error("Error occured!")
        }
        return response.text();
    }).then(data => {
        notyf.success("Data successfully inserted!")
    })
