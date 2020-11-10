function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function checkPass() {
    let log = document.getElementById("usLog").value;
    let pas = document.getElementById("usPass").value;
    let currYear = new Date().getFullYear();
    let currMonth = new Date().getMonth();
    currMonth++;
    if ((log == currYear) && (pas == currMonth)) {
        document.getElementById("formLog").style.background = "#00ff00"
    } else { document.getElementById("formLog").style.background = "#ff0000" }
    // sleep(2000);
    // return;
}
