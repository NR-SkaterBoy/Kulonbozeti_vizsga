$(document).ready(function(){
    $("#options").change(function(){
        $(".content").addClass("hidden");
        $("#content-"+$(this).val()).removeClass("hidden");
    });
});


document.getElementById('submitBtn').addEventListener('click', function() {
    var title = document.getElementById('title').value;
    var artistId = document.getElementById('artistid').value;

    // AJAX kérés küldése
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/insert');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('Adatok elküldve a szervernek');
        } else {
            console.log('Hiba történt a szerverrel való kommunikáció során');
        }
    };
    xhr.send(JSON.stringify({ title: title, artistid: artistId }));
});
