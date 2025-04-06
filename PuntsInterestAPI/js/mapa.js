class Mapa {
    #map;
    #marcadores;

    constructor() {
        this.#map = L.map('map').setView([51.505, 0], 13); // Vista inicial
        this.#marcadores = L.layerGroup().addTo(this.#map);

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.#map);

        this.mostrarPuntoInicial();
    }

    // Muestra la ubicación inicial del usuario en el mapa
    mostrarPuntoInicial() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                L.marker([lat, lon]).addTo(this.#map)
                    .bindPopup('Estás aquí')
                    .openPopup();
                map.setView([lat, lon], 13);
            });
        }
    }

    // Actualiza la posición inicial del mapa
    actualizarPosInitMapa(lat, lon) {
    }

    // Muestra un punto en el mapa con una descripción
    mostrarPunto(lat, lon, desc = "") {
    }

    // Borra todos los puntos del mapa
    borrarPunto() {
    }

    // Obtiene la posición actual del usuario
    #getPosicionActual() {
    }
}
