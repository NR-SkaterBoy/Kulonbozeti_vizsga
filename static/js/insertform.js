$(document).ready(function(){
    $("#options").change(function(){
        $(".content").addClass("hidden");
        $("#content-"+$(this).val()).removeClass("hidden")
    })
})

const form = document.querySelector("form")
const fd = new FormData(form)
const urlencoded = new URLSearchParams(fd).toString()
fetch("http://localhost:3000/insert-data", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    body: urlencoded
})