const app = document.getElementById("app");

// Funcion para obtener Pokemon desde el inicio en orden
async function getAllPokemon(limit) {
    try {
        app.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos Pokemon

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener la lista de Pokemon`);

        const data = await response.json();

        for (const pokemon of data.results) {
            await getPokemonDetails(pokemon.url);
        }
    } catch (error) {
        console.error("Error en la consulta:", error.message);
    }
}

// Funcion para obtener detalles de cada Pokemon
async function getPokemonDetails(pokemonUrl) {
    try {
        const response = await fetch(pokemonUrl);
        if (!response.ok) throw new Error(`Error ${response.status}: No se pudo obtener detalles del Pokemon`);

        const data = await response.json();

        const name = data.name;
        const imageUrl = data.sprites.versions["generation-v"]["black-white"].animated.front_shiny;

        showPokemon(name, imageUrl);
    } catch (error) {
        console.error("Error obteniendo detalles del Pokemon:", error.message);
    }
}

// Funcion para mostrar un Pokemon en la pantalla
function showPokemon(name, imageUrl) {
    const container = document.createElement("div");
    container.classList.add("pokemon-container");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;

    const nameElement = document.createElement("p");
    nameElement.textContent = name;

    // Botón "Detalles"
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Detalles";
    detailsButton.addEventListener("click", () => {
        window.location.href = `details.html?name=${name}`;
    });

    container.appendChild(img);
    container.appendChild(nameElement);
    container.appendChild(detailsButton);
    app.appendChild(container);
}

// Agregar eventos a los enlaces para cambiar la cantidad de Pokemon mostrados
document.querySelectorAll(".search-content a").forEach(link => {
    link.addEventListener("click", (event) => {
        const limit = event.target.textContent; // Obtiene el numero de Pokemon desde el texto del enlace
        getAllPokemon(parseInt(limit)); // Llama a la funcion con el nuevo limite
    });
});

// Cargar 10 Pokemon por defecto
getAllPokemon(10);
