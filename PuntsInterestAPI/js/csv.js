document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("drop-zone");

    dropZone.addEventListener("dragover", e => e.preventDefault());

    dropZone.addEventListener("drop", e => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (!file.name.endsWith(".csv")) {
            alert("Error: El fichero no es de tipo csv");
        }
    });
});

function cargarCSV() {
    console.log("Cargar CSV ejecutado");
}
